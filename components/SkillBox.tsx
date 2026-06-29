'use client'
import { useCallback, useEffect, useRef, useState } from 'react'

const SKILLS = [
  'React.js', 'Next.js', 'Node.js', 'Express.js', 'TypeScript',
  'JavaScript', 'C++', 'MongoDB', 'PostgreSQL', 'Tailwind CSS',
  'Shadcn UI', 'REST APIs', 'Google Gemini API', 'AWS', 'Vercel',
  'Cloudinary', 'Clerk', 'JWT Auth', 'Arcjet', 'Strapi CMS',
  'Git / GitHub', 'System Design', 'DSA',
  "Something that isn't here but you want to talk about",
]

type Tag = {
  id: number
  label: string
  x: number
  y: number
  vx: number
  vy: number
  rotation: number
  width: number
  height: number
  wide: boolean
  highlighted: boolean
  dragging: boolean
}

function tagSize(label: string): { width: number; height: number; wide: boolean } {
  const wide = label.length > 28
  if (wide) return { width: 148, height: 54, wide: true }
  return { width: Math.max(72, label.length * 7.2 + 26), height: 28, wide: false }
}

function createTags(width: number, height: number): Tag[] {
  return SKILLS.map((label, i) => {
    const { width: tw, height: th, wide } = tagSize(label)

    return {
      id: i,
      label,
      x: 12 + Math.random() * (width - tw - 24),
      y: 12 + Math.random() * (height - th - 24),
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      rotation: (Math.random() - 0.5) * 16,
      width: tw,
      height: th,
      wide,
      highlighted: false,
      dragging: false,
    }
  })
}

