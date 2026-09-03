import { SectionHeading } from "@/components/section-heading"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { ReactNode } from "react"

export type Item = {
  title: string
  href?: string
  role: string
  period?: string
  description: string[]
  location?: string
}

type SectionListProps = {
  title: string
  items: Item[]
  viewAllHref?: string
  viewAllText?: string
  showTitle?: boolean
  showSectionBorder?: boolean
  showExternalIcon?: boolean
}

function ItemBody({
  item,
  showExternalIcon,
}: {
  item: Item
  showExternalIcon: boolean
}) {
  return (
    <>
      <div className="flex items-start justify-between">
        <h3 className="text-xl font-semibold mb-1 text-white group-hover:text-accent transition-colors duration-200">
          {item.title}
        </h3>
        {showExternalIcon ? (
          <ArrowUpRight className="w-5 h-5 text-gray-400 rotate-45 group-hover:rotate-0 group-hover:text-accent transition-all duration-200" />
        ) : item.location ? (
          <h3 className="text-sm text-gray-400">{item.location}</h3>
        ) : null}
      </div>
      <p className="text-sm text-gray-400 mb-2">
        {item.role} {item.period && `(${item.period})`}
      </p>
      {item.description.length > 0 ? (
        <ul className="list-disc list-inside space-y-3 text-gray-300">
          {item.description.map((description) => (
            <li key={description}>{description}</li>
          ))}
        </ul>
      ) : null}
    </>
  )
}

function ItemShell({
  item,
  showExternalIcon,
  children,
}: {
  item: Item
  showExternalIcon: boolean
  children: ReactNode
}) {
  const className =
    "group border border-gray-800 p-6 transition-colors hover:border-accent/50 duration-300"

  if (item.href) {
    return (
      <div className={className}>
        <Link href={item.href} target="_blank" rel="noopener noreferrer">
          {children}
        </Link>
      </div>
    )
  }

  return <div className={className}>{children}</div>
}

export function SectionList({
  title,
  items,
  viewAllHref,
  viewAllText,
  showTitle = true,
  showSectionBorder = true,
  showExternalIcon = false,
}: SectionListProps) {
  return (
    <section
      className={showSectionBorder ? "border-t border-neutral-800 pt-10" : ""}
    >
      <div className="mb-16 animate-fade-in-up">
        {showTitle && <SectionHeading>{title}</SectionHeading>}
        <div className="space-y-8">
          {items.map((item) => (
            <ItemShell
              key={`${item.title}-${item.role}-${item.period ?? ""}`}
              item={item}
              showExternalIcon={showExternalIcon}
            >
              <ItemBody item={item} showExternalIcon={showExternalIcon} />
            </ItemShell>
          ))}
        </div>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="inline-flex items-center gap-1 mt-6 text-accent hover:underline group"
          >
            {viewAllText}{" "}
            <ArrowUpRight className="w-4 h-4 rotate-45 transition-transform duration-200 group-hover:rotate-0" />
          </Link>
        )}
      </div>
    </section>
  )
}
