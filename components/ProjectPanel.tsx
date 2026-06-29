'use client'
import { Github, ExternalLink } from 'lucide-react'
import type { Project } from '../lib/types'

interface ProjectPanelProps {
  project: Project | null
  open: boolean
  close: () => void
}

export default function ProjectPanel({ project, open, close }: ProjectPanelProps) {
  if (!project) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      style={{ backdropFilter: 'blur(4px)', background: 'rgba(11, 13, 18, 0.6)' }}
      onClick={close}
    >
      {/* Modal box */}
      <div
        className={`relative bg-page border border-border-subtle rounded-[10px] overflow-y-auto transition-all duration-300 w-[92%] max-w-[620px] max-h-[88vh]
          ${open ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-4 opacity-0'}
          sm:w-[80%] sm:max-w-[640px]
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 sm:px-10 py-8 sm:py-10 relative">
          <button
            type="button"
            onClick={close}
            className="absolute top-5 right-5 text-[23px] text-text-dimmer hover:text-text-secondary transition-colors leading-none"
          >
            ×
          </button>

          <div className="w-10 h-10 rounded-[5px] bg-icon-bg flex items-center justify-center">
            <span className="text-[13px] text-text-dim font-[500]">{project.initial}</span>
          </div>

          <h2 className="text-[20px] sm:text-[22px] font-[400] text-text-primary mt-4">{project.name}</h2>
          <p className="text-[13px] text-text-dim mt-1">
            {project.month} · {project.year}
          </p>

          <div className="border-t border-border-subtle my-6" />

          <p className="text-[14px] text-text-secondary leading-[1.75]">{project.description}</p>

          <p className="text-[15px] font-[500] text-text-primary mt-8 mb-3">The work</p>
          <ul className="space-y-3">
            {project.bullets.map((bullet, i) => (
              <li key={i} className="flex gap-3 text-[14px] text-text-secondary leading-[1.6]">
                <span className="text-text-dim mt-[1px] shrink-0">→</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2 mt-7">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-[12px] text-[#888] border border-border-tag rounded-full px-3 py-[4px]"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="border-t border-border-subtle my-6" />

          <p className="text-[15px] font-[500] text-text-primary mb-2">Find out more</p>

          <p className="text-[14px] text-text-secondary leading-[1.7]">
            Curious about the details, decisions, or what I&apos;d build next?{' '}
            <a
              href="mailto:ayushmanjaiswal199@gmail.com"
              className="underline underline-offset-[3px] text-text-secondary hover:text-text-primary transition-colors"
            >
              Let&apos;s talk.
            </a>
          </p>

          <div className="flex gap-3 mt-4 pb-1">
            <a href={project.github} target="_blank" rel="noreferrer">
              <Github size={16} className="text-text-dimmer hover:text-text-secondary transition-colors cursor-pointer" />
            </a>
            <a href={project.live} target="_blank" rel="noreferrer">
              <ExternalLink size={16} className="text-text-dimmer hover:text-text-secondary transition-colors cursor-pointer" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}