import { describe, expect, it } from "vitest"
import {
  appendVaryAccept,
  markdownHeaders,
  notAcceptableResponse,
  preferredType,
} from "./accept"

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
  it("sets Vary: Accept, Accept-Encoding when missing", () => {
    const headers = new Headers()
    appendVaryAccept(headers)
    expect(headers.get("Vary")).toBe("Accept, Accept-Encoding")
  })

  it("merges Accept into an existing Vary list", () => {
    const headers = new Headers({ Vary: "Accept-Encoding" })
    appendVaryAccept(headers)
    expect(headers.get("Vary")).toBe("Accept-Encoding, Accept")
  })

  it("merges Accept-Encoding when only Accept is present", () => {
    const headers = new Headers({ Vary: "Accept" })
    appendVaryAccept(headers)
    expect(headers.get("Vary")).toBe("Accept, Accept-Encoding")
  })

  it("does not duplicate Accept or Accept-Encoding (case-insensitive)", () => {
    const headers = new Headers({
      Vary: "accept, ACCEPT-ENCODING, RSC",
    })
    appendVaryAccept(headers)
    expect(headers.get("Vary")).toBe("accept, ACCEPT-ENCODING, RSC")
  })
})

describe("markdownHeaders and 406", () => {
  it("emits Vary: Accept, Accept-Encoding on markdown", () => {
    const headers = markdownHeaders() as Record<string, string>
    expect(headers.Vary).toBe("Accept, Accept-Encoding")
    expect(headers["Content-Type"]).toContain("text/markdown")
  })

  it("emits Vary: Accept, Accept-Encoding on 406", async () => {
    const res = notAcceptableResponse()
    expect(res.status).toBe(406)
    expect(res.headers.get("Vary")).toBe("Accept, Accept-Encoding")
  })
})
