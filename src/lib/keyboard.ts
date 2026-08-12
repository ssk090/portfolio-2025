/**
 * Keyboard nav module — owns input filtering and scope binding.
 * Callers register action maps only.
 */

export type KeyAction = (event: KeyboardEvent) => void

export type KeyMap = Record<string, KeyAction>

export type BindOptions = {
  /** When true, ignore events while focus is in an input/textarea/contenteditable */
  ignoreWhenTyping?: boolean
  /** When true (default), ignore events with ctrl/alt/meta/shift modifiers */
  ignoreModifiers?: boolean
  /**
   * Normalize key before lookup.
   * Default: lowercase single-char keys; keep special names (ArrowDown, Escape, /).
   */
  normalizeKey?: (key: string) => string
}

const defaultNormalize = (key: string) =>
  key.length === 1 ? key.toLowerCase() : key

export function shouldIgnoreEvent(
  event: KeyboardEvent,
  options: BindOptions = {},
): boolean {
  const ignoreWhenTyping = options.ignoreWhenTyping ?? false
  const ignoreModifiers = options.ignoreModifiers ?? true

  if (ignoreModifiers) {
    if (event.ctrlKey || event.altKey || event.metaKey || event.shiftKey) {
      return true
    }
  }

  if (ignoreWhenTyping) {
    const target = event.target
    if (
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement ||
      (target instanceof HTMLElement && target.isContentEditable)
    ) {
      return true
    }
    const tag = document.activeElement?.tagName
    if (tag === "INPUT" || tag === "TEXTAREA") {
      return true
    }
  }

  return false
}

/**
 * Bind a keymap to window keydown. Returns an unbind function.
 */
export function bindKeymap(
  map: KeyMap,
  options: BindOptions = {},
): () => void {
  const normalize = options.normalizeKey ?? defaultNormalize

  const handler = (event: KeyboardEvent) => {
    if (shouldIgnoreEvent(event, options)) {
      return
    }

    const key = normalize(event.key)
    const action = map[key]
    if (action) {
      action(event)
    }
  }

  window.addEventListener("keydown", handler)
  return () => window.removeEventListener("keydown", handler)
}
