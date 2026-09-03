import Link from "next/link"

const footerLinks = [
  { href: "/about", label: "about" },
  { href: "/contact", label: "contact" },
  { href: "/privacy", label: "privacy" },
  { href: "/docs", label: "docs" },
] as const

export function SiteFooter() {
  return (
    <footer className="mt-16 pt-6 border-t border-gray-800 text-sm text-gray-600">
      <nav className="flex flex-wrap gap-x-4 gap-y-2" aria-label="site">
        {footerLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="hover:text-accent transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </footer>
  )
}
