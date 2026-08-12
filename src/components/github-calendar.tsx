"use client"

import dynamic from "next/dynamic"

const Calendar = dynamic(
  () => import("react-github-calendar").then((module) => module.GitHubCalendar),
  {
    ssr: false,
    loading: () => <div className="w-full" />,
  },
)

export default function GitHubCalendar() {
  return (
    <div className="flex justify-center my-8">
      <Calendar username="ssk090" />
    </div>
  )
}
