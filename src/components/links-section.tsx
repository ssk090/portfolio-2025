import { SectionHeading } from "@/components/section-heading"
import { site } from "@/lib/site"
import Link from "next/link"

const links = [
  { title: "email", href: `mailto:${site.email}` },
  { title: "github", href: site.sameAs[0] },
  { title: "linkedin", href: site.sameAs[1] },
  { title: "x.com", href: site.sameAs[2] },
  { title: "book a call", href: site.sameAs[3] },
]

export function LinksSection() {
  return (
    <section className="animate-fade-in-up">
      <SectionHeading>links</SectionHeading>
      <div className="flex flex-wrap gap-4 text-sm">
        {links.map((link) => (
          <Link
            key={link.title}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-accent transition-colors duration-200"
          >
            {link.title}
          </Link>
        ))}
      </div>
    </section>
  )
}
