"use client"

import { Header } from "@/components/header"
import { Item, SectionList } from "@/components/section-list"
import { LinksSection } from "@/components/links-section"
import { motion } from "framer-motion"
import { SkillsSection } from "@/components/skills-section"
import GithubCalender from "@/components/github-calender"

const workItems: Item[] = [
  {
    title: "altir india private limited",
    role: "senior software engineer",
    location: "hyderabad, india",
    period: "april 2023 - present",
    description: [
      "worked on a web application using react, typescript, and supporting libraries to fix bugs and develop new features, improving overall functionality, performance, and user experience",
      "self-learned react native and delivered a cross-platform mobile app within 2 months and received client appreciations",
      "worked closely with designers, backend developers, and testers to deliver clean, efficient, and reliable code on time",
    ],
    href: "https://www.altir.co/",
  },
  {
    title: "infosys limited",
    role: "senior systems engineer",
    location: "hyderabad, india",
    period: "nov 2020 - mar 2023",
    description: [
      "developed and maintained scalable web apps using react, angular, and typescript, improving performance and usability across client projects",
      "delivered new features, fixed bugs, and integrated APIs in agile teams, boosting user experience by up to 60%",
      "enhanced ui reusability and increased unit test coverage from 65% to 85% while supporting deployments with spring boot, git, and mysql",
    ],
    href: "https://www.infosys.com/",
  },
]

const projectItems = [
  {
    title: "interview-prep-ai",
    role: "side project",
    description: [
      "an ai-powered interview preparation tool built primarily with next.js, typescript, and gemini api",
    ],
    href: "https://interview-prep-ai-beta.vercel.app/",
  },
  {
    title: "shivflix",
    role: "side project",
    description: [
      "A Netflix clone enhanced with IMDb-like features, built primarily using JavaScript",
    ],
    href: "https://shivflix.netlify.app/",
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
      {/* <BlogSection /> */}
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
