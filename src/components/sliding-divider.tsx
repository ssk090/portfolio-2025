"use client"

import { useLayoutEffect, useRef, useState } from "react"
import { LazyMotion, domAnimation, m } from "motion/react"

const itemAttribute = "data-sliding-divider-item"

type Position = {
  left: number
  width: number
}

type SlidingDividerProps = {
  activeId: string | null
  className?: string
}

/**
 * Animates along the bottom of its positioned parent.
 * Mark candidate descendants with `data-sliding-divider-item="<id>"`.
 */
export function SlidingDivider({
  activeId,
  className = "bg-accent",
}: SlidingDividerProps) {
  const dividerRef = useRef<HTMLSpanElement>(null)
  const [position, setPosition] = useState<Position | null>(null)

  useLayoutEffect(() => {
    const container = dividerRef.current?.parentElement
    const items = container
      ? Array.from(
          container.querySelectorAll<HTMLElement>(`[${itemAttribute}]`),
        )
      : []

    const update = () => {
      const activeItem = items.find(
        (item) => item.getAttribute(itemAttribute) === activeId,
      )

      if (!container || !activeItem) {
        setPosition(null)
        return
      }

      const containerRect = container.getBoundingClientRect()
      const itemRect = activeItem.getBoundingClientRect()
      const next = {
        left: itemRect.left - containerRect.left,
        width: itemRect.width,
      }

      setPosition((current) =>
        current?.left === next.left && current.width === next.width
          ? current
          : next,
      )
    }

    const observer = new ResizeObserver(update)
    if (container) observer.observe(container)
    items.forEach((item) => observer.observe(item))
    window.addEventListener("resize", update)
    update()

    return () => {
      observer.disconnect()
      window.removeEventListener("resize", update)
    }
  }, [activeId])

  return (
    <LazyMotion features={domAnimation}>
      <m.span
        ref={dividerRef}
        className={`pointer-events-none absolute bottom-0 left-0 h-px w-px origin-left ${className}`}
        initial={false}
        animate={{
          x: position?.left ?? 0,
          scaleX: position?.width ?? 0,
          opacity: position ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 280,
          damping: 18,
          mass: 0.75,
        }}
        aria-hidden
      />
    </LazyMotion>
  )
}
