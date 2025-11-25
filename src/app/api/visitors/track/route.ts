import { Redis } from "@upstash/redis"
import { NextRequest, NextResponse } from "next/server"

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

// Bot User-Agent patterns to filter out (only very obvious bots)
const BOT_PATTERNS = [
  "googlebot",
  "bingbot",
  "slurp",
  "duckduckbot",
  "baiduspider",
  "yandexbot",
  "facebookexternalhit",
  "linkedinbot",
  "twitterbot",
  "whatsapp",
  "slackbot",
  "discordbot",
  "curl",
  "wget",
  "go-http-client",
  "vercel-screenshot",
  "vercel-screenshot/1.0",
]

function isBot(userAgent: string): boolean {
  const ua = userAgent.toLowerCase()
  return BOT_PATTERNS.some((pattern) => ua.includes(pattern))
}

export async function POST(request: NextRequest) {
  try {
    const { sessionId, page } = await request.json()

    // Validate session ID format (should be UUID)
    if (!sessionId || typeof sessionId !== "string" || sessionId.length < 20) {
      console.warn("Invalid session ID:", sessionId)
      return NextResponse.json(
        { error: "Invalid session ID" },
        { status: 400 }
      )
    }

    // Get User-Agent and filter bots
    const userAgent = request.headers.get("user-agent") || ""
    if (isBot(userAgent)) {
      console.info("Bot detected:", userAgent)
      return NextResponse.json({ count: 0, filtered: true }, { status: 200 })
    }

    // Check if Redis is configured
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
      console.error("Redis credentials not configured")
      return NextResponse.json(
        { error: "Redis not configured" },
        { status: 500 }
      )
    }

    // Extract request metadata
    const ip = request.headers.get("x-forwarded-for") || "unknown"
    const country = request.headers.get("x-vercel-ip-country") || request.headers.get("cf-ipcountry") || "unknown"
    const referrer = request.headers.get("referer") || "direct"
    const language = request.headers.get("accept-language") || "unknown"
    const timestamp = Date.now()

    // Create visitor data object
    const visitorData = {
      timestamp,
      visited: true,
      ip,
      country,
      userAgent,
      referrer,
      language,
      page: page || "unknown",
    }

    // Store visited session ID with metadata (no TTL = permanent)
    const sessionKey = `visited_session:${sessionId}`
    const isNewSession = await redis.set(sessionKey, JSON.stringify(visitorData), { nx: true })

    // Get total unique visitor count
    const visitedSessions = await redis.keys("visited_session:*")
    const totalCount = visitedSessions.length

    console.info(`Visitor ${isNewSession !== null ? "NEW" : "RETURNING"}: ${sessionId}, Country: ${country}, Page: ${page}, Total: ${totalCount}`)

    return NextResponse.json({ count: totalCount, isNewSession: isNewSession !== null, sessionId }, { status: 200 })
  } catch (error) {
    console.error("Visitor tracking error:", error instanceof Error ? error.message : error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
