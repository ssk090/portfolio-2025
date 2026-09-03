import { Header } from "@/components/header"
import { SectionList } from "@/components/section-list"
import { SectionHeading } from "@/components/section-heading"
import { WorkCompany } from "@/components/work-company"
import { LinksSection } from "@/components/links-section"
import { Reveal } from "@/components/reveal"
import { SkillsSection } from "@/components/skills-section"
import GitHubCalendar from "@/components/github-calendar"
import { workCompanies } from "@/lib/work-items"
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
        <section className="border-t border-neutral-800 pt-10">
          <div className="mb-16 animate-fade-in-up">
            <SectionHeading>work ex</SectionHeading>
            <div className="space-y-8">
              {workCompanies.map((company) => (
                <WorkCompany key={company.title} company={company} />
              ))}
            </div>
          </div>
        </section>
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
