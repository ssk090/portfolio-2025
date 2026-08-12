import { Redis } from "@upstash/redis"
import type { VisitorData, VisitorStore } from "./types"

const SESSION_PREFIX = "visited_session:"

/**
 * Redis adapter — production store.
 * Uses SCARD on a set instead of KEYS * for O(1) counting.
 */
export function createRedisStore(redis: Redis): VisitorStore {
  const setKey = "visited_sessions"

  return {
    async markVisited(sessionId, data) {
      const sessionKey = `${SESSION_PREFIX}${sessionId}`
      const created = await redis.set(sessionKey, JSON.stringify(data), {
        nx: true,
      })
      // Keep a set for O(1) cardinality regardless of nx outcome
      // (handles legacy keys that predate the set)
      await redis.sadd(setKey, sessionId)
      return created !== null
    },

    async count() {
      const n = await redis.scard(setKey)
      if (n > 0) {
        return n
      }
      // Fallback for pre-migration data that only has visited_session:* keys
      const keys = await redis.keys(`${SESSION_PREFIX}*`)
      if (keys.length === 0) {
        return 0
      }
      // Backfill the set once (one member at a time keeps typings simple)
      for (const key of keys) {
        await redis.sadd(setKey, key.slice(SESSION_PREFIX.length))
      }
      return keys.length
    },

  }
}

/** In-memory adapter — tests and local fallback. */
export function createInMemoryStore(
  initial: Map<string, VisitorData> = new Map(),
): VisitorStore {
  const sessions = new Map(initial)

  return {
    async markVisited(sessionId, data) {
      if (sessions.has(sessionId)) {
        return false
      }
      sessions.set(sessionId, data)
      return true
    },

    async count() {
      return sessions.size
    },
  }
}

let singleton: VisitorStore | null = null

/** Resolve the production store (lazy Redis client). */
export function getVisitorStore(): VisitorStore {
  if (singleton) {
    return singleton
  }

  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN

  if (!url || !token) {
    // Degrade gracefully without credentials (build / local)
    singleton = createInMemoryStore()
    return singleton
  }

  singleton = createRedisStore(new Redis({ url, token }))
  return singleton
}

