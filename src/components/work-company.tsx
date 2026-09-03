import Link from "next/link"
import type { ReactNode } from "react"
import type { WorkCompany as WorkCompanyData } from "@/lib/work-items"

type WorkCompanyProps = {
  company: WorkCompanyData
}

function CompanyShell({
  href,
  children,
}: {
  href?: string
  children: ReactNode
}) {
  const className =
    "group border border-gray-800 p-6 transition-colors hover:border-accent/50 duration-300"

  if (href) {
    return (
      <div className={className}>
        <Link href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </Link>
      </div>
    )
  }

  return <div className={className}>{children}</div>
}

export function WorkCompany({ company }: WorkCompanyProps) {
  return (
    <CompanyShell href={company.href}>
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-xl font-semibold mb-1 text-white group-hover:text-accent transition-colors duration-200">
          {company.title}
        </h3>
        {company.location ? (
          <p className="text-sm text-gray-400 shrink-0">{company.location}</p>
        ) : null}
      </div>

      <div className="mt-4 space-y-5">
        {company.roles.map((role) => (
          <div key={`${role.title}-${role.period}`}>
            <h4 className="text-base font-medium text-white">{role.title}</h4>
            <p className="text-sm text-gray-400 mb-2">
              {role.period}
              {role.location ? ` · ${role.location}` : ""}
            </p>
            {role.description && role.description.length > 0 ? (
              <ul className="list-disc list-inside space-y-3 text-gray-300">
                {role.description.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </div>

      {company.description && company.description.length > 0 ? (
        <ul className="list-disc list-inside space-y-3 text-gray-300 mt-5">
          {company.description.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      ) : null}
    </CompanyShell>
  )
}
