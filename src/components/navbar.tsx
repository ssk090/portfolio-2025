"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { motion } from "motion/react"
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

type Indicator = { left: number; width: number }

export function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const navRef = useRef<HTMLElement>(null)
  const itemRefs = useRef<Map<string, HTMLAnchorElement>>(new Map())
  const [indicator, setIndicator] = useState<Indicator | null>(null)

  const activeHref =
    navItems.find(
      (item) =>
        !("external" in item && item.external) &&
        "match" in item &&
        item.match(pathname),
    )?.href ?? null

  useLayoutEffect(() => {
    const update = () => {
      if (!activeHref || !navRef.current) {
        setIndicator(null)
        return
      }

      const el = itemRefs.current.get(activeHref)
      if (!el) {
        setIndicator(null)
        return
      }

      const navRect = navRef.current.getBoundingClientRect()
      const itemRect = el.getBoundingClientRect()
      setIndicator({
        left: itemRect.left - navRect.left,
        width: itemRect.width,
      })
    }

    update()

    const nav = navRef.current
    if (!nav) return

    const observer = new ResizeObserver(update)
    observer.observe(nav)
    window.addEventListener("resize", update)

    return () => {
      observer.disconnect()
      window.removeEventListener("resize", update)
    }
  }, [activeHref, pathname])

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
          )
        },
      },
      { ignoreWhenTyping: true, ignoreModifiers: true },
    )
  }, [router])

  return (
    <nav
      ref={navRef}
      className="relative flex items-center justify-between mb-12 text-sm border-b border-gray-800 pb-4"
    >
      <div className="flex space-x-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            ref={(node) => {
              if (node) itemRefs.current.set(item.href, node)
              else itemRefs.current.delete(item.href)
            }}
            prefetch={"prefetch" in item ? item.prefetch : undefined}
            {...("external" in item && item.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="hover:text-accent transition-colors duration-200"
          >
            <span className="text-accent">[{item.key}]</span> {item.label}
          </Link>
        ))}
      </div>
      <VisitorCounter />
      {indicator && (
        <motion.span
          className="pointer-events-none absolute bottom-0 h-px bg-accent"
          initial={false}
          animate={{ left: indicator.left, width: indicator.width }}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
          aria-hidden
        />
      )}
    </nav>
  )
}
