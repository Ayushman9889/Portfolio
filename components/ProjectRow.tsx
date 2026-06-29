'use client'
import { ExternalLink } from 'lucide-react'

interface ProjectRowProps {
  project: {
    id: string
    initial: string
    name: string
    month: string
    year: string
    description: string
    live: string
  }
  onClick: () => void
}

export default function ProjectRow({ project, onClick }: ProjectRowProps) {
  return (
    <div
      className="grid gap-x-4 py-[18px] border-b border-border-subtle cursor-pointer group
        grid-cols-[32px_1fr_36px] sm:[grid-template-columns:32px_1fr_45%_36px]"
      onClick={onClick}
    >
      {/* Icon — col 1 */}
      <div className="w-8 h-8 rounded-[5px] bg-icon-bg flex items-center justify-center mt-[2px]">
        <span className="text-[11px] text-text-dim font-[500]">{project.initial}</span>
      </div>

      {/* Name + date — col 2 */}
      <div>
        <p className="text-[14px] font-[500] text-text-primary">{project.name}</p>
        <p className="text-[13px] text-text-dim mt-[2px]">{project.month} · {project.year}</p>
        {/* Description inline under name on mobile only */}
        <p className="sm:hidden text-[13px] text-text-muted leading-[1.6] mt-[6px]">
          {project.description}
        </p>
      </div>

      {/* Description — col 3 on desktop, hidden on mobile */}
      <p className="hidden sm:block text-[14px] text-text-muted leading-[1.6]">
        {project.description}
      </p>

      {/* Arrow + link — col 4 on desktop, col 3 on mobile */}
      <div className="flex flex-col items-center gap-2 pt-[2px] row-start-1 col-start-3 sm:col-start-4">
        <span className="text-[17px] text-text-dimmer group-hover:text-text-secondary transition-colors">→</span>
        <a href={project.live} target="_blank" rel="noreferrer" onClick={(e) => { e.stopPropagation() }}>
          <ExternalLink className="w-4 h-4 text-text-dimmer group-hover:text-text-secondary transition-colors" />
        </a>
      </div>
    </div>
  )
}