import { PageHeader } from "@/components/page-header"
import { SectionList } from "@/components/section-list"
import { workItems } from "@/lib/work-items"
import { pageCanonical, pageOgImages } from "@/lib/site"
import type { Metadata } from "next"

export default function WorkPage() {
  return (
    <main className="animate-fade-in-up">
      <PageHeader
        title="work"
        description="here's where i've worked and the kind of products i helped ship."
      />
      <SectionList
        title="work"
        items={workItems}
        showTitle={false}
        showSectionBorder={false}
      />
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
