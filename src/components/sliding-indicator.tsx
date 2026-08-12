"use client"

import { LazyMotion, domAnimation, m } from "motion/react"

type SlidingIndicatorProps = {
  layoutId: string
  className?: string
}

export function SlidingIndicator({
  layoutId,
  className = "",
}: SlidingIndicatorProps) {
  return (
    <LazyMotion features={domAnimation}>
      <m.span
        layoutId={layoutId}
        className={className}
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
        aria-hidden
      />
    </LazyMotion>
  )
}
