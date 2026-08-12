import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { afterEach, describe, expect, it, vi } from "vitest"
import { bySlug, pageModel, published } from "./writings"

const tempRoots: string[] = []

function writePost(filename: string, frontmatter: string, content = "Body") {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "writing-corpus-"))
  tempRoots.push(root)
  const postsDir = path.join(root, "posts")
  fs.mkdirSync(postsDir)
  fs.writeFileSync(
    path.join(postsDir, filename),
    `---\n${frontmatter}\n---\n\n${content}`,
  )
  vi.spyOn(process, "cwd").mockReturnValue(root)
}

afterEach(() => {
  vi.restoreAllMocks()
  for (const root of tempRoots.splice(0)) {
    fs.rmSync(root, { recursive: true, force: true })
  }
})

describe("Writing corpus", () => {
  it("identifies the file and reason when Writing metadata is invalid", () => {
    writePost(
      "invalid-date.mdx",
      [
        "title: Invalid date",
        "description: A malformed Writing",
        "date: someday",
      ].join("\n"),
    )

    expect(() => published()).toThrow(/invalid-date\.mdx.*date/i)
  })

  it("scans the corpus once when building a Writing page model", () => {
    writePost(
      "one-scan.mdx",
      [
        "title: One scan",
        "description: A valid Writing",
        "date: 2025-01-01",
      ].join("\n"),
    )
    const readDirectory = vi.spyOn(fs, "readdirSync")

    expect(pageModel("one-scan")?.writing.slug).toBe("one-scan")
    expect(readDirectory).toHaveBeenCalledTimes(1)
  })

  it("allows direct draft preview without published adjacency", () => {
    writePost(
      "draft-preview.mdx",
      [
        "title: Draft preview",
        "description: An unpublished Writing",
        "date: 2025-02-01",
        "draft: true",
      ].join("\n"),
    )

    expect(published()).toEqual([])
    expect(bySlug("draft-preview")).toMatchObject({
      slug: "draft-preview",
      metadata: { draft: true },
    })
    expect(pageModel("draft-preview")).toMatchObject({
      writing: { slug: "draft-preview", metadata: { draft: true } },
      prev: null,
      next: null,
    })
  })
})
