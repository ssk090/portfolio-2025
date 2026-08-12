import { ScrambleText } from "@/components/scramble-text"
import { Posts } from "@/components/posts"
import { published } from "@/lib/writings"
import { pageOgImages } from "@/lib/site"
import { Metadata } from "next"

const posts = published()

export default async function BlogPage() {
  return (
    <main className="animate-fade-in-up relative">
      <h1 className="text-4xl font-bold mb-5 text-white flex">
        <span className="text-accent mr-2 text-7xl font-light">*</span>
        <ScrambleText text="writings" />
      </h1>

      <p className="hidden sm:block text-sm text-gray-400 mb-8">
        press{" "}
        <kbd className="px-1 py-0.5 text-xs border border-gray-700 rounded">
          /
        </kbd>{" "}
        to search • use{" "}
        <kbd className="px-1 py-0.5 text-xs border border-gray-700 rounded">
          ↑
        </kbd>{" "}
        and{" "}
        <kbd className="px-1 py-0.5 text-xs border border-gray-700 rounded">
          ↓
        </kbd>{" "}
        to navigate
      </p>

      <Posts posts={posts} />
    </main>
  )
}

export const metadata: Metadata = {
  title: "Writings",
  description: "Writings on programming, computer science, and more.",
  openGraph: {
    images: pageOgImages("writings"),
  },
}
