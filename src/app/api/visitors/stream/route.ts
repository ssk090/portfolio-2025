import { NextRequest, NextResponse } from "next/server"
import { count } from "@/lib/visitors"

export async function GET(request: NextRequest) {
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder()
      let lastCount = -1

      const sendUpdate = async () => {
        try {
          const current = await count()

          if (current !== lastCount) {
            lastCount = current
            const data = `data: ${JSON.stringify({ count: current })}\n\n`
            controller.enqueue(encoder.encode(data))
          }
        } catch (error) {
          console.error("SSE stream error:", error)
          controller.close()
        }
      }

      await sendUpdate()

      const interval = setInterval(sendUpdate, 5000)

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