export default function SkillBox() {
  const boxRef = useRef<HTMLDivElement>(null)
  const [tags, setTags] = useState<Tag[]>([])
  const mousePos = useRef({ x: -999, y: -999 })
  const animRef = useRef<number>(undefined)
  const draggingId = useRef<number | null>(null)
  const dragOffset = useRef({ x: 0, y: 0 })

  const resetTags = useCallback(() => {
    const box = boxRef.current
    if (!box) return
    setTags(createTags(box.clientWidth, box.clientHeight))
  }, [])

  useEffect(() => {
    const box = boxRef.current!
    setTags(createTags(box.clientWidth, box.clientHeight))

    function loop() {
      const W = box.clientWidth
      const H = box.clientHeight

      setTags((prev) =>
        prev.map((tag) => {
          if (tag.dragging) return tag

          let { x, y, vx, vy } = tag
          x += vx
          y += vy
          vx *= 0.99
          vy *= 0.99

          if (x < 8) {
            x = 8
            vx = Math.abs(vx) * 0.5
          }
          if (y < 8) {
            y = 8
            vy = Math.abs(vy) * 0.5
          }
          if (x > W - tag.width - 8) {
            x = W - tag.width - 8
            vx = -Math.abs(vx) * 0.5
          }
          if (y > H - tag.height - 8) {
            y = H - tag.height - 8
            vy = -Math.abs(vy) * 0.5
          }

          const mx = mousePos.current.x
          const my = mousePos.current.y
          const cx = x + tag.width / 2
          const cy = y + tag.height / 2
          const dist = Math.sqrt((cx - mx) ** 2 + (cy - my) ** 2)
          const highlighted = dist < 75

          return { ...tag, x, y, vx, vy, highlighted }
        }),
      )

      animRef.current = requestAnimationFrame(loop)
    }

    animRef.current = requestAnimationFrame(loop)
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!boxRef.current) return
    const rect = boxRef.current.getBoundingClientRect()
    mousePos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }

    if (draggingId.current !== null) {
      setTags((prev) =>
        prev.map((t) =>
          t.id === draggingId.current
            ? {
                ...t,
                x: e.clientX - rect.left - dragOffset.current.x,
                y: e.clientY - rect.top - dragOffset.current.y,
              }
            : t,
        ),
      )
    }
  }

  // Touch support
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!boxRef.current || draggingId.current === null) return
    e.preventDefault()
    const rect = boxRef.current.getBoundingClientRect()
    const touch = e.touches[0]
    mousePos.current = { x: touch.clientX - rect.left, y: touch.clientY - rect.top }
    setTags((prev) =>
      prev.map((t) =>
        t.id === draggingId.current
          ? {
              ...t,
              x: touch.clientX - rect.left - dragOffset.current.x,
              y: touch.clientY - rect.top - dragOffset.current.y,
            }
          : t,
      ),
    )
  }

  const handleTouchStart = (e: React.TouchEvent, id: number, tagX: number, tagY: number) => {
    if (!boxRef.current) return
    const rect = boxRef.current.getBoundingClientRect()
    const touch = e.touches[0]
    draggingId.current = id
    dragOffset.current = {
      x: touch.clientX - rect.left - tagX,
      y: touch.clientY - rect.top - tagY,
    }
    setTags((prev) =>
      prev.map((t) => (t.id === id ? { ...t, dragging: true, vx: 0, vy: 0 } : t)),
    )
  }

  const handleMouseDown = (e: React.MouseEvent, id: number, tagX: number, tagY: number) => {
    e.preventDefault()
    if (!boxRef.current) return
    draggingId.current = id
    const rect = boxRef.current.getBoundingClientRect()
    dragOffset.current = {
      x: e.clientX - rect.left - tagX,
      y: e.clientY - rect.top - tagY,
    }
    setTags((prev) =>
      prev.map((t) => (t.id === id ? { ...t, dragging: true, vx: 0, vy: 0 } : t)),
    )
  }

  const handleMouseUp = () => {
    if (draggingId.current !== null) {
      setTags((prev) =>
        prev.map((t) =>
          t.id === draggingId.current
            ? {
                ...t,
                dragging: false,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
              }
            : t,
        ),
      )
      draggingId.current = null
    }
  }

  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <span className="text-[13px] font-[500] text-text-primary">I can help with ↘</span>
        <button
          type="button"
          onClick={resetTags}
          className="text-[17px] font-[500] text-text-dim hover:text-text-secondary transition-colors"
        >
          ↺
        </button>
        <span className="text-[13px] font-[500] text-text-primary">↙ You&apos;re looking for</span>
      </div>

      <div
        ref={boxRef}
        className="relative w-full h-[360px] sm:h-[290px] bg-page border border-border-subtle rounded-[8px] overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => {
          mousePos.current = { x: -999, y: -999 }
          handleMouseUp()
        }}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        {tags.map((tag) => (
          <span
            key={tag.id}
            onMouseDown={(e) => handleMouseDown(e, tag.id, tag.x, tag.y)}
            onTouchStart={(e) => handleTouchStart(e, tag.id, tag.x, tag.y)}
            className={`absolute select-none text-[12px] font-[400] border border-border-tag transition-colors duration-[120ms] ${
              tag.wide
                ? 'rounded-[8px] px-3 py-2 leading-[1.45] max-w-[148px]'
                : 'rounded-full px-3 py-[5px]'
            } ${tag.highlighted ? 'border-[#444] text-[#ccc]' : 'text-[#888]'}`}
            style={{
              left: tag.x,
              top: tag.y,
              width: tag.wide ? tag.width : undefined,
              transform: `rotate(${tag.rotation}deg)`,
              cursor: tag.dragging ? 'grabbing' : 'grab',
              userSelect: 'none',
              whiteSpace: tag.wide ? 'normal' : 'nowrap',
              zIndex: tag.dragging ? 50 : 1,
            }}
          >
            {tag.label}
          </span>
        ))}

        <span className="absolute bottom-3 right-3 text-[11px] text-text-dimmer pointer-events-none">
          · drag tags · hover to highlight
        </span>
      </div>
    </>
  )
}