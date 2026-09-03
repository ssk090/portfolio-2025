import Link from "next/link"

const footerLinks = [
  { href: "/about", label: "about" },
  { href: "/contact", label: "contact" },
  { href: "/privacy", label: "privacy" },
  { href: "/docs", label: "docs" },
] as const

export function SiteFooter() {
  return (
    <footer className="fixed bottom-0 inset-x-0 z-40 border-t border-gray-800 bg-black/95 backdrop-blur-sm text-sm text-gray-600">
      <nav
        className="max-w-4xl mx-auto px-5 sm:px-4 py-3 flex flex-wrap gap-x-4 gap-y-2"
        aria-label="site"
      >
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
