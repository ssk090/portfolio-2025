# Domain model — portfolio-2025

Personal portfolio site: work history, project catalog, writings, and a
lightweight visitor presence counter.

## Glossary

| Term | Meaning |
|------|---------|
| **Project** | A portfolio piece with summary + full achievements, tech tags, and link. Owned by the Project catalog module (`src/lib/projects.ts`). |
| **Project catalog** | Single source of truth for all Projects. Interface: `all()`, `featured()`, `bySlug()`. |
| **Work item** | An employment entry (role, period, location, bullets). Owned by `src/lib/work-items.ts`. |
| **Writing** | An MDX post with title, description, date, content, and draft status. Draft Writings are excluded from published listings and adjacency but remain reachable by slug for preview. |
| **Writing corpus** | Module that loads, filters, sorts writings and builds page models. Interface: `published()`, `bySlug()`, `pageModel(slug)`. (`src/lib/writings.ts`) |
| **Writing page model** | Ready-to-render bundle: Writing + reading time + published adjacency + date labels. |
| **Writing search** | Keyboard-driven filtering and selection of published Writings. `/` opens search; arrows move selection; Enter opens the selected Writing; Escape closes and resets search. |
| **Visitor presence** | Permanent cumulative unique-visitor tracking: once recorded, a visitor is never removed. Interface: `track()`, `count()`, `isBot()`. (`src/lib/visitors/`) |
| **Visitor store** | Adapter seam for presence persistence. Redis in prod, in-memory in tests. |
| **Site identity** | Canonical origin, author, social handles, metadata, and shared OG visual frame. |
| **Keyboard nav** | Shared key-binding module: modifier/typing policy + scoped key maps. (`src/lib/keyboard.ts`) |

## Seams

- **Project catalog → home / projects pages** — featured slice vs full cards
- **Writing corpus → writings list / post page** — list vs `pageModel`
- **Visitor presence → HTTP route adapters** — track / stream
- **Visitor store** — Redis adapter · InMemory adapter
- **Site identity → layout / pages / OG routes**
- **Keyboard nav → Navbar · Writing search**
