import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export type Item = {
  title: string
  href: string
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
}

export function SectionList({
  title,
  items,
  viewAllHref,
  viewAllText,
  showTitle = true,
  showSectionBorder = true,
}: SectionListProps) {
  return (
    <section>
      <div className="mb-16 animate-fade-in-up">
        <h2 className="text-2xl font-bold mb-6 flex items-center text-white">
          <span className="text-accent mr-2">*</span> {title}
        </h2>
        <div className="space-y-8">
          {items.map((item, _index) => (
            <div
              key={item.title}
              className="group border border-gray-800 p-6 transition-colors hover:border-accent/50 duration-300"
            >
              <Link href={item.href} target="_blank">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-semibold mb-1 text-white group-hover:text-accent transition-colors duration-200">
                    {item.title}
                  </h3>
                  {title === "projects" ? (
                    <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-accent transition-colors" />
                  ) : title === "work ex" && item.location ? (
                    <h3 className="text-sm text-gray-400">{item.location}</h3>
                  ) : null}
                </div>
                <p className="text-sm text-gray-400 mb-2">
                  {item.role} {item.period && `(${item.period})`}
                </p>
                <ul className="list-disc list-inside space-y-3 text-gray-300">
                  {item.description.map((desc, index) => (
                    <li key={index}>{desc}</li>
                  ))}
                </ul>
              </Link>
            </div>
          ))}
        </div>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="inline-flex items-center gap-1 mt-6 text-accent hover:underline group"
          >
            {viewAllText}{" "}
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        )}
      </div>
    </section>
  )
}
