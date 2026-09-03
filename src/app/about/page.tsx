import { PageHeader } from "@/components/page-header"
import { absoluteUrl, pageCanonical, pageOgImages, site } from "@/lib/site"
import type { Metadata } from "next"
import Link from "next/link"

export default function AboutPage() {
  return (
    <main className="animate-fade-in-up space-y-8">
      <PageHeader
        title="about"
        description="who i am, where i work, and what i build."
      />

      <section className="space-y-4 text-sm text-gray-400 leading-relaxed">
        <p>
          I am {site.name}, a Senior Software Engineer at{" "}
          <a
            href={site.worksFor.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            Altir
          </a>{" "}
          in Hyderabad, Telangana, India. I ship client-facing web and mobile
          products with React, TypeScript, Next.js, and React Native. I also use
          Angular and AI-assisted workflows when the problem needs them.
        </p>
        <p>
          Before Altir I worked at Infosys, ending as a Senior Systems Engineer.
          I built enterprise React and Angular applications, integrated APIs,
          and delivered in agile teams. That work still shapes how I think about
          UI architecture, testing, and performance.
        </p>
        <p>
          This site is my personal portfolio at{" "}
          <a href={site.origin} className="text-accent hover:underline">
            shivanandasai.xyz
          </a>
          . Use it to read writings, scan projects, and review work history. If
          you hire for frontend or full-stack roles, start with the{" "}
          <Link href="/projects" className="text-accent hover:underline">
            projects
          </Link>{" "}
          and{" "}
          <Link href="/work" className="text-accent hover:underline">
            work
          </Link>{" "}
          pages, then{" "}
          <Link href="/contact" className="text-accent hover:underline">
            contact
          </Link>{" "}
          me by email or book a call.
        </p>
        <p>
          Stack highlights: React, TypeScript, Next.js, React Native, Angular,
          shadcn/ui, Vapi, Google Gemini, and practical AI tooling in day-to-day
          product work. I care about clear interfaces, measurable performance,
          and shipping on schedule.
        </p>
      </section>

      <section className="space-y-3 text-sm text-gray-400">
        <h2 className="text-white text-sm">links</h2>
        <ul className="space-y-2">
          <li>
            email:{" "}
            <a
              href={`mailto:${site.email}`}
              className="hover:text-accent transition-colors"
            >
              {site.email}
            </a>
          </li>
          <li>
            github:{" "}
            <a
              href={site.sameAs[0]}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              {site.sameAs[0]}
            </a>
          </li>
          <li>
            linkedin:{" "}
            <a
              href={site.sameAs[1]}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              {site.sameAs[1]}
            </a>
          </li>
          <li>
            x:{" "}
            <a
              href={site.sameAs[2]}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              {site.sameAs[2]}
            </a>
          </li>
          <li>
            book a call:{" "}
            <a
              href={site.sameAs[3]}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              {site.sameAs[3]}
            </a>
          </li>
        </ul>
        <p className="text-gray-600 pt-2">
          also:{" "}
          <Link href="/privacy" className="hover:text-accent transition-colors">
            privacy
          </Link>
          {" · "}
          <span>{absoluteUrl("/about")}</span>
        </p>
      </section>
    </main>
  )
}

export const metadata: Metadata = {
  title: "About",
  description:
    "About Shivananda Sai: Senior Software Engineer at Altir in Hyderabad. React, TypeScript, Next.js, React Native, Angular, and AI workflows.",
  alternates: pageCanonical("/about"),
  openGraph: {
    images: pageOgImages("about"),
  },
}
