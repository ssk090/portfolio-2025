import { PageHeader } from "@/components/page-header"
import { Posts } from "@/components/posts"
import { published } from "@/lib/writings"
import { pageCanonical, pageOgImages } from "@/lib/site"
import type { Metadata } from "next"

const posts = published()

export default function BlogPage() {
  return (
    <main className="animate-fade-in-up relative">
      <PageHeader title="writings">
        <p className="hidden sm:block text-sm text-gray-400">
          press <KeyboardKey>/</KeyboardKey> to search • use{" "}
          <KeyboardKey>↑</KeyboardKey> and <KeyboardKey>↓</KeyboardKey> to
          navigate
        </p>
      </PageHeader>
      <Posts posts={posts} />
    </main>
  )
}

function KeyboardKey({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="px-1 py-0.5 text-xs border border-gray-700 rounded">
      {children}
    </kbd>
  )
}

export const metadata: Metadata = {
  title: "Writings",
  description: "Writings on programming, computer science, and more.",
  alternates: pageCanonical("/writings"),
  openGraph: {
    images: pageOgImages("writings"),
  },
}
