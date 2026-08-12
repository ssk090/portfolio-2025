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

      if (event.metaKey || event.ctrlKey || event.altKey) {
        return
      }

      const key = event.key.toLowerCase()

      switch (key) {
        case "h":
          router.push("/")
          break
        case "w":
          router.push("/writings")
          break
        case "p":
          router.push("/projects")
          break
        case "r":
          window.open(
            "https://drive.google.com/file/d/1fiuzOdnPUu4nW2KCst52PR4zBtwZygvd/view",
            "_blank",
          )
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
          className="hover:text-accent transition-colors duration-200 py-2 px-1.5 sm:px-0 sm:py-0"
        >
          <span className="text-accent">[h]</span> home
        </Link>
        <Link
          href="/writings"
          prefetch={true}
          className="hover:text-accent transition-colors duration-200 py-2 px-1.5 sm:px-0 sm:py-0"
        >
          <span className="text-accent">[w]</span> writings
        </Link>
        <Link
          href="/projects"
          className="hover:text-accent transition-colors duration-200 py-2 px-1.5 sm:px-0 sm:py-0"
        >
          <span className="text-accent">[p]</span> projects
        </Link>
        <Link
          href="https://drive.google.com/file/d/1fiuzOdnPUu4nW2KCst52PR4zBtwZygvd/view"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent transition-colors duration-200"
        >
          <span className="text-accent">[r]</span> resume
        </Link>
      </div>
      <VisitorCounter />
    </nav>
  )
}
