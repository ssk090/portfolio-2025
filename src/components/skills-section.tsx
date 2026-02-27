const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React JS",
  "Next JS",
  "React Native",
  "shadcn",
  "vapi",
  "Google Gemini",
  "Express",
  "Node JS",
  "Recoil",
  "MongoDB",
  "Prisma ORM",
  "PostgreSQL",
  "Tailwind CSS",
  "GitHub",
  "Docker",
  "Redux Toolkit",
  "React Query",
  "Jest",
  "Monorepo",
  "Firebase",
  "Vercel",
  "Netlify",
  "AWS",
  "Gen AI",
] as const

function SkillBadge({ tech }: { tech: string }) {
  return (
    <span
      key={tech}
      className="px-2 py-1 text-sm text-gray-300 bg-gray-800/50 transition-colors hover:border-accent/50 duration-300 hover:text-accent border border-gray-800"
    >
      {tech.toLowerCase()}
    </span>
  )
}

export function SkillsSection() {
  return (
    <section className="mb-16 animate-fade-in-up">
      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center text-white">
          <span className="text-accent mr-2">*</span> skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((tech) => (
            <SkillBadge tech={tech} key={tech} />
          ))}
        </div>
      </div>
    </section>
  )
}
