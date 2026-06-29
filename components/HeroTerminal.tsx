'use client'
import { useEffect, useRef } from 'react'

type Line = {
  text: string
  color: string
  delay: number
}

const SEQUENCES: Line[][] = [
  [
    { text: 'ayushman@dev:~$ ', color: '#555', delay: 0 },
    { text: 'npm run dev\n', color: '#c0c0c0', delay: 0 },
    { text: '\n', color: '', delay: 270 },
    { text: '  ▲ Next.js 16.2.9 (Turbopack)\n', color: '#3a3a3a', delay: 576 },
    { text: '  - Local:   http://localhost:3000\n', color: '#3a3a3a', delay: 900 },
    { text: '  ✓ Ready in 893ms\n', color: '#3a8a3a', delay: 1404 },
    { text: '\n', color: '', delay: 1620 },
    { text: 'ayushman@dev:~$ ', color: '#555', delay: 1980 },
    { text: 'git log --oneline -4\n', color: '#c0c0c0', delay: 1980 },
    { text: 'a3f91bc ', color: '#7a9fc0', delay: 2430 },
    { text: 'feat: add AI recipe pipeline (Gemini API)\n', color: '#444', delay: 2430 },
    { text: 'c72d004 ', color: '#7a9fc0', delay: 2790 },
    { text: 'fix: arcjet rate limiting on /api/generate\n', color: '#444', delay: 2790 },
    { text: 'e109af7 ', color: '#7a9fc0', delay: 3150 },
    { text: 'refactor: clerk + neondb session sync\n', color: '#444', delay: 3150 },
    { text: '7b3c21d ', color: '#7a9fc0', delay: 3510 },
    { text: 'init: next.js 16 + shadcn setup\n', color: '#444', delay: 3510 },
    { text: '\n', color: '', delay: 3780 },
    { text: 'ayushman@dev:~$ ', color: '#555', delay: 4140 },
    { text: 'cat stack.json\n', color: '#c0c0c0', delay: 4140 },
    { text: '{\n', color: '#444', delay: 4590 },
    { text: '  "frontend" : ', color: '#444', delay: 4860 },
    { text: '"Next.js · React · Tailwind · Shadcn"\n', color: '#7a9fc0', delay: 4860 },
    { text: '  "backend"  : ', color: '#444', delay: 5130 },
    { text: '"Node.js · Express · NeonDB · Strapi"\n', color: '#7a9fc0', delay: 5130 },
    { text: '  "ai"       : ', color: '#444', delay: 5400 },
    { text: '"Google Gemini API"\n', color: '#7a9fc0', delay: 5400 },
    { text: '  "auth"     : ', color: '#444', delay: 5670 },
    { text: '"Clerk · JWT · Arcjet"\n', color: '#7a9fc0', delay: 5670 },
    { text: '  "infra"    : ', color: '#444', delay: 5940 },
    { text: '"Vercel · Cloudinary · GitHub"\n', color: '#7a9fc0', delay: 5940 },
    { text: '}\n', color: '#444', delay: 6210 },
  ],
  [
    { text: 'ayushman@dev:~$ ', color: '#555', delay: 0 },
    { text: 'npm install\n', color: '#c0c0c0', delay: 0 },
    { text: '\n', color: '', delay: 360 },
    { text: '  added 312 packages in 4.2s\n', color: '#3a3a3a', delay: 720 },
    { text: '\n', color: '', delay: 900 },
    { text: 'ayushman@dev:~$ ', color: '#555', delay: 1260 },
    { text: 'git status\n', color: '#c0c0c0', delay: 1260 },
    { text: '\n', color: '', delay: 1620 },
    { text: 'On branch ', color: '#444', delay: 1800 },
    { text: 'main\n', color: '#7a9fc0', delay: 1800 },
    { text: 'Changes not staged:\n', color: '#444', delay: 2070 },
    { text: '  modified: ', color: '#444', delay: 2340 },
    { text: 'components/ProjectPanel.tsx\n', color: '#c87a3a', delay: 2340 },
    { text: '  modified: ', color: '#444', delay: 2610 },
    { text: 'app/page.tsx\n', color: '#c87a3a', delay: 2610 },
    { text: '  new file: ', color: '#444', delay: 2880 },
    { text: 'components/SkillBox.tsx\n', color: '#3a8a3a', delay: 2880 },
    { text: '\n', color: '', delay: 3150 },
    { text: 'ayushman@dev:~$ ', color: '#555', delay: 3510 },
    { text: 'git add . && git commit -m "feat: mobile responsive"\n', color: '#c0c0c0', delay: 3510 },
    { text: '\n', color: '', delay: 3960 },
    { text: '  [main f4c12ab] feat: mobile responsive\n', color: '#3a8a3a', delay: 4320 },
    { text: '  3 files changed, 142 insertions(+), 18 deletions(-)\n', color: '#3a3a3a', delay: 4590 },
    { text: '\n', color: '', delay: 4860 },
    { text: 'ayushman@dev:~$ ', color: '#555', delay: 5220 },
    { text: 'vercel --prod\n', color: '#c0c0c0', delay: 5220 },
    { text: '\n', color: '', delay: 5580 },
    { text: '  Deploying to production...\n', color: '#3a3a3a', delay: 5940 },
    { text: '  ✓ Build completed in 12s\n', color: '#3a8a3a', delay: 6660 },
    { text: '  ✓ Deployed to ', color: '#3a8a3a', delay: 7020 },
    { text: 'cook-with-zavo.vercel.app\n', color: '#7a9fc0', delay: 7020 },
  ],
  [
    { text: 'ayushman@dev:~$ ', color: '#555', delay: 0 },
    { text: 'node -e "console.log(process.versions)"\n', color: '#c0c0c0', delay: 0 },
    { text: '{\n', color: '#444', delay: 540 },
    { text: '  node: ', color: '#444', delay: 810 },
    { text: "'22.4.0'\n", color: '#7a9fc0', delay: 810 },
    { text: '  v8:   ', color: '#444', delay: 1080 },
    { text: "'12.4.254.20'\n", color: '#7a9fc0', delay: 1080 },
    { text: '}\n', color: '#444', delay: 1350 },
    { text: '\n', color: '', delay: 1620 },
    { text: 'ayushman@dev:~$ ', color: '#555', delay: 1980 },
    { text: 'cat about.json\n', color: '#c0c0c0', delay: 1980 },
    { text: '{\n', color: '#444', delay: 2430 },
    { text: '  "name"     : ', color: '#444', delay: 2700 },
    { text: '"Ayushman"\n', color: '#7a9fc0', delay: 2700 },
    { text: '  "role"     : ', color: '#444', delay: 2970 },
    { text: '"Full Stack Developer"\n', color: '#7a9fc0', delay: 2970 },
    { text: '  "year"     : ', color: '#444', delay: 3240 },
    { text: '"4th year B.Tech CSE"\n', color: '#7a9fc0', delay: 3240 },
    { text: '  "college"  : ', color: '#444', delay: 3510 },
    { text: '"ABES Engineering College"\n', color: '#7a9fc0', delay: 3510 },
    { text: '  "cgpa"     : ', color: '#444', delay: 3780 },
    { text: '"8.1 / 10"\n', color: '#7a9fc0', delay: 3780 },
    { text: '  "open"     : ', color: '#444', delay: 4050 },
    { text: 'true\n', color: '#3a8a3a', delay: 4050 },
    { text: '  "email"    : ', color: '#444', delay: 4320 },
    { text: '"ayushmanjaiswal199@gmail.com"\n', color: '#7a9fc0', delay: 4320 },
    { text: '}\n', color: '#444', delay: 4680 },
    { text: '\n', color: '', delay: 4950 },
    { text: 'ayushman@dev:~$ ', color: '#555', delay: 5310 },
    { text: 'echo "open to work"\n', color: '#c0c0c0', delay: 5310 },
    { text: 'open to work\n', color: '#3a8a3a', delay: 5760 },
  ],
]

