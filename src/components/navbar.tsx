"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { VisitorCounter } from "@/components/visitor-counter"

export function Navbar() {
  const router = useRouter()

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Don't trigger if any input elements are focused or if event target is an input
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA" ||
        event.target instanceof HTMLInputElement
      ) {
        return
      }

      switch (event.key.toLowerCase()) {
        case "h":
          router.push("/")
          break
        case "w":
          router.push("/writings")
          break
        case "p":
          router.push("/projects")
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [router])

  return (
    <nav className="flex items-center justify-between mb-12 text-sm border-b border-gray-800 pb-4">
      <div className="flex space-x-4">
        <Link
          href="/"
          className="hover:text-accent transition-colors duration-200"
        >
          <span className="text-accent">[h]</span> home
        </Link>
        <Link
          href="/writings"
          prefetch={true}
          className="hover:text-accent transition-colors duration-200"
        >
          <span className="text-accent">[w]</span> writings
        </Link>
        <Link
          href="/projects"
          className="hover:text-accent transition-colors duration-200"
        >
          <span className="text-accent">[p]</span> projects
        </Link>
      </div>
      <VisitorCounter />
    </nav>
  )
}
