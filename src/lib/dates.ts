/**
 * Date formatting helpers — client-safe (no fs).
 * Writing corpus and UI both import from here.
 */

/** Short label: "aug 12, 2026" */
export function formatDate(dateString: string): string {
  return new Date(dateString)
    .toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    .toLowerCase()
}

/** Long label: "August 12, 2026" */
export function formatDateLong(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
