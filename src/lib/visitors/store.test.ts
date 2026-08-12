import { describe, expect, it } from "vitest"
import type { Redis } from "@upstash/redis"
import { createInMemoryStore, createRedisStore } from "./store"
import type { VisitorData, VisitorStore } from "./types"

const visitor: VisitorData = {
  timestamp: 1,
  visited: true,
  ip: "127.0.0.1",
  country: "unknown",
  userAgent: "test",
  referrer: "direct",
  language: "en",
  page: "/",
}

class FakeRedis {
  private readonly values = new Map<string, string>()
  private readonly sets = new Map<string, Set<string>>()

  async set(key: string, value: string, options?: { nx?: boolean }) {
    if (options?.nx && this.values.has(key)) return null
    this.values.set(key, value)
    return "OK"
  }

  async sadd(key: string, ...members: string[]) {
    const set = this.sets.get(key) ?? new Set<string>()
    const sizeBefore = set.size
    members.forEach((member) => set.add(member))
    this.sets.set(key, set)
    return set.size - sizeBefore
  }

  async scard(key: string) {
    return this.sets.get(key)?.size ?? 0
  }

  async keys(pattern: string) {
    const prefix = pattern.replace(/\*$/, "")
    return [...this.values.keys()].filter((key) => key.startsWith(prefix))
  }

  seedLegacy(sessionId: string) {
    this.values.set(`visited_session:${sessionId}`, JSON.stringify(visitor))
  }
}

function visitorStoreContract(
  adapter: string,
  createStore: () => VisitorStore,
) {
  describe(`${adapter} Visitor store adapter`, () => {
    it("records unique visitors permanently", async () => {
      const store = createStore()

      await expect(store.markVisited("session-a", visitor)).resolves.toBe(true)
      await expect(store.markVisited("session-a", visitor)).resolves.toBe(false)
      await expect(store.count()).resolves.toBe(1)
      expect(store).not.toHaveProperty("cleanup")
    })
  })
}

visitorStoreContract("in-memory", () => createInMemoryStore())
visitorStoreContract("Redis", () =>
  createRedisStore(new FakeRedis() as unknown as Redis),
)

describe("Redis Visitor store migration", () => {
  it("backfills the visitor set from legacy session keys", async () => {
    const redis = new FakeRedis()
    redis.seedLegacy("legacy-a")
    redis.seedLegacy("legacy-b")
    const store = createRedisStore(redis as unknown as Redis)

    await expect(store.count()).resolves.toBe(2)
    await expect(store.count()).resolves.toBe(2)
  })
})
