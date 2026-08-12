import fs from "node:fs"
import path from "node:path"
import { z } from "zod"
import { formatDate, formatDateLong } from "./dates"

const metadataSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string().refine((value) => !Number.isNaN(Date.parse(value)), {
    message: "Invalid date",
  }),
  draft: z
    .string()
    .transform((value) => value === "true")
    .optional()
    .default(false),
})

export type Metadata = z.infer<typeof metadataSchema>

export type Writing = {
  slug: string
  metadata: Metadata
  content: string
}

export type WritingPageModel = {
  writing: Writing
  readingTime: string
  prev: Writing | null
  next: Writing | null
  dateLabel: string
  dateLabelLong: string
}

type FrontmatterParseResult = {
  metadata: Metadata
  content: string
}

function readingTime(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.round(words / 225))
  return `${minutes} min read`
}

function parseFrontmatter(fileContent: string): FrontmatterParseResult {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  const match = frontmatterRegex.exec(fileContent)

  if (!match?.[1]) {
    throw new Error("No frontmatter found")
  }

  const content = fileContent.replace(frontmatterRegex, "").trim()
  const raw: Record<string, string> = {}

  for (const line of match[1].trim().split("\n")) {
    const [key, ...values] = line.split(": ")
    if (!key) continue

    const value = values
      .join(": ")
      .trim()
      .replace(/^['"](.*)['"]$/, "$1")
    if (value) {
      raw[key.trim()] = value
    }
  }

  return { metadata: metadataSchema.parse(raw), content }
}

function readWriting(filePath: string): FrontmatterParseResult {
  const rawContent = fs.readFileSync(filePath, "utf-8")

  try {
    return parseFrontmatter(rawContent)
  } catch (error) {
    const reason =
      error instanceof z.ZodError
        ? error.issues
            .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
            .join(", ")
        : error instanceof Error
          ? error.message
          : String(error)

    throw new Error(`Invalid Writing ${path.basename(filePath)}: ${reason}`, {
      cause: error,
    })
  }
}

function byDateDescending(a: Writing, b: Writing): number {
  return (
    new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
  )
}

function loadCorpus(): Writing[] {
  const directory = path.join(process.cwd(), "posts")
  if (!fs.existsSync(directory)) {
    return []
  }

  const writings: Writing[] = []
  for (const file of fs.readdirSync(directory)) {
    if (path.extname(file) !== ".mdx") continue

    const { metadata, content } = readWriting(path.join(directory, file))
    writings.push({
      slug: path.basename(file, path.extname(file)),
      metadata,
      content,
    })
  }

  return writings.sort(byDateDescending)
}

function adjacentIn(
  writings: Writing[],
  slug: string,
): { prev: Writing | null; next: Writing | null } {
  const index = writings.findIndex((writing) => writing.slug === slug)
  if (index === -1) {
    return { prev: null, next: null }
  }

  return {
    prev:
      index < writings.length - 1 ? (writings[index + 1] ?? null) : null,
    next: index > 0 ? (writings[index - 1] ?? null) : null,
  }
}

/** Published Writings, newest first. */
export function published(): Writing[] {
  return loadCorpus().filter((writing) => !writing.metadata.draft)
}

/** Lookup by slug, including drafts for direct preview. */
export function bySlug(slug: string): Writing | null {
  return loadCorpus().find((writing) => writing.slug === slug) ?? null
}

/** Ready-to-render data for a Writing page. */
export function pageModel(slug: string): WritingPageModel | null {
  const writings = loadCorpus()
  const writing = writings.find((candidate) => candidate.slug === slug) ?? null
  if (!writing) {
    return null
  }

  const { prev, next } = adjacentIn(
    writings.filter((candidate) => !candidate.metadata.draft),
    slug,
  )

  return {
    writing,
    readingTime: readingTime(writing.content),
    prev,
    next,
    dateLabel: formatDate(writing.metadata.date),
    dateLabelLong: formatDateLong(writing.metadata.date),
  }
}
