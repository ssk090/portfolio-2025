import { NextRequest, NextResponse } from "next/server"
import { cleanup, isValidSessionId } from "@/lib/visitors"

/**
 * Thin adapter kept for clients that still beacon on unload.
 * Under the permanent unique-visitor model this is effectively a no-op;
 * key scheme lives entirely inside the presence module.
 */
export async function POST(request: NextRequest) {
  try {
    let sessionId: string | null = null

    const contentType = request.headers.get("content-type") || ""

    if (contentType.includes("application/json")) {
      const body = await request.json()
      sessionId = body.sessionId
    } else {
      const text = await request.text()
      try {
        const body = JSON.parse(text)
        sessionId = body.sessionId
      } catch {
        sessionId = text
      }
    }

    if (!isValidSessionId(sessionId)) {
      return NextResponse.json(
        { error: "Invalid session ID" },
        { status: 400 },
      )
    }

    const result = await cleanup(sessionId)
    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    console.error(
      "Cleanup error:",
      error instanceof Error ? error.message : error,
    )
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    )
  }
}
