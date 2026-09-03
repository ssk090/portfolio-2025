import { Header } from "@/components/header"
import { SectionList } from "@/components/section-list"
import { LinksSection } from "@/components/links-section"
import { Reveal } from "@/components/reveal"
import { SkillsSection } from "@/components/skills-section"
import GitHubCalendar from "@/components/github-calendar"
import { workItems } from "@/lib/work-items"
import { featured } from "@/lib/projects"
import { pageCanonical } from "@/lib/site"
import type { Metadata } from "next"

const projectItems = featured()

export default function HomePage() {
  return (
    <>
      <Reveal>
        <Header />
      </Reveal>
      <Reveal delay={0.2}>
        <GitHubCalendar />
      </Reveal>
      <Reveal delay={0.4}>
        <SectionList title="work ex" items={workItems} />
      </Reveal>
      <Reveal delay={0.6}>
        <SkillsSection />
      </Reveal>
      <Reveal delay={0.8}>
        <SectionList
          title="projects"
          items={projectItems}
          showExternalIcon
          viewAllHref="/projects"
          viewAllText="all projects"
        />
      </Reveal>
      <Reveal delay={1}>
        <LinksSection />
      </Reveal>
    </>
  )
}

export const metadata: Metadata = {
  alternates: pageCanonical("/"),
}
