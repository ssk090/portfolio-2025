"use client"

import { Header } from "@/components/header"
import { Item, SectionList } from "@/components/section-list"
import { LinksSection } from "@/components/links-section"
import { motion } from "motion/react"
import { SkillsSection } from "@/components/skills-section"
import GithubCalender from "@/components/github-calender"
import { workItems } from "@/lib/work-items"

const projectItems: Item[] = [
  {
    title: "interview ai",
    role: "side project",
    description: [
      "full-stack ai mock interview platform with role-based practice, structured feedback, and session history",
      "integrated vapi ai for real-time voice interviews and google gemini for question generation and evaluation",
    ],
    href: "https://interview-prep-ai-beta.vercel.app/",
  },
  {
    title: "merged github contribution calendar",
    role: "side project",
    description: [
      "react component that combines github contribution calendars from multiple users into one visualization",
      "supports repository mode, manual username comparison, theme customization, and token auth for rate limits",
    ],
    href: "https://git-contri-merged.vercel.app",
  },
  {
    title: "better-rag",
    role: "side project",
    description: [
      "improved retrieval-augmented generation pipeline for higher-quality ai responses",
      "built with modern llm tooling for better context retrieval and grounding",
    ],
    href: "https://better-rag.vercel.app/",
  },
]

export default function HomePage() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut", delay: 0 }}
      >
        <Header />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut", delay: 0.2 }}
      >
        <GithubCalender />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut", delay: 0.4 }}
      >
        <SectionList title="work ex" items={workItems} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut", delay: 0.6 }}
      >
        <SkillsSection />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut", delay: 0.8 }}
      >
        <SectionList
          title="projects"
          items={projectItems}
          viewAllHref="/projects"
          viewAllText="all projects"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut", delay: 1 }}
      >
        <LinksSection />
      </motion.div>
    </>
  )
}
