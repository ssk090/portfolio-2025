/**
 * RFC 9110 Accept negotiation helpers for text/html vs text/markdown.
 * Used by middleware and unit tests.
 */

export const PRODUCES = ["text/html", "text/markdown"] as const

export type ProducedType = (typeof PRODUCES)[number]

type AcceptEntry = { type: string; q: number; specificity: number }

export function parseAccept(header: string): AcceptEntry[] {
  return header.split(",").map((raw) => {
    const parts = raw
      .trim()
      .split(";")
      .map((s) => s.trim())
    const type = (parts[0] ?? "*/*").toLowerCase()
    let q = 1
    for (const param of parts.slice(1)) {
      const [name, value] = param.split("=").map((s) => s.trim())
      if (name === "q") {
        const parsed = Number(value)
        if (!Number.isNaN(parsed)) q = Math.max(0, Math.min(1, parsed))
      }
    }
    const specificity = type === "*/*" ? 0 : type.endsWith("/*") ? 1 : 2
    return { type, q, specificity }
  })
}

function matches(entry: AcceptEntry, candidate: string): boolean {
  if (entry.type === "*/*") return true
  if (entry.type.endsWith("/*")) {
    return candidate.startsWith(entry.type.slice(0, -1))
  }
  return entry.type === candidate
}

/**
 * Pick the best produced type for an Accept header.
 * - Missing / empty Accept → text/html (browser default)
 * - Explicit rejection of all produced types → null (caller should 406)
 */
export function preferredType(header: string | null): ProducedType | null {
  if (!header || header.trim() === "") return "text/html"

  const entries = parseAccept(header)
  if (entries.length === 0) return "text/html"

  let bestType: ProducedType | null = null
  let bestQ = -1
  let bestPosition = Infinity

  for (const candidate of PRODUCES) {
    // Most specific matching range wins per RFC 9110 §12.5.1
    // (so `text/html;q=0, */*;q=1` correctly rejects text/html).
    let matched: AcceptEntry | null = null
    let matchedPosition = Infinity
    for (let idx = 0; idx < entries.length; idx++) {
      const e = entries[idx]
      if (!e || !matches(e, candidate)) continue
      if (
        matched === null ||
        e.specificity > matched.specificity ||
        (e.specificity === matched.specificity && idx < matchedPosition)
      ) {
        matched = e
        matchedPosition = idx
      }
    }
    if (matched === null) continue
    if (matched.q <= 0) continue

    if (
      matched.q > bestQ ||
      (matched.q === bestQ && matchedPosition < bestPosition)
    ) {
      bestQ = matched.q
      bestPosition = matchedPosition
      bestType = candidate
    }
  }

  return bestType
}

/** Merge Vary: Accept into an existing header set. */
export function appendVaryAccept(headers: Headers): void {
  const existing = headers.get("Vary")
  if (!existing) {
    headers.set("Vary", "Accept")
    return
  }
  const tokens = existing.split(",").map((s) => s.trim().toLowerCase())
  if (!tokens.includes("accept")) {
    headers.set("Vary", `${existing}, Accept`)
  }
}

export function markdownHeaders(): HeadersInit {
  return {
    "Content-Type": "text/markdown; charset=utf-8",
    Vary: "Accept",
  }
}

export function notAcceptableResponse(): Response {
  return new Response(
    "Not Acceptable\n\nAvailable: text/html, text/markdown\n",
    {
      status: 406,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        Vary: "Accept",
      },
    },
  )
}
