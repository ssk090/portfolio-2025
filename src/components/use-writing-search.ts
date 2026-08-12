"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import type { Writing } from "@/lib/writings"
import { bindKeymap } from "@/lib/keyboard"

type WritingSearchOptions = {
  writings: Writing[]
  onSelect: (slug: string) => void
}

export function useWritingSearch({
  writings,
  onSelect,
}: WritingSearchOptions) {
  const [isSearching, setIsSearching] = useState(false)
  const [query, setQueryState] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const selectedItemRef = useRef<HTMLDivElement>(null)

  const results = useMemo(
    () =>
      writings.filter((writing) =>
        writing.metadata.title.toLowerCase().includes(query.toLowerCase()),
      ),
    [query, writings],
  )

  const setQuery = useCallback((nextQuery: string) => {
    setQueryState(nextQuery)
    setSelectedIndex(0)
  }, [])

  useEffect(() => {
    if (isSearching) {
      inputRef.current?.focus()
    }
  }, [isSearching])

  useEffect(() => {
    if (isSearching) {
      selectedItemRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
    }
  }, [isSearching, results, selectedIndex])

  useEffect(() => {
    return bindKeymap(
      {
        "/": (event) => {
          if (!isSearching) {
            event.preventDefault()
            setIsSearching(true)
            setSelectedIndex(0)
          }
        },
        Escape: () => {
          if (isSearching) {
            setIsSearching(false)
            setQueryState("")
            setSelectedIndex(0)
            if (document.activeElement instanceof HTMLElement) {
              document.activeElement.blur()
            }
          }
        },
        ArrowDown: (event) => {
          event.preventDefault()
          if (!isSearching) {
            setIsSearching(true)
            setSelectedIndex(0)
            return
          }
          setSelectedIndex((index) =>
            Math.min(index + 1, Math.max(0, results.length - 1)),
          )
        },
        ArrowUp: (event) => {
          event.preventDefault()
          if (!isSearching) {
            setIsSearching(true)
            setSelectedIndex(Math.max(0, results.length - 1))
            return
          }
          setSelectedIndex((index) => Math.max(0, index - 1))
        },
        Enter: (event) => {
          const selected = results[selectedIndex]
          if (isSearching && selected) {
            event.preventDefault()
            onSelect(selected.slug)
          }
        },
      },
      { ignoreWhenTyping: false, ignoreModifiers: true },
    )
  }, [isSearching, onSelect, results, selectedIndex])

  return {
    inputRef,
    isSearching,
    query,
    results,
    selectedIndex,
    selectedItemRef,
    setQuery,
  }
}
