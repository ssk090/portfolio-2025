/**
 * Visitor presence module — deep core behind a small interface.
 * HTTP routes are thin adapters over track() / count() / isBot().
 */

import type { TrackInput, TrackResult, VisitorData, VisitorStore } from "./types"
import { getVisitorStore } from "./store"

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

export function isBot(userAgent: string): boolean {
  const ua = userAgent.toLowerCase()
  return BOT_PATTERNS.some((pattern) => ua.includes(pattern))
}

function isValidSessionId(sessionId: unknown): sessionId is string {
  return (
    typeof sessionId === "string" &&
    sessionId.length >= 20 &&
    sessionId.length <= 128
  )
}

export async function track(
  input: TrackInput,
  store: VisitorStore = getVisitorStore(),
): Promise<TrackResult> {
  if (!isValidSessionId(input.sessionId)) {
    return { ok: false, error: "Invalid session ID", status: 400 }
  }

  if (isBot(input.userAgent)) {
    return { ok: true, filtered: true, count: 0 }
  }

  const data: VisitorData = {
    timestamp: Date.now(),
    visited: true,
    ip: input.ip,
    country: input.country,
    userAgent: input.userAgent,
    referrer: input.referrer,
    language: input.language,
    page: input.page || "unknown",
  }

  const isNewSession = await store.markVisited(input.sessionId, data)
  const totalCount = await store.count()

  return {
    ok: true,
    count: totalCount,
    isNewSession,
    sessionId: input.sessionId,
  }
}

export async function count(
  store: VisitorStore = getVisitorStore(),
): Promise<number> {
  return store.count()
}

