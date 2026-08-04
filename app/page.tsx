'use client'
import { useState, useEffect, useRef } from 'react'
import { Github, Linkedin, Mail } from 'lucide-react'
import HeroCanvas from '../components/HeroCanvas'
import ProjectRow from '../components/ProjectRow'
import ProjectPanel from '../components/ProjectPanel'
import SkillBox from '../components/SkillBox'
import HeroTerminal from '../components/HeroTerminal'
import HeroText from '../components/HeroText'
import type { Project } from '../lib/types'


const projects: Project[] = [
  {
    id: 'cook-with-zavo',
    initial: 'C',
    name: 'Cook-With-Zavo',
    month: 'May',
    year: '2026',
    description: 'AI-powered recipe generation platform. Gemini API transforms pantry ingredients into structured recipes with nutrition, substitutions, and PDF export.',
    bullets: [
      'Architected 10 routes across auth, dashboard, pantry, and recipe-discovery modules with Next.js 16 and React 19',
      'Engineered AI recipe-generation pipeline with Google Gemini API — raw pantry ingredients into structured recipes with instructions, nutrition, and substitutions',
      'Designed 3 custom content types in Strapi CMS backed by NeonDB (serverless PostgreSQL), synced to Clerk for subscription-tier access control',
      'Hardened backend API routes with Arcjet middleware for bot detection and rate limiting, layered with Clerk-protected routes and JWT-based session validation',
      'Built print-ready PDF export pipeline with @react-pdf/renderer and integrated TheMealDB API for category- and cuisine-based recipe discovery',
    ],
    tech: ['Next.js 16', 'React 19', 'JavaScript', 'Shadcn UI', 'Google Gemini API', 'Strapi CMS', 'NeonDB', 'Clerk', 'Arcjet', 'Cloudinary'],
    github: 'https://github.com/Ayushman9889/Cook-With-Zavo',
    live: "https://zavo.ayushman.works",
  },
  {
    id: 'thumblify',
    initial: 'T',
    name: 'Thumblify',
    month: 'March',
    year: '2026',
    description: 'Generate multiple AI thumbnail variations from a single text prompt. MERN stack with Gemini API for intelligent visual content creation.',
    bullets: [
      'Architected full-stack TypeScript MERN application generating multiple AI thumbnail variations from a single text prompt',
      'Engineered AI-assisted thumbnail workflow using Gemini API — multiple thumbnail concepts and prompt variations from one user input',
      'Implemented secure JWT-based authentication covering sign-up, login, and server-side session validation to protect user accounts and generation history',
      'Optimized asset delivery using Cloudinary CDN for images and MongoDB for user metadata, minimizing server-side load',
      'Built centralized async API state management with error boundaries, streamlining high-resolution thumbnail downloads and reducing redundant requests',
    ],
    tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'TypeScript', 'Google Gemini API', 'Cloudinary', 'JWT Authentication'],
    github: 'https://github.com/Ayushman9889/Thumblify',
    live: "https://thumblify.ayushman.works",
  },
]

