// @vitest-environment jsdom

import { act, renderHook } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import type { Writing } from "@/lib/writings"
import { useWritingSearch } from "./use-writing-search"

const writings: Writing[] = [
  {
    slug: "first",
    metadata: {
      title: "First",
      description: "First Writing",
      date: "2025-02-01",
      draft: false,
    },
    content: "First",
  },
  {
    slug: "second",
    metadata: {
      title: "Second",
      description: "Second Writing",
      date: "2025-01-01",
      draft: false,
    },
    content: "Second",
  },
]

describe("Writing search", () => {
  it("opens on the first result when ArrowDown starts navigation", () => {
    const { result } = renderHook(() =>
      useWritingSearch({ writings, onSelect: vi.fn() }),
    )

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown" }))
    })

    expect(result.current.isSearching).toBe(true)
    expect(result.current.selectedIndex).toBe(0)
    expect(result.current.results[0]?.slug).toBe("first")
  })

  it("opens on the last result when ArrowUp starts navigation", () => {
    const { result } = renderHook(() =>
      useWritingSearch({ writings, onSelect: vi.fn() }),
    )

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp" }))
    })

    expect(result.current.isSearching).toBe(true)
    expect(result.current.selectedIndex).toBe(1)
    expect(result.current.results[1]?.slug).toBe("second")
  })

  it("moves within result bounds without wrapping", () => {
    const { result } = renderHook(() =>
      useWritingSearch({ writings, onSelect: vi.fn() }),
    )

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown" }))
    })
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown" }))
    })
    expect(result.current.selectedIndex).toBe(1)

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown" }))
    })
    expect(result.current.selectedIndex).toBe(1)

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp" }))
    })
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp" }))
    })
    expect(result.current.selectedIndex).toBe(0)
  })

  it("filters by title and resets selection", () => {
    const { result } = renderHook(() =>
      useWritingSearch({ writings, onSelect: vi.fn() }),
    )

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp" }))
    })
    expect(result.current.selectedIndex).toBe(1)

    act(() => result.current.setQuery("second"))

    expect(result.current.query).toBe("second")
    expect(result.current.results.map((writing) => writing.slug)).toEqual([
      "second",
    ])
    expect(result.current.selectedIndex).toBe(0)
  })

  it("opens with slash and Escape closes and resets search", () => {
    const { result } = renderHook(() =>
      useWritingSearch({ writings, onSelect: vi.fn() }),
    )

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "/" }))
    })
    expect(result.current.isSearching).toBe(true)

    act(() => result.current.setQuery("second"))
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }))
    })

    expect(result.current.isSearching).toBe(false)
    expect(result.current.query).toBe("")
    expect(result.current.results).toHaveLength(2)
    expect(result.current.selectedIndex).toBe(0)
  })

  it("selects the active Writing with Enter", () => {
    const onSelect = vi.fn()
    renderHook(() => useWritingSearch({ writings, onSelect }))

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp" }))
    })
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }))
    })

    expect(onSelect).toHaveBeenCalledOnce()
    expect(onSelect).toHaveBeenCalledWith("second")
  })
})
