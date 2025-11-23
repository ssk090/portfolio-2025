"use client"

import { useEffect, useState } from "react"
import { Users } from "lucide-react"

export function VisitorCounter() {
    const [count, setCount] = useState<number | null>(null)
    const [isConnected, setIsConnected] = useState(false)

    useEffect(() => {
        let eventSource: EventSource | null = null
        let sessionId: string | null = null

        const initializeVisitor = async () => {
            try {
                // Get or create session ID from localStorage
                sessionId =
                    localStorage.getItem("visitor_session_id") ||
                    crypto.randomUUID()
                localStorage.setItem("visitor_session_id", sessionId)

                // Register session with tracking endpoint
                const trackResponse = await fetch("/api/visitors/track", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ sessionId }),
                })

                if (!trackResponse.ok) {
                    const errorData = await trackResponse.json()
                    console.error("Failed to track visitor:", trackResponse.status, errorData)
                    return
                }

                const { count: initialCount, filtered } = await trackResponse.json()

                // If filtered as bot, don't connect to stream
                if (filtered) {
                    return
                }

                setCount(initialCount)

                // Connect to SSE stream with sessionId for faster cleanup updates
                eventSource = new EventSource(`/api/visitors/stream?sessionId=${sessionId}`)
                setIsConnected(true)

                eventSource.onmessage = (event) => {
                    const data = JSON.parse(event.data)
                    setCount(data.count)
                }

                eventSource.onerror = () => {
                    console.error("SSE connection error")
                    setIsConnected(false)
                    eventSource?.close()
                }
            } catch (error) {
                console.error("Visitor initialization error:", error)
            }
        }

        initializeVisitor()

        // Cleanup on unmount (just close SSE stream)
        return () => {
            if (eventSource) {
                eventSource.close()
            }
        }
    }, [])    // Don't render if not connected or count is null
    if (count === null) {
        return null
    }

    return (
        <div className="flex items-center gap-2 text-sm text-gray-400">
            <Users className="w-4 h-4" />
            <span>
                {count} {count === 1 ? "total visitor" : "total visitors"}
            </span>
        </div>
    )
}
