import type { ReactNode } from "react"
import { ScrambleText } from "@/components/scramble-text"

type PageHeaderProps = {
  title: string
  description?: ReactNode
  children?: ReactNode
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <header className="mb-8">
      <h1 className="text-4xl font-bold mb-5 text-white flex">
        <span className="text-accent mr-2 text-7xl font-light" aria-hidden="true">
          *
        </span>
        <ScrambleText text={title} />
      </h1>
      {description && (
        <p className="text-gray-400 mb-6 leading-relaxed">{description}</p>
      )}
      {children}
    </header>
  )
}
