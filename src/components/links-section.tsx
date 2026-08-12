import { SectionHeading } from "@/components/section-heading"
import Link from "next/link"

const links = [
  { title: "email", href: "mailto:shivanandasai.38@gmail.com" },
  { title: "github", href: "https://github.com/ssk090" },
  { title: "linkedin", href: "https://www.linkedin.com/in/shivanandasai/" },
  { title: "x.com", href: "https://x.com/imshiv6t9" },
  { title: "book a call", href: "https://cal.com/shivanandasai" },
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
