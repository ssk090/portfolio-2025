import { Redis } from "@upstash/redis"
import { NextRequest, NextResponse } from "next/server"

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

export async function GET(request: NextRequest) {
  // Create ReadableStream for SSE
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder()
      let lastCount = 0

      const sendUpdate = async () => {
        try {
          // Get total unique visitor count
          const visitedSessions = await redis.keys("visited_session:*")
          const count = visitedSessions.length

          // Only send if count changed (optimize bandwidth)
          if (count !== lastCount) {
            lastCount = count
            const data = `data: ${JSON.stringify({ count })}\n\n`
            controller.enqueue(encoder.encode(data))
          }
        } catch (error) {
          console.error("SSE stream error:", error)
          controller.close()
        }
      }

      // Send initial count
      await sendUpdate()

      // Send updates every 5 seconds (total count changes slowly)
      const interval = setInterval(sendUpdate, 5000)

      // Cleanup on disconnect
      request.signal.addEventListener("abort", () => {
        clearInterval(interval)
        controller.close()
      })
    },
  })

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  })
}
