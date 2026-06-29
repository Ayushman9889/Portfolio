'use client'
import { useEffect, useRef } from 'react'

function buildShapeSet(pattern: string[], cols: number, startRow: number, startCol: number): Set<number> {
  const set = new Set<number>()
  for (let r = 0; r < pattern.length; r++) {
    for (let c = 0; c < pattern[r].length; c++) {
      if (pattern[r][c] === '#') {
        set.add((startRow + r) * cols + (startCol + c))
      }
    }
  }
  return set
}

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const W = canvas.offsetWidth
    const H = canvas.offsetHeight
    canvas.width = W
    canvas.height = H

    const COLS = 60
    const ROWS = 20
    const DOT_R = 1.5
    const SPACING_X = W / COLS
    const SPACING_Y = H / ROWS
    const N = COLS * ROWS

    const baseX = Array.from({ length: N }, (_, i) => (i % COLS) * SPACING_X + SPACING_X / 2)
    const baseY = Array.from({ length: N }, (_, i) => Math.floor(i / COLS) * SPACING_Y + SPACING_Y / 2)
    const pos = baseX.map((x, i) => ({ x, y: baseY[i] }))

    // Browser window
    const browserPattern = [
      '######################',
      '######################',
      '#  ##  ##  ##  ##  ##',
      '######################',
      '#                    #',
      '#                    #',
      '#                    #',
      '#                    #',
      '#                    #',
      '#                    #',
      '######################',
    ]

    // Terminal / command prompt
    const terminalPattern = [
      '######################',
      '#                    #',
      '#  ##  #             #',
      '#    ###             #',
      '#    # ##            #',
      '#                    #',
      '#  ########          #',
      '#                    #',
      '#  ######            #',
      '#                    #',
      '######################',
    ]

    // React atom shape
    const reactPattern = [
      '         ##          ',
      '       ######        ',
      '  ##  ########  ##   ',
      ' #### ########## ### ',
      '######  ######  #####',
      ' ####   # ## #  #### ',
      '######  ######  #####',
      ' #### ########## ### ',
      '  ##  ########  ##   ',
      '       ######        ',
      '         ##          ',
    ]

    // Code brackets </>
    const codePattern = [
      '  ###            ### ',
      ' #####          #####',
      '#######        ######',
      ' #####   ####  ##### ',
      '  ###   ######  ###  ',
      '        ######       ',
      '  ###   ######  ###  ',
      ' #####   ####  ##### ',
      '#######        ######',
      ' #####          #####',
      '  ###            ### ',
    ]

    // Cloud / wifi signal
    const cloudPattern = [
      '       ########      ',
      '     ############    ',
      '   ################  ',
      '  ################## ',
      ' ####################',
      ' ####################',
      '  ################## ',
      '   ##    ####    ##  ',
      '          ##         ',
      '         ####        ',
      '          ##         ',
    ]

    // Git branch
    const gitPattern = [
      '   ##        ##      ',
      '  ####      ####     ',
      '   ##        ##      ',
      '   ##        ##      ',
      '   ##   ##   ##      ',
      '   ## ######         ',
      '   ###      ##       ',
      '   ##        ##      ',
      '   ##       ####     ',
      '  ####       ##      ',
      '   ##                ',
    ]

    // CPU / chip
    const cpuPattern = [
      '  ## ############ ## ',
      '  ## #          # ## ',
      '  ## # ######## # ## ',
      '#### # #      # # ###',
      '     # # #### # #    ',
      '     # # #  # # #    ',
      '     # # #### # #    ',
      '#### # #      # ####',
      '  ## # ######## # ## ',
      '  ## #          # ## ',
      '  ## ############ ## ',
    ]

    const shapes = [
      browserPattern,
      terminalPattern,
      reactPattern,
      codePattern,
      cloudPattern,
      gitPattern,
      cpuPattern,
    ]

    const startCol = 19
    const shapeSets = shapes.map(p => buildShapeSet(p, COLS, 4, startCol))

    type Target = { x: number; y: number; active: boolean }

    function makeGridTargets(shapeSet: Set<number>): Target[] {
      return baseX.map((x, i) => ({ x, y: baseY[i], active: shapeSet.has(i) }))
    }

    function makeScatterTargets(setA: Set<number>, setB: Set<number>): Target[] {
      return baseX.map((_, i) => ({
        x: Math.random() * W,
        y: Math.random() * H,
        active: setA.has(i) || setB.has(i),
      }))
    }

    const sequence: Target[][] = []
    for (let i = 0; i < shapeSets.length; i++) {
      sequence.push(makeGridTargets(shapeSets[i]))
      sequence.push(makeScatterTargets(shapeSets[i], shapeSets[(i + 1) % shapeSets.length]))
    }

    let state = 0
    let mouse = { x: -999, y: -999 }
    let frame = 0
    const CYCLE_FRAMES = 280
    const LERP = 0.055
    const REPEL_DIST = 85
    const REPEL_STRENGTH = 18

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const onLeave = () => {
      mouse.x = -999
      mouse.y = -999
    }

    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseleave', onLeave)

    let animId: number
    function animate() {
      animId = requestAnimationFrame(animate)
      ctx.clearRect(0, 0, W, H)

      frame++
      if (frame % CYCLE_FRAMES === 0) {
        state = (state + 1) % sequence.length
        if (state % 2 === 1) {
          const s = sequence[state]
          for (let i = 0; i < N; i++) {
            s[i].x = Math.random() * W
            s[i].y = Math.random() * H
          }
        }
      }

      const target = sequence[state]

      for (let i = 0; i < N; i++) {
        const p = pos[i]
        const t = target[i]

        p.x += (t.x - p.x) * LERP
        p.y += (t.y - p.y) * LERP

        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < REPEL_DIST && dist > 0) {
          const force = (REPEL_DIST - dist) / REPEL_DIST
          p.x += (dx / dist) * force * REPEL_STRENGTH
          p.y += (dy / dist) * force * REPEL_STRENGTH
        }

        const baseAlpha = t.active ? 0.3 : 0.08
        const brightness = dist < REPEL_DIST ? Math.min(baseAlpha + 0.15, 0.45) : baseAlpha

        ctx.beginPath()
        ctx.arc(p.x, p.y, DOT_R, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(180, 180, 180, ${brightness})`
        ctx.fill()
      }
    }

    animate()

    return () => {
      cancelAnimationFrame(animId)
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-[260px] mt-6 border border-border-subtle rounded-[6px]"
      style={{ display: 'block' }}
    />
  )
}