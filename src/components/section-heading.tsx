import type { ReactNode } from "react"

export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-2xl font-bold mb-6 flex items-center text-white">
      <span className="text-accent mr-2" aria-hidden="true">
        *
      </span>
      {children}
    </h2>
  )
}
