import { NextRequest, NextResponse } from "next/server"
import { isTrackSuccess, track } from "@/lib/visitors"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const sessionId = body?.sessionId
    const page = body?.page

    const result = await track({
      sessionId,
      page,
      userAgent: request.headers.get("user-agent") || "",
      ip: request.headers.get("x-forwarded-for") || "unknown",
      country:
        request.headers.get("x-vercel-ip-country") ||
        request.headers.get("cf-ipcountry") ||
        "unknown",
      referrer: request.headers.get("referer") || "direct",
      language: request.headers.get("accept-language") || "unknown",
    })

    if (!result.ok) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status },
      )
    }

    if (!isTrackSuccess(result)) {
      return NextResponse.json(
        { count: 0, filtered: true },
        { status: 200 },
      )
    }

    return NextResponse.json(
      {
        count: result.count,
        isNewSession: result.isNewSession,
        sessionId: result.sessionId,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error(
      "Visitor tracking error:",
      error instanceof Error ? error.message : error,
    )
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    )
  }
}
