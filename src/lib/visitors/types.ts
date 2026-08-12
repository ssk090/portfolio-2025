/**
 * Seams for the Visitor presence module.
 */

export type VisitorData = {
  timestamp: number
  visited: true
  ip: string
  country: string
  userAgent: string
  referrer: string
  language: string
  page: string
}

export type TrackInput = {
  sessionId: string
  page?: string
  userAgent: string
  ip: string
  country: string
  referrer: string
  language: string
}

export type TrackSuccess = {
  ok: true
  filtered?: undefined
  count: number
  isNewSession: boolean
  sessionId: string
}

export type TrackFiltered = {
  ok: true
  filtered: true
  count: 0
}

export type TrackFailure = {
  ok: false
  error: string
  status: number
}

export type TrackResult = TrackSuccess | TrackFiltered | TrackFailure

export function isTrackSuccess(
  result: TrackResult,
): result is TrackSuccess {
  return result.ok && !("filtered" in result && result.filtered)
}

/**
 * Counter store seam — Redis in prod, in-memory in tests.
 * Two adapters justify the seam.
 */
export interface VisitorStore {
  /** Set session if absent. Returns true when newly created. */
  markVisited(sessionId: string, data: VisitorData): Promise<boolean>
  /** Total unique visited sessions. */
  count(): Promise<number>
  /** Optional cleanup of a transient key; no-op if unused. */
  cleanup?(sessionId: string): Promise<boolean>
}
