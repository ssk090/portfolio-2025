/**
 * Compatibility shim — prefer `@/lib/writings`.
 * Kept so any lingering imports keep resolving during the transition.
 */
export {
  all,
  bySlug,
  extractHeadings,
  formatDate,
  formatDateLong,
  getAdjacent,
  getAdjacentPosts,
  getPostBySlug,
  getPosts,
  getPublishedPosts,
  getReadingTime,
  pageModel,
  published,
  type Heading,
  type MDXFileData,
  type Metadata,
  type Writing,
  type WritingPageModel,
} from "./writings"

// Re-export dates path for callers that only need formatting
export { formatDate as formatDateShort } from "./dates"
