import Link from "next/link"

const links = [
  { title: "email", href: "mailto:shivanandasai.38@gmail.com" },
  { title: "x.com", href: "https://x.com/imshiv6t9" },
  { title: "github", href: "https://github.com/ssk090" },
  { title: "linkedin", href: "https://www.linkedin.com/in/shivanandasai/" },
  { title: "book a call", href: "https://cal.com/shivanandasai" },
]

export function LinksSection() {
  return (
    <section className="animate-fade-in-up">
      <h2 className="text-2xl font-bold mb-6 flex items-center text-white">
        <span className="text-accent mr-2">*</span> links
      </h2>
      <div className="flex flex-wrap gap-4 text-sm">
        {links.map((link) => (
          <Link
            key={link.title}
            href={link.href}
            target="_blank"
            className="text-gray-400 hover:text-accent transition-colors duration-200"
          >
            {link.title}
          </Link>
        ))}
      </div>
    </section>
  )
}
