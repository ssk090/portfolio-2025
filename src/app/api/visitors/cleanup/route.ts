import { Redis } from "@upstash/redis"
import { NextRequest, NextResponse } from "next/server"

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

export async function POST(request: NextRequest) {
  try {
    let sessionId: string | null = null

    // Handle both JSON and plain text from sendBeacon
    const contentType = request.headers.get("content-type") || ""
    
    if (contentType.includes("application/json")) {
      const body = await request.json()
      sessionId = body.sessionId
    } else {
      // sendBeacon sends as plain text
      const text = await request.text()
      try {
        const body = JSON.parse(text)
        sessionId = body.sessionId
      } catch {
        sessionId = text
      }
    }

    if (!sessionId || typeof sessionId !== "string") {
      console.warn("Invalid session ID in cleanup:", sessionId)
      return NextResponse.json(
        { error: "Invalid session ID" },
        { status: 400 }
      )
    }

    // Delete the session key from Redis
    const key = `active_visitors:${sessionId}`
    const deleted = await redis.del(key)
    
    console.info("Visitor session cleaned up:", sessionId, "Deleted:", deleted === 1)

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("Cleanup error:", error instanceof Error ? error.message : error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
