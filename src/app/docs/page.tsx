import { PageHeader } from "@/components/page-header"
import { absoluteUrl, pageOgImages, site } from "@/lib/site"
import type { Metadata } from "next"
import Link from "next/link"

const pages = [
  { title: "home", href: "/" },
  { title: "writings", href: "/writings" },
  { title: "projects", href: "/projects" },
  { title: "work", href: "/work" },
  { title: "llms.txt", href: "/llms.txt" },
]

export default function DocsPage() {
  return (
    <main className="animate-fade-in-up space-y-10">
      <PageHeader
        title="docs"
        description="this is a personal portfolio site. there is no public product api, openapi, or mcp surface."
      />

      <section className="space-y-3 text-sm text-gray-400">
        <p>
          agents can request markdown with{" "}
          <code className="text-accent">Accept: text/markdown</code> on home,
          writings, projects, docs, and missing pages. start with{" "}
          <Link href="/llms.txt" className="text-accent hover:underline">
            /llms.txt
          </Link>
          .
        </p>
        <p>
          do not treat <code className="text-accent">/api/visitors/*</code> as a
          public product api.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-white text-sm">pages</h2>
        <ul className="space-y-2 text-sm">
          {pages.map((page) => (
            <li key={page.href}>
              <Link
                href={page.href}
                className="text-gray-400 hover:text-accent transition-colors"
              >
                {page.title}
              </Link>
              <span className="text-gray-600"> · </span>
              <span className="text-gray-600">{absoluteUrl(page.href)}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-white text-sm">contact</h2>
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
  title: "Docs",
  description:
    "Site map and contact for agents and humans. No public product API.",
  openGraph: {
    images: pageOgImages("docs"),
  },
}
