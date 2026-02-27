import { ScrambleText } from "@/components/scramble-text"
import { ProjectCard } from "@/components/project-card"
import { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const projects = [
  {
    title: "ai-assistant",
    description:
      "your own personal ai assistant. any os. any platform. the lobster way.",
    role: "creator",
    period: "2025",
    achievements: [
      "built a cross-platform ai assistant using typescript",
      "designed for seamless experience across all operating systems",
      "implemented efficient architecture for extensibility",
    ],
    technologies: ["typescript", "ai/ml"],
    href: "https://github.com/ssk090/ai-assistant",
  },
  {
    title: "recipe-app",
    description: "a recipe website for when you're bored of frozen pizza",
    role: "creator",
    period: "2026",
    achievements: [
      "built interactive recipe search with external api integration",
      "implemented user-friendly search functionality",
      "responsive design for mobile and desktop users",
    ],
    technologies: ["javascript", "react", "api integration"],
    href: "https://github.com/ssk090/imshiv-recipe-app",
  },
  {
    title: "url-editor",
    description: "a minimalist text editor that lives in the url",
    role: "creator",
    period: "2025",
    achievements: [
      "zero-dependency text editor using pure html",
      "portable and lightweight - works in any browser",
      "innovative use of url hash for data storage",
    ],
    technologies: ["html", "javascript"],
    href: "https://github.com/ssk090/url-editor",
  },
  {
    title: "websockets-learning",
    description: "exploring real-time communication with websockets",
    role: "creator",
    period: "2025",
    achievements: [
      "implemented real-time bidirectional communication",
      "type-safe socket handling with typescript",
      "learned websocket protocol internals and best practices",
    ],
    technologies: ["typescript", "websockets", "node.js"],
    href: "https://github.com/ssk090/websockets",
  },
  {
    title: "claude-gemini-proxy",
    description:
      "proxy that exposes antigravity provided claude/gemini models for claude code",
    role: "creator",
    period: "2025",
    achievements: [
      "built proxy server to integrate ai models with claude code",
      "enabled seamless model switching between claude and gemini",
      "implemented secure api key management",
    ],
    technologies: ["javascript", "proxy", "ai apis"],
    href: "https://github.com/ssk090/claude-gemini-proxy",
  },
  {
    title: "portfolio",
    description:
      "personal portfolio website showcasing projects and experience",
    role: "creator",
    period: "2025",
    achievements: [
      "built modern portfolio with next.js and typescript",
      "implemented smooth animations and responsive design",
      "integrated github calendar and project showcases",
    ],
    technologies: ["next.js", "typescript", "tailwind css"],
    href: "https://github.com/ssk090/ssk090",
  },
]

export default function ProjectsPage() {
  return (
    <main className="animate-fade-in-up">
      <h1 className="text-4xl font-bold mb-5 text-white flex">
        <span className="text-accent mr-2 text-7xl font-light">*</span>
        <ScrambleText text="projects" />
      </h1>

      <p className="text-gray-400 mb-12 leading-relaxed">
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

      <div className="space-y-12">
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
