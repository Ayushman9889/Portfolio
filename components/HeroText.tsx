'use client'
import { useEffect, useState, useRef } from 'react'

type Segment = {
  text: string
  style: 'bold' | 'italic' | 'mono' | 'normal'
}

const HEADLINES: Segment[][] = [
  [
    { text: 'Hey — ', style: 'bold' },
    { text: 'need a dev?', style: 'italic' },
  ],
  [
    { text: 'I build ', style: 'mono' },
    { text: 'what matters.', style: 'bold' },
  ],
  [
    { text: 'Full stack. ', style: 'mono' },
    { text: 'Always shipping.', style: 'bold' },
  ],
  [
    { text: 'Ideas. ', style: 'italic' },
    { text: 'Built right.', style: 'bold' },
  ],
  [
    { text: '< Code ', style: 'mono' },
    { text: '→ ', style: 'italic' },
    { text: 'Launch />', style: 'bold' },
  ],
  [
    { text: 'Design. ', style: 'italic' },
    { text: 'Develop. ', style: 'bold' },
    { text: 'Deploy.', style: 'mono' },
  ],
  [
    { text: 'Code that ', style: 'italic' },
    { text: 'ships.', style: 'bold' },
  ],
  [
    { text: 'Ideas ', style: 'italic' },
    { text: 'made real.', style: 'mono' },
  ],
  [
    { text: 'Learn. ', style: 'italic' },
    { text: 'Build. ', style: 'bold' },
    { text: 'Repeat.', style: 'mono' },
  ],
  [
    { text: 'Less talk. ', style: 'italic' },
    { text: 'More code.', style: 'bold' },
  ],
]

function getStyleClass(style: Segment['style']): string {
  switch (style) {
    case 'bold':
      return 'font-[500] text-text-primary'
    case 'italic':
      return 'italic font-[400] text-text-secondary'
    case 'mono':
      return 'font-mono text-[85%] text-text-primary'
    case 'normal':
      return 'font-[400] text-text-secondary'
  }
}

const CHAR_DELAY = 28    // ms per character
const PAUSE_AFTER = 2800 // ms to hold after fully typed
const PAUSE_BEFORE = 400 // ms before starting next

export default function HeroHeadline() {
  const [headlineIdx, setHeadlineIdx] = useState(0)
  const [charCount, setCharCount] = useState(0)
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'clearing'>('typing')
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const currentSegments = HEADLINES[headlineIdx]
  const fullText = currentSegments.map(s => s.text).join('')
  const totalChars = fullText.length

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)

    if (phase === 'typing') {
      if (charCount < totalChars) {
        timerRef.current = setTimeout(() => {
          setCharCount(c => c + 1)
        }, CHAR_DELAY)
      } else {
        timerRef.current = setTimeout(() => {
          setPhase('clearing')
        }, PAUSE_AFTER)
      }
    } else if (phase === 'clearing') {
      timerRef.current = setTimeout(() => {
        setCharCount(0)
        setHeadlineIdx(i => (i + 1) % HEADLINES.length)
        setPhase('typing')
      }, PAUSE_BEFORE)
    }

    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [phase, charCount, totalChars])

  // slice segments to only show charCount characters
  function renderVisible() {
    let remaining = charCount
    return currentSegments.map((seg, i) => {
      if (remaining <= 0) return null
      const visible = seg.text.slice(0, remaining)
      remaining -= seg.text.length
      return (
        <span key={i} className={getStyleClass(seg.style)}>
          {visible}
        </span>
      )
    })
  }

  return (
    <h1 className="text-[24px] sm:text-[30px] leading-tight mb-5 h-[36px] sm:h-[44px]">
      {renderVisible()}
      <span
        className="inline-block w-[2px] h-[1em] bg-text-primary align-middle ml-[1px]"
        style={{ animation: 'blink 1s step-end infinite' }}
      />
      <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
    </h1>
  )
}