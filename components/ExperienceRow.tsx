'use client'
import type { Experience } from '../lib/types'

interface ExperienceRowProps {
  experience: Experience
}

export default function ExperienceRow({ experience }: ExperienceRowProps) {
  return (
    <div className="py-[20px] border-b border-border-subtle">
      <div className="flex items-start gap-3.5">
        {/* Initial icon box */}
        <div className="w-8 h-8 rounded-[5px] bg-icon-bg flex items-center justify-center mt-[2px] shrink-0">
          <span className="text-[11px] text-text-dim font-[500]">{experience.initial}</span>
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-4">
            <div>
              <h3 className="text-[14px] font-[500] text-text-primary leading-snug">
                {experience.role}
              </h3>
              <p className="text-[13px] text-text-dim mt-[2px]">
                {experience.company} · {experience.location}
              </p>
            </div>
            <span className="text-[12px] text-text-dim border border-border-tag rounded-full px-3 py-[3px] self-start sm:self-auto shrink-0 mt-1 sm:mt-0">
              {experience.period}
            </span>
          </div>

          {/* Bullets */}
          <ul className="space-y-2.5 mt-3.5">
            {experience.bullets.map((bullet, idx) => (
              <li key={idx} className="flex gap-2.5 text-[14px] text-text-secondary leading-[1.6]">
                <span className="text-text-dim mt-[1px] shrink-0">→</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          {/* Skill tags */}
          {experience.skills && experience.skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {experience.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-[12px] text-[#888] border border-border-tag rounded-full px-3 py-[3px]"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
