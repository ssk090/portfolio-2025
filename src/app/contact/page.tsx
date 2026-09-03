import { PageHeader } from "@/components/page-header"
import { pageCanonical, pageOgImages, site } from "@/lib/site"
import type { Metadata } from "next"
import Link from "next/link"

export default function ContactPage() {
  return (
    <main className="animate-fade-in-up space-y-8">
      <PageHeader
        title="contact"
        description="email, socials, and a booking link for a short call."
      />

      <section className="space-y-4 text-sm text-gray-400 leading-relaxed">
        <p>
          I am {site.name}. Reach out if you want to hire for frontend or
          full-stack work, talk through a project on this site, or schedule a
          short call. I reply best by email. Use Cal.com when you need a fixed
          time on the calendar.
        </p>
        <p>
          Good context helps: role or problem, timeline, and links to the
          product or repo if you have them. I am based in Hyderabad and work as
          a Senior Software Engineer at Altir. My day-to-day stack is React,
          TypeScript, Next.js, React Native, Angular, and AI-assisted workflows.
        </p>
        <p>
          Before you write, you can skim{" "}
          <Link href="/about" className="text-accent hover:underline">
            about
          </Link>
          ,{" "}
          <Link href="/projects" className="text-accent hover:underline">
            projects
          </Link>
          , and{" "}
          <Link href="/writings" className="text-accent hover:underline">
            writings
          </Link>
          . Agents and humans can also start from{" "}
          <Link href="/llms.txt" className="text-accent hover:underline">
            /llms.txt
          </Link>{" "}
          or{" "}
          <Link href="/docs" className="text-accent hover:underline">
            /docs
          </Link>
          . This is a personal portfolio at shivanandasai.xyz, not a product
          company contact center.
        </p>
        <p>
          Prefer not to use a form. There is no account system on this site.
          Email and Cal.com are the intended paths. Social profiles on GitHub,
          LinkedIn, and X are public and fine for light outreach too.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-white text-sm">ways to reach me</h2>
        <ul className="space-y-2 text-sm text-gray-400">
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
      </section>
    </main>
  )
}

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Shivananda Sai: email, GitHub, LinkedIn, X, and Cal.com booking.",
  alternates: pageCanonical("/contact"),
  openGraph: {
    images: pageOgImages("contact"),
  },
}
