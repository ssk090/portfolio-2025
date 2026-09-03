import { PageHeader } from "@/components/page-header"
import { SectionHeading } from "@/components/section-heading"
import { SectionList } from "@/components/section-list"
import { WorkCompany } from "@/components/work-company"
import {
  certifications,
  educationItems,
  internshipItems,
  workCompanies,
} from "@/lib/work-items"
import { pageCanonical, pageOgImages } from "@/lib/site"
import type { Metadata } from "next"

export default function WorkPage() {
  return (
    <main className="animate-fade-in-up">
      <PageHeader
        title="work"
        description="roles, internships, education, and certifications."
      />
      <section>
        <div className="mb-16 animate-fade-in-up">
          <div className="space-y-8">
            {workCompanies.map((company) => (
              <WorkCompany key={company.title} company={company} />
            ))}
          </div>
        </div>
      </section>
      <SectionList title="internships" items={internshipItems} />
      <SectionList title="education" items={educationItems} />
      <section className="border-t border-neutral-800 pt-10 mb-16 animate-fade-in-up">
        <SectionHeading>certifications</SectionHeading>
        <div className="flex flex-wrap gap-1.5">
          {certifications.map((cert) => (
            <span
              key={cert}
              className="px-1.5 py-0.5 text-gray-300 bg-gray-800/50 transition-colors hover:border-accent/50 duration-300 hover:text-accent border border-gray-800"
            >
              {cert}
            </span>
          ))}
        </div>
      </section>
    </main>
  )
}

export const metadata: Metadata = {
  title: "Work",
  description: "Places I've worked and what I built.",
  alternates: pageCanonical("/work"),
  openGraph: {
    images: pageOgImages("work"),
  },
}
