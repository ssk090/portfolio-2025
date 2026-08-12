/**
 * Project catalog module — single source of truth for portfolio projects.
 * Home takes a featured slice; /projects takes the full record.
 */

export type Project = {
  slug: string
  title: string
  description: string
  role: string
  period?: string
  /** Short bullets for home / section-list views */
  summary: string[]
  /** Full achievement list for the projects page */
  achievements: string[]
  technologies: string[]
  href: string
  /** When true, appears in the home featured slice */
  featured?: boolean
}

/** Shape consumed by SectionList on the homepage */
export type ProjectListItem = {
  title: string
  href: string
  role: string
  period?: string
  description: string[]
}

const catalog: Project[] = [
  {
    slug: "interview-ai",
    title: "interview ai",
    description:
      "full-stack ai mock interview platform for role-based practice with structured feedback and session history",
    role: "side project",
    period: "2025",
    summary: [
      "full-stack ai mock interview platform with role-based practice, structured feedback, and session history",
      "integrated vapi ai for real-time voice interviews and google gemini for question generation and evaluation",
    ],
    achievements: [
      "built role-based mock interviews with structured feedback and session history",
      "integrated vapi ai for real-time voice-based interviews",
      "used google gemini for question generation, evaluation, and personalized feedback",
      "implemented firebase auth, firestore persistence, and shadcn/ui components; deployed on vercel",
    ],
    technologies: [
      "next.js",
      "typescript",
      "firebase",
      "shadcn/ui",
      "tailwind css",
      "google gemini",
      "vapi ai",
    ],
    href: "https://interview-prep-ai-beta.vercel.app/",
    featured: true,
  },
  {
    slug: "merged-github-contribution-calendar",
    title: "merged github contribution calendar",
    description:
      "react component that merges github contribution calendars from multiple users into a single visualization",
    role: "side project",
    period: "2025",
    summary: [
      "react component that combines github contribution calendars from multiple users into one visualization",
      "supports repository mode, manual username comparison, theme customization, and token auth for rate limits",
    ],
    achievements: [
      "combined contribution calendars from multiple github users into one view",
      "added repository mode to fetch contributors automatically and manual mode for selected usernames",
      "implemented theme customization, token support for rate limits/private repos, and a responsive github-style ui",
    ],
    technologies: ["react", "typescript", "github api", "vercel"],
    href: "https://git-contri-merged.vercel.app",
    featured: true,
  },
  {
    slug: "better-rag",
    title: "better-rag",
    description:
      "improved retrieval-augmented generation implementation for better ai responses",
    role: "side project",
    period: "2025",
    summary: [
      "improved retrieval-augmented generation pipeline for higher-quality ai responses",
      "built with modern llm tooling for better context retrieval and grounding",
    ],
    achievements: [
      "built a rag pipeline focused on better context retrieval and grounded answers",
      "experimented with embeddings and modern llm tooling for higher-quality responses",
      "deployed an interactive demo on vercel",
    ],
    technologies: ["typescript", "rag", "embeddings", "llms"],
    href: "https://better-rag.vercel.app/",
    featured: true,
  },
  {
    slug: "ai-commit-gen",
    title: "ai-commit-gen",
    description:
      "developer tool that generates meaningful git commit messages with ai",
    role: "creator",
    period: "2024",
    summary: [
      "automated commit message generation from staged diffs",
      "streamlined local git workflows with ai-assisted messaging",
    ],
    achievements: [
      "automated commit message generation from staged diffs",
      "streamlined local git workflows with ai-assisted messaging",
      "built as a lightweight javascript cli/tooling project",
    ],
    technologies: ["javascript", "ai", "git", "developer tooling"],
    href: "https://github.com/ssk090/ai-commit-gen",
  },
  {
    slug: "shivflix",
    title: "shivflix",
    description: "netflix clone enhanced with imdb-like features",
    role: "creator",
    period: "2022",
    summary: [
      "streaming-style ui with browse and detail views",
      "imdb-inspired metadata and discovery features",
    ],
    achievements: [
      "built a streaming-style ui with browse and detail views",
      "added imdb-inspired metadata and discovery features",
      "focused on modern ui/ux patterns in a javascript app",
    ],
    technologies: ["javascript", "react", "netlify"],
    href: "https://shivflix.netlify.app/",
  },
  {
    slug: "portfolio-2025",
    title: "portfolio 2025",
    description:
      "personal portfolio website showcasing work experience, projects, and writings",
    role: "creator",
    period: "2025",
    summary: [
      "modern portfolio with next.js and typescript",
      "keyboard shortcuts, github calendar, and animated sections",
    ],
    achievements: [
      "built a modern portfolio with next.js and typescript",
      "implemented keyboard shortcuts, github calendar, and animated sections",
      "kept content aligned with resume and open-source work",
    ],
    technologies: ["next.js", "typescript", "tailwind css", "vercel"],
    href: "https://github.com/ssk090/portfolio-2025",
  },
]

function toListItem(project: Project): ProjectListItem {
  return {
    title: project.title,
    href: project.href,
    role: project.role,
    period: project.period,
    description: project.summary,
  }
}

/** Full catalog, stable order. */
export function all(): Project[] {
  return catalog.slice()
}

/** Featured projects for the homepage section list. */
export function featured(): ProjectListItem[] {
  return catalog.filter((p) => p.featured).map(toListItem)
}

/** Lookup by slug. */
export function bySlug(slug: string): Project | null {
  return catalog.find((p) => p.slug === slug) ?? null
}