const achievements = [
  { platform: 'LeetCode', sublabel: 'Contest Rating', stat: '1825+', badge: '300+ Problems Solved', profileUrl: 'https://leetcode.com/u/Ayushman_9889/' },
  { platform: 'CodeChef', sublabel: 'Contest Rating', stat: '1550+', badge: '2★ Rated', profileUrl: 'https://www.codechef.com/users/ayushman_67' },
  { platform: 'HackerRank', sublabel: 'Problem Solving', stat: 'Intermediate', badge: 'Certified', profileUrl: 'https://www.hackerrank.com/certificates/iframe/55a645ec3075' },
  { platform: 'HackerRank', sublabel: 'C++', stat: '5★', badge: 'Badge Earned', profileUrl: 'https://www.hackerrank.com/profile/ayushmanjaiswal1' },
]

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const typed = useRef('')
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return

      typed.current += e.key.toLowerCase()
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(() => { typed.current = '' }, 1200)

      if (typed.current.endsWith('resume')) {
        typed.current = ''
        window.open('/resume.pdf', '_blank')
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => {
      window.removeEventListener('keydown', handleKey)
      if (timer.current) clearTimeout(timer.current)
    }
  }, [])

  return (
    <main className="w-full min-h-screen bg-page">

      <div className="max-w-content mx-auto px-5 sm:px-6 md:px-10 py-16">

        <div className="mb-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[15px] font-[500] text-text-primary">Ayushman</span>
            <span className="w-[6px] h-[6px] rounded-full bg-[#3a8a3a]" />
          </div>
          <p className="text-[13px] text-text-dim">
            Full Stack Developer · Ghaziabad, UP · Open to Work
          </p>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-[14px]">
              <a href="https://github.com/Ayushman9889" target="_blank" rel="noreferrer">
                <Github size={15} className="text-text-dimmer hover:text-text-secondary transition-colors" />
              </a>
              <a href="https://linkedin.com/in/ayushman-jaiswal-06847228a" target="_blank" rel="noreferrer">
                <Linkedin size={15} className="text-text-dimmer hover:text-text-secondary transition-colors" />
              </a>
              <a href="mailto:ayushmanjaiswal199@gmail.com">
                <Mail size={15} className="text-text-dimmer hover:text-text-secondary transition-colors" />
              </a>
            </div>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="text-[12px] text-text-dimmer hover:text-text-secondary transition-colors"
            >
              type <span className="font-[500] text-text-dim">resume</span> anywhere ↗
            </a>
          </div>
        </div>

        <div className="border-b border-border-subtle my-6" />

        <section className="mb-[50px]">
          <HeroText />
          <div className="text-[15px] text-text-secondary leading-[1.8] space-y-[14px]">
            <p>
              I&apos;m a <em className="italic">full-stack developer</em> passionate about building
              end-to-end digital products. I enjoy taking ideas from{' '}
              <strong className="font-[500] text-text-primary">design to code</strong> and into
              the hands of users. Currently in my{' '}
              <strong className="font-[500] text-text-primary">4th year of B.Tech CSE</strong>.
            </p>
            <p>
              My most recent adventure was building{' '}
              <button
                type="button"
                onClick={() => setSelectedProject(projects[0])}
                className="underline underline-offset-[3px] text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
              >
                Cook-With-Zavo
              </button>{' '}
              . I&apos;m now looking for my next challenge.
            </p>
          </div>

          <HeroTerminal />
        </section>

        <section id="work" className="mb-[50px]">
          <p className="text-[15px] font-[500] text-text-primary mb-6">Work &amp; Projects</p>
          {projects.map((project) => (
            <ProjectRow key={project.id} project={project} onClick={() => setSelectedProject(project)} />
          ))}
        </section>

        <section id="skills" className="mb-[50px]">
          <p className="text-[15px] font-[500] text-text-primary mb-6">Skills</p>
          <p className="text-[15px] text-text-secondary leading-[1.8] mb-5">
            In pursuit of <em className="italic">infinite learning</em>, I went from solving DSA problems in
            competitive programming to{' '}
            <strong className="font-[500] text-text-primary">building full-stack applications</strong>{' '}
            with AI integrations,{' '}
            <strong className="font-[500] text-text-primary">designing polished UIs</strong>, and
            shipping production-ready products with auth, CDN, CMS, and serverless infrastructure.
          </p>
          <SkillBox />
        </section>

        <section id="achievements" className="mb-[50px]">
          <p className="text-[15px] font-[500] text-text-primary mb-6">Achievements</p>
          {achievements.map((item, i) => (
            <div
              key={i}
              className="grid grid-cols-[1fr_auto] gap-y-[2px] py-[16px] border-b border-border-subtle items-start sm:grid-cols-[180px_1fr_auto]"
            >
              <div>
                <div className="flex items-center gap-[5px]">
                  <p className="text-[14px] font-[500] text-text-primary">{item.platform}</p>
                  {item.profileUrl && (
                    <a
                      href={item.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${item.platform} profile`}
                      className="text-text-dim hover:text-text-secondary transition-colors mt-[1px]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  )}
                </div>
                <p className="text-[13px] text-text-dim mt-[2px]">{item.sublabel}</p>
                <p className="text-[14px] text-text-secondary mt-[2px] sm:hidden">{item.stat}</p>
              </div>
              <p className="hidden sm:block text-[14px] text-text-secondary">{item.stat}</p>
              <span className="text-[12px] text-text-dim border border-border-tag rounded-full px-3 py-[3px] self-start">
                {item.badge}
              </span>
            </div>
          ))}
        </section>

        <section id="education" className="mb-[50px]">
          <p className="text-[15px] font-[500] text-text-primary mb-5">Education</p>
          <p className="text-[15px] text-text-secondary leading-[1.8]">
            I&apos;m an undergraduate at ABES Engineering College, Ghaziabad (B.Tech CSE, 2023-2027), maintaining a CGPA of 8.1/10. My foundation spans Data Structures &amp; Algorithms, OOP, DBMS, Operating Systems, and Computer Networks — the building blocks I apply every time I ship something real.
          </p>
        </section>

        <section className="mb-[50px]">
          <p className="text-[15px] font-[500] text-text-primary mb-5">What&apos;s next</p>
          <p className="text-[15px] text-text-secondary leading-[1.8] mb-4">
            If any of the work I&apos;ve built resonates with you or something you&apos;re building,
            then{' '}
            <a
              href="mailto:ayushmanjaiswal199@gmail.com"
              className="underline underline-offset-[3px] text-text-primary"
            >
              let&apos;s connect!
            </a>{' '}
            I&apos;m actively looking for internships and open-source collaborations in
            full-stack development or AI-integrated products.
          </p>

          <div className="flex items-center gap-[14px] mt-5">
            <a href="https://github.com/Ayushman9889" target="_blank" rel="noreferrer">
              <Github size={15} className="text-text-dimmer hover:text-text-secondary transition-colors cursor-pointer" />
            </a>
            <a href="https://linkedin.com/in/ayushman-jaiswal-06847228a" target="_blank" rel="noreferrer">
              <Linkedin size={15} className="text-text-dimmer hover:text-text-secondary transition-colors cursor-pointer" />
            </a>
            <a href="mailto:ayushmanjaiswal199@gmail.com">
              <Mail size={15} className="text-text-dimmer hover:text-text-secondary transition-colors cursor-pointer" />
            </a>
          </div>
        </section>

      </div>

      <ProjectPanel project={selectedProject} open={!!selectedProject} close={() => setSelectedProject(null)} />
    </main>
  )
}