export default function HeroTerminal() {
  const outputRef = useRef<HTMLDivElement>(null)
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const seqRef = useRef(0)

  function clearTimeouts() {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
  }

  function runSequence(seqIndex: number) {
    const out = outputRef.current
    if (!out) return
    out.innerHTML = ''

    const seq = SEQUENCES[seqIndex]
    let cursor: HTMLSpanElement | null = null

    seq.forEach((line, i) => {
      const t = setTimeout(() => {
        if (cursor) cursor.remove()

        const span = document.createElement('span')
        span.textContent = line.text
        span.style.color = line.color
        span.style.whiteSpace = 'pre-wrap'
        out.appendChild(span)

        if (i === seq.length - 1) {
          cursor = document.createElement('span')
          cursor.style.cssText = 'display:inline-block;width:7px;height:12px;background:#555;vertical-align:middle;animation:blink 1s step-end infinite;'
          out.appendChild(cursor)

          const next = setTimeout(() => {
            seqRef.current = (seqRef.current + 1) % SEQUENCES.length
            runSequence(seqRef.current)
          }, 5000)
          timeoutsRef.current.push(next)
        }

        out.scrollTop = out.scrollHeight
      }, line.delay)

      timeoutsRef.current.push(t)
    })
  }

  useEffect(() => {
    runSequence(0)
    return () => clearTimeouts()
  }, [])

  return (
    <div
      className="w-full mt-6 rounded-[8px] border border-border-subtle overflow-hidden"
      style={{ background: '#0b0d12' }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-2 px-4 py-[10px] border-b border-border-subtle"
        style={{ background: '#111318' }}
      >
        <span className="w-[10px] h-[10px] rounded-full" style={{ background: '#2a2a2a' }} />
        <span className="w-[10px] h-[10px] rounded-full" style={{ background: '#2a2a2a' }} />
        <span className="w-[10px] h-[10px] rounded-full" style={{ background: '#2a2a2a' }} />
        <span className="ml-2 text-[12px]" style={{ color: '#3a3a3a', fontFamily: 'monospace' }}>
          ayushman ~ portfolio
        </span>
      </div>

      {/* Output */}
      <div
        ref={outputRef}
        className="px-5 py-4 overflow-y-auto"
style={{
          minHeight: '260px',
          maxHeight: '260px',
          fontFamily: "'Courier New', monospace",
          fontSize: 'clamp(10px, 2.5vw, 13px)',
          lineHeight: '1.7',
          wordBreak: 'break-all',
          overflowWrap: 'anywhere',
        }}
      />

      <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
    </div>
  )
}