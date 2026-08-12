"use client"

import { useEffect, useState } from "react"
import { Users } from "lucide-react"

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    let eventSource: EventSource | null = null

    const initializeVisitor = async () => {
      try {
        const sessionId =
          localStorage.getItem("visitor_session_id") || crypto.randomUUID()
        localStorage.setItem("visitor_session_id", sessionId)

        const page =
          typeof window !== "undefined" ? window.location.pathname : "unknown"

        const trackResponse = await fetch("/api/visitors/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId, page }),
        })

        if (!trackResponse.ok) {
          const errorData = await trackResponse.json().catch(() => ({}))
          console.error(
            "Failed to track visitor:",
            trackResponse.status,
            errorData,
          )
          return
        }

        const { count: initialCount, filtered } = await trackResponse.json()

        if (filtered) {
          return
        }

        setCount(initialCount)

        eventSource = new EventSource(`/api/visitors/stream`)

        eventSource.onmessage = (event) => {
          const data = JSON.parse(event.data)
          setCount(data.count)
        }

        eventSource.onerror = () => {
          console.error("SSE connection error")
          eventSource?.close()
        }
      } catch (error) {
        console.error("Visitor initialization error:", error)
      }
    }

    initializeVisitor()

    return () => {
      if (eventSource) {
        eventSource.close()
      }
    }
  }, [])

  if (count === null) {
    return null
  }

  return (
    <div className="flex items-center gap-2 text-sm text-gray-400">
      <Users className="w-4 h-4" />
      <span className="hidden sm:inline">
        {count} {count === 1 ? "total visitor" : "total visitors"}
      </span>
      <span className="sm:hidden">{count}</span>
    </div>
  )
}
