import { describe, expect, it } from "vitest"
import { appendVaryAccept, preferredType } from "./accept"

describe("preferredType", () => {
  it("defaults to text/html when Accept is missing", () => {
    expect(preferredType(null)).toBe("text/html")
    expect(preferredType("")).toBe("text/html")
  })

  it("prefers text/markdown when listed first at equal q", () => {
    expect(preferredType("text/markdown, text/html")).toBe("text/markdown")
  })

  it("prefers text/html when browsers send html first", () => {
    expect(
      preferredType(
        "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      ),
    ).toBe("text/html")
  })

  it("honors higher q for markdown", () => {
    expect(preferredType("text/html;q=0.5, text/markdown;q=0.9")).toBe(
      "text/markdown",
    )
  })

  it("rejects an explicit q=0 type even when */* is present", () => {
    expect(preferredType("text/html;q=0, */*;q=1")).toBe("text/markdown")
    expect(preferredType("text/html;q=0, text/markdown;q=0")).toBe(null)
  })

  it("returns null when Accept excludes both produced types", () => {
    expect(preferredType("application/json")).toBe(null)
    expect(preferredType("image/png, application/pdf")).toBe(null)
  })

  it("matches text/* against produced text types", () => {
    expect(preferredType("text/*")).toBe("text/html")
  })
})

describe("appendVaryAccept", () => {
  it("sets Vary: Accept when missing", () => {
    const headers = new Headers()
    appendVaryAccept(headers)
    expect(headers.get("Vary")).toBe("Accept")
  })

  it("merges Accept into an existing Vary list", () => {
    const headers = new Headers({ Vary: "Accept-Encoding" })
    appendVaryAccept(headers)
    expect(headers.get("Vary")).toBe("Accept-Encoding, Accept")
  })

  it("does not duplicate Accept", () => {
    const headers = new Headers({ Vary: "Accept" })
    appendVaryAccept(headers)
    expect(headers.get("Vary")).toBe("Accept")
  })
})
