export type Project = {
  id: string
  initial: string
  name: string
  month: string
  year: string
  description: string
  bullets: string[]
  tech: string[]
  github: string
  live: string
}

export type Experience = {
  id: string
  role: string
  company: string
  location: string
  period: string
  initial: string
  bullets: string[]
  skills?: string[]
}
