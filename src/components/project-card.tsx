import type { Project } from "@/lib/projects"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group border border-gray-800 p-6 transition-colors hover:border-accent/50">
      <Link
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex justify-between items-start mb-4"
      >
        <h2 className="text-2xl font-bold text-white group-hover:text-accent transition-colors">
          {project.title}
        </h2>
        <ArrowUpRight className="w-5 h-5 text-gray-400 rotate-45 group-hover:rotate-0 group-hover:text-accent transition-[transform,color] duration-200" />
      </Link>

      <p className="text-sm text-gray-400 mb-4">
        {project.role} {project.period && `(${project.period})`}
      </p>
      <p className="text-gray-300 mb-6">{project.description}</p>

      <div className="space-y-6">
        <div>
          <h3 className="text-white font-semibold mb-2">achievements</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-400">
            {project.achievements.map((achievement) => (
              <li key={achievement}>{achievement}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-2">technologies</h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((technology) => (
              <span
                key={technology}
                className="px-2 py-1 text-sm text-gray-300 bg-gray-800/50 rounded"
              >
                {technology.toLowerCase()}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}
