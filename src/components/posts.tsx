"use client"

import { useEffect, useState, useRef } from "react"
import { createPortal } from "react-dom"
import { useRouter } from "next/navigation"
import type { Writing } from "@/lib/writings"
import { PostItem } from "./post-item"
import { bindKeymap } from "@/lib/keyboard"

type PostsProps = {
  posts: Writing[]
}

export function Posts({ posts }: PostsProps) {
  const [isSearching, setIsSearching] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const selectedItemRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredPosts = posts.filter((item) =>
    item.metadata.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const scrollSelectedIntoView = () => {
    if (selectedItemRef.current) {
      selectedItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
    }
  }

  useEffect(() => {
    return bindKeymap(
      {
        "/": (e) => {
          if (!isSearching) {
            e.preventDefault()
            setIsSearching(true)
          }
        },
        Escape: () => {
          if (isSearching) {
            setIsSearching(false)
            setSearchQuery("")
            if (document.activeElement instanceof HTMLElement) {
              document.activeElement.blur()
            }
          }
        },
        ArrowDown: (e) => {
          e.preventDefault()
          setIsSearching(true)
          setSelectedIndex((prev) => {
            const newIndex =
              prev < filteredPosts.length - 1 ? prev + 1 : prev
            // scroll after state commit on next frame
            requestAnimationFrame(scrollSelectedIntoView)
            return newIndex
          })
        },
        ArrowUp: (e) => {
          e.preventDefault()
          setIsSearching(true)
          setSelectedIndex((prev) => {
            const newIndex = prev > 0 ? prev - 1 : prev
            requestAnimationFrame(scrollSelectedIntoView)
            return newIndex
          })
        },
        Enter: (e) => {
          if (isSearching && filteredPosts.length > 0) {
            e.preventDefault()
            const post = filteredPosts[selectedIndex]
            if (post) {
              router.push(`/writings/${post.slug}`)
            }
          }
        },
      },
      // While searching, the input is focused — still allow Escape/arrows/enter.
      // Only ignore modifiers; typing filter would block keys inside the search box
      // for letters, but our map only binds special keys.
      { ignoreWhenTyping: false, ignoreModifiers: true },
    )
  }, [isSearching, filteredPosts, selectedIndex, router])

  return (
    <>
      {mounted &&
        isSearching &&
        createPortal(
          <div className="fixed inset-0 z-50 flex h-dvh w-screen items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-black/90 backdrop-blur-sm border border-gray-800 p-2">
              <div className="flex items-center text-gray-400">
                <span className="text-accent mr-2">/</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setSelectedIndex(0)
                  }}
                  className="flex-1 bg-transparent outline-none"
                  autoFocus
                  placeholder="search posts..."
                  aria-label="Search posts"
                  role="combobox"
                  aria-expanded={filteredPosts.length > 0}
                  aria-controls="search-results"
                  aria-activedescendant={
                    isSearching && filteredPosts.length > 0
                      ? `post-${filteredPosts[selectedIndex]?.slug}`
                      : undefined
                  }
                />
              </div>
            </div>
          </div>,
          document.body,
        )}

      <div className="space-y-8 sm:space-y-4" id="search-results">
        {filteredPosts.length === 0 ? (
          <div className="text-center text-gray-400 py-8">posts not found</div>
        ) : (
          filteredPosts.map((item, index) => (
            <div
              key={item.slug}
              ref={
                isSearching && index === selectedIndex
                  ? selectedItemRef
                  : null
              }
            >
              <PostItem
                post={item}
                isSelected={isSearching && index === selectedIndex}
              />
            </div>
          ))
        )}
      </div>
    </>
  )
}
