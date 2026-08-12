"use client"

import { useCallback } from "react"
import { createPortal } from "react-dom"
import { useRouter } from "next/navigation"
import type { Writing } from "@/lib/writings"
import { PostItem } from "./post-item"
import { useWritingSearch } from "./use-writing-search"

type PostsProps = {
  posts: Writing[]
}

export function Posts({ posts }: PostsProps) {
  const router = useRouter()
  const selectWriting = useCallback(
    (slug: string) => router.push(`/writings/${slug}`),
    [router],
  )
  const {
    inputRef,
    isSearching,
    query,
    results,
    selectedIndex,
    selectedItemRef,
    setQuery,
  } = useWritingSearch({ writings: posts, onSelect: selectWriting })

  return (
    <>
      {isSearching &&
        createPortal(
          <div className="fixed inset-0 z-50 flex h-dvh w-screen items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-black/90 backdrop-blur-sm border border-gray-800 p-2">
              <div className="flex items-center text-gray-400">
                <span className="text-accent mr-2">/</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className="flex-1 bg-transparent outline-none"
                  placeholder="search posts..."
                  aria-label="Search posts"
                  role="combobox"
                  aria-expanded={results.length > 0}
                  aria-controls="search-results"
                  aria-activedescendant={
                    results.length > 0
                      ? `post-${results[selectedIndex]?.slug}`
                      : undefined
                  }
                />
              </div>
            </div>
          </div>,
          document.body,
        )}

      <div className="space-y-8 sm:space-y-4" id="search-results">
        {results.length === 0 ? (
          <div className="text-center text-gray-400 py-8">posts not found</div>
        ) : (
          results.map((item, index) => (
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
