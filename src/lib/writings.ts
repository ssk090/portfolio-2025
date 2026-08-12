/**
 * Writing corpus module — owns parse, draft filter, sort, reading time,
 * headings, adjacent posts, and date formatting behind one interface.
 */

import fs from "fs"
import path from "path"
import { z } from "zod"
import { formatDate, formatDateLong } from "./dates"

export { formatDate, formatDateLong } from "./dates"

const metadataSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  draft: z
    .string()
    .transform((val) => val === "true")
    .optional()
    .default(false),
})

export type Metadata = z.infer<typeof metadataSchema>

export type Writing = {
  slug: string
  metadata: Metadata
  content: string
}

export type Heading = {
  text: string
  slug: string
  level: number
}

export type WritingPageModel = {
  writing: Writing
  readingTime: string
  headings: Heading[]
  prev: Writing | null
  next: Writing | null
  dateLabel: string
  dateLabelLong: string
}

type FrontmatterParseResult = {
  metadata: Metadata
  content: string
}

export function getReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.round(words / 225))
  return `${minutes} min read`
}

export function extractHeadings(content: string): Heading[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const headings: Heading[] = []
  let match: RegExpExecArray | null

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1]!.length
    const text = match[2]!.trim()
    const slug = text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/&/g, "-and-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
    headings.push({ text, slug, level })
  }

  return headings
}

function parseFrontmatter(fileContent: string): FrontmatterParseResult {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  const match = frontmatterRegex.exec(fileContent)

  if (!match?.[1]) {
    throw new Error("No frontmatter found")
  }

  const content = fileContent.replace(frontmatterRegex, "").trim()
  const frontmatterLines = match[1].trim().split("\n")
  const raw: Record<string, string> = {}

  for (const line of frontmatterLines) {
    const [key, ...values] = line.split(": ")
    if (!key) continue
    let value = values.join(": ").trim()
    value = value.replace(/^['"](.*)['"]$/, "$1")
    if (value) {
      raw[key.trim()] = value
    }
  }

  const metadata = metadataSchema.parse(raw)
  return { metadata, content }
}

function getMDXFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return []
  }
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx")
}

function readMDXFile(filePath: string): FrontmatterParseResult {
  const rawContent = fs.readFileSync(filePath, "utf-8")
  return parseFrontmatter(rawContent)
}

function loadAll(dir = path.join(process.cwd(), "posts")): Writing[] {
  return getMDXFiles(dir).map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file))
    const slug = path.basename(file, path.extname(file))
    return { metadata, slug, content }
  })
}

function byDateDesc(a: Writing, b: Writing): number {
  return (
    new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
  )
}

/** All writings including drafts. */
export function all(): Writing[] {
  return loadAll().sort(byDateDesc)
}

/** Published writings, newest first. */
export function published(): Writing[] {
  return loadAll()
    .filter((w) => !w.metadata.draft)
    .sort(byDateDesc)
}

/** Lookup by slug (includes drafts so draft preview still works). */
export function bySlug(slug: string): Writing | null {
  return loadAll().find((w) => w.slug === slug) ?? null
}

export function getAdjacent(slug: string): {
  prev: Writing | null
  next: Writing | null
} {
  const posts = published()
  const index = posts.findIndex((post) => post.slug === slug)
  if (index === -1) {
    return { prev: null, next: null }
  }
  return {
    prev: index < posts.length - 1 ? (posts[index + 1] ?? null) : null,
    next: index > 0 ? (posts[index - 1] ?? null) : null,
  }
}

/**
 * Ready page model for /writings/[slug] — reading time, headings,
 * adjacent, and formatted dates in one call.
 */
export function pageModel(slug: string): WritingPageModel | null {
  const writing = bySlug(slug)
  if (!writing) {
    return null
  }

  const { prev, next } = getAdjacent(slug)

  return {
    writing,
    readingTime: getReadingTime(writing.content),
    headings: extractHeadings(writing.content),
    prev,
    next,
    dateLabel: formatDate(writing.metadata.date),
    dateLabelLong: formatDateLong(writing.metadata.date),
  }
}

// ---------------------------------------------------------------------------
// Backward-compatible aliases (old blog.ts names)
// Prefer published() / bySlug() / pageModel() at new call sites.
// ---------------------------------------------------------------------------

/** @deprecated use Writing */
export type MDXFileData = Writing

/** @deprecated use all() */
export function getPosts(): Writing[] {
  return all()
}

/** @deprecated use published() */
export function getPublishedPosts(): Writing[] {
  return published()
}

/** @deprecated use bySlug() */
export function getPostBySlug(slug: string): Writing | null {
  return bySlug(slug)
}

/** @deprecated use getAdjacent() */
export function getAdjacentPosts(slug: string): {
  prev: Writing | null
  next: Writing | null
} {
  return getAdjacent(slug)
}
