const skillGroups = [
  {
    category: "languages",
    skills: ["TypeScript", "JavaScript", "Go", "Python"],
  },
  {
    category: "frontend",
    skills: [
      "React",
      "Next.js",
      "React Native",
      "Angular",
      "Redux Toolkit",
      "Recoil",
      "React Query",
      "Tailwind CSS",
      "shadcn/ui",
      "Material UI",
    ],
  },
  {
    category: "backend",
    skills: ["Node.js", "Express.js", "Spring Boot", "REST APIs", "WebSockets"],
  },
  {
    category: "databases",
    skills: [
      "PostgreSQL",
      "MongoDB",
      "MySQL",
      "Prisma ORM",
      "SQLite",
      "Qdrant",
      "Firebase",
    ],
  },
  {
    category: "ai / ml",
    skills: ["Google Gemini", "Vapi AI", "Groq", "Ollama", "MCP"],
  },
  {
    category: "devops & tools",
    skills: ["Git", "Docker", "Vercel", "AWS", "Jest", "Monorepo"],
  },
] as const

function SkillBadge({ tech }: { tech: string }) {
  return (
    <span className="px-1.5 py-0.5 text-xs text-gray-300 bg-gray-800/50 transition-colors hover:border-accent/50 duration-300 hover:text-accent border border-gray-800">
      {tech.toLowerCase()}
    </span>
  )
}

export function SkillsSection() {
  return (
    <section className="mb-16 animate-fade-in-up">
      <h2 className="text-2xl font-bold mb-6 flex items-center text-white">
        <span className="text-accent mr-2">*</span> skills
      </h2>
      <div className="space-y-4">
        {skillGroups.map((group) => (
          <div key={group.category}>
            <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 font-mono">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {group.skills.map((tech) => (
                <SkillBadge tech={tech} key={tech} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
