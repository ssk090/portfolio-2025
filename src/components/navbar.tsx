"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"
import { SlidingIndicator } from "@/components/sliding-indicator"
import { VisitorCounter } from "@/components/visitor-counter"
import { bindKeymap } from "@/lib/keyboard"

const navItems = [
  { href: "/", label: "home", key: "h", match: (path: string) => path === "/" },
  {
    href: "/writings",
    label: "writings",
    key: "w",
    prefetch: true,
    match: (path: string) =>
      path === "/writings" || path.startsWith("/writings/"),
  },
  {
    href: "/projects",
    label: "projects",
    key: "p",
    match: (path: string) =>
      path === "/projects" || path.startsWith("/projects/"),
  },
  {
    href: "https://drive.google.com/file/d/1ExS530Q2zMcYcvfSm7w1if2TEuW-fybl/view",
    label: "resume",
    key: "r",
    external: true,
  },
] as const

export function Navbar() {
  const router = useRouter()
  const pathname = usePathname()

  const activeHref =
    navItems.find(
      (item) =>
        !("external" in item && item.external) &&
        "match" in item &&
        item.match(pathname),
    )?.href ?? null

  useEffect(() => {
    return bindKeymap(
      {
        h: (e) => {
          e.preventDefault()
          router.push("/")
        },
        w: (e) => {
          e.preventDefault()
          router.push("/writings")
        },
        p: (e) => {
          e.preventDefault()
          router.push("/projects")
        },
        r: (e) => {
          e.preventDefault()
          window.open(
            "https://drive.google.com/file/d/1ExS530Q2zMcYcvfSm7w1if2TEuW-fybl/view",
            "_blank",
            "noopener,noreferrer",
          )
        },
      },
      { ignoreWhenTyping: true, ignoreModifiers: true },
    )
  }, [router])

  return (
    <nav className="relative flex items-center justify-between mb-12 text-sm border-b border-gray-800 pb-4">
      <div className="flex space-x-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            prefetch={"prefetch" in item ? item.prefetch : undefined}
            {...("external" in item && item.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="relative hover:text-accent transition-colors duration-200"
          >
            <span className="text-accent">[{item.key}]</span> {item.label}
            {item.href === activeHref && (
              <SlidingIndicator
                layoutId="navbar-active-indicator"
                className="pointer-events-none absolute -bottom-[17px] inset-x-0 h-px bg-accent"
              />
            )}
          </Link>
        ))}
      </div>
      <VisitorCounter />
    </nav>
  )
}
