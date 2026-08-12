import { ScrambleText } from "@/components/scramble-text"
import { ProjectCard } from "@/components/project-card"
import { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const projects = [
  {
    title: "interview ai",
    description:
      "full-stack ai mock interview platform for role-based practice with structured feedback and session history",
    role: "creator",
    period: "2025",
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
  },
  {
    title: "merged github contribution calendar",
    description:
      "react component that merges github contribution calendars from multiple users into a single visualization",
    role: "creator",
    period: "2025",
    achievements: [
      "combined contribution calendars from multiple github users into one view",
      "added repository mode to fetch contributors automatically and manual mode for selected usernames",
      "implemented theme customization, token support for rate limits/private repos, and a responsive github-style ui",
    ],
    technologies: ["react", "typescript", "github api", "vercel"],
    href: "https://git-contri-merged.vercel.app",
  },
  {
    title: "better-rag",
    description:
      "improved retrieval-augmented generation implementation for better ai responses",
    role: "creator",
    period: "2025",
    achievements: [
      "built a rag pipeline focused on better context retrieval and grounded answers",
      "experimented with embeddings and modern llm tooling for higher-quality responses",
      "deployed an interactive demo on vercel",
    ],
    technologies: ["typescript", "rag", "embeddings", "llms"],
    href: "https://better-rag.vercel.app/",
  },
  {
    title: "ai-commit-gen",
    description:
      "developer tool that generates meaningful git commit messages with ai",
    role: "creator",
    period: "2024",
    achievements: [
      "automated commit message generation from staged diffs",
      "streamlined local git workflows with ai-assisted messaging",
      "built as a lightweight javascript cli/tooling project",
    ],
    technologies: ["javascript", "ai", "git", "developer tooling"],
    href: "https://github.com/ssk090/ai-commit-gen",
  },
  {
    title: "shivflix",
    description: "netflix clone enhanced with imdb-like features",
    role: "creator",
    period: "2022",
    achievements: [
      "built a streaming-style ui with browse and detail views",
      "added imdb-inspired metadata and discovery features",
      "focused on modern ui/ux patterns in a javascript app",
    ],
    technologies: ["javascript", "react", "netlify"],
    href: "https://shivflix.netlify.app/",
  },
  {
    title: "portfolio 2025",
    description:
      "personal portfolio website showcasing work experience, projects, and writings",
    role: "creator",
    period: "2025",
    achievements: [
      "built a modern portfolio with next.js and typescript",
      "implemented keyboard shortcuts, github calendar, and animated sections",
      "kept content aligned with resume and open-source work",
    ],
    technologies: ["next.js", "typescript", "tailwind css", "vercel"],
    href: "https://github.com/ssk090/portfolio-2025",
  },
]

export default function ProjectsPage() {
  return (
    <main className="animate-fade-in-up">
      <h1 className="text-4xl font-bold mb-5 text-white flex">
        <span className="text-accent mr-2 text-7xl font-light">*</span>
        <ScrambleText text="projects" />
      </h1>

      <p className="text-gray-400 mb-6 leading-relaxed">
        here are some of the projects i&apos;ve worked on. i love building tools
        that solve real problems and exploring new technologies along the way.
        check out my{" "}
        <a
          href="https://github.com/ssk090"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          github
        </a>{" "}
        for more.
      </p>

      <div className="space-y-6">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>

      <Link
        href="https://github.com/ssk090"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 mt-12 text-accent hover:underline group"
      >
        more projects
        <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
      </Link>
    </main>
  )
}

export const metadata: Metadata = {
  title: "Projects",
  description: "Some of the projects I've worked on.",
  openGraph: {
    images: [
      {
        url: "https://www.nexxel.dev/og/home?title=projects",
      },
    ],
  },
}
