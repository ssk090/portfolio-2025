import { PageHeader } from "@/components/page-header"
import { ProjectCard } from "@/components/project-card"
import { all } from "@/lib/projects"
import { pageOgImages } from "@/lib/site"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const projects = all()

export default function ProjectsPage() {
  return (
    <main className="animate-fade-in-up">
      <PageHeader
        title="projects"
        description={
          <>
            here are some of the projects i&apos;ve worked on. i love building
            tools that solve real problems and exploring new technologies along
            the way. check out my{" "}
            <a
              href="https://github.com/ssk090"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              github
            </a>{" "}
            for more.
          </>
        }
      />

      <div className="space-y-6">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      <Link
        href="https://github.com/ssk090"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 mt-12 text-accent hover:underline group"
      >
        more projects
        <ArrowUpRight className="w-4 h-4 rotate-45 transition-transform duration-200 group-hover:rotate-0" />
      </Link>
    </main>
  )
}

export const metadata: Metadata = {
  title: "Projects",
  description: "Some of the projects I've worked on.",
  openGraph: {
    images: pageOgImages("projects"),
  },
}
