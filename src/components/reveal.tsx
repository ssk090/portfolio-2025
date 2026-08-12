"use client"

import type { ReactNode } from "react"
import { LazyMotion, domAnimation, m } from "motion/react"

export function Reveal({
  children,
  delay = 0,
}: {
  children: ReactNode
  delay?: number
}) {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut", delay }}
      >
        {children}
      </m.div>
    </LazyMotion>
  )
}
