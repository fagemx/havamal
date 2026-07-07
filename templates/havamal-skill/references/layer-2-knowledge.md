# L2 — Knowledge

> **Index, not content.** L2 points at authoritative docs. It does not duplicate them.

If a pointer goes stale, retire it here — don't silently delete.

---

## 2.1 Reading ladder

For a new session, read in this order:

1. [`state-snapshot.md`](state-snapshot.md) — current truth
2. <path to canonical architecture doc> — <one-line description>
3. <path to product-definition doc> — <one-line description>
4. <path to active-spec doc> — <one-line description>

On demand:

- <path> — <when to read this>
- <path> — <when to read this>

---

## 2.2 Canonical specs

| Path | Description | Last verified |
|---|---|---|
| `docs/specs/YYYY-MM-DD-<name>.md` | <one-line> | YYYY-MM-DD |
| `docs/specs/YYYY-MM-DD-<name>.md` | <one-line> | YYYY-MM-DD |

## 2.3 Superseded docs (do not follow)

| Path | Replaced by | Superseded on |
|---|---|---|
| `docs/specs/<old>.md` | `docs/specs/<new>.md` | YYYY-MM-DD |

## 2.4 Source-of-truth for common questions

- **What is <project> supposed to be?** → <path>
- **How does X work?** → <path>
- **What's our testing philosophy?** → <path>
- **What's the deployment pipeline?** → <path>
- **Who owns <subsystem>?** → <path or person>

---

## Anti-patterns

- **Explaining what a doc says.** If a reader needs the content, they should open the doc. L2 is a map, not a mirror.
- **Undated entries.** "Check the latest spec" rots. Name the spec and date it.
- **Duplicating architecture.** Architecture lives in `docs/specs/`, not here.
- **Growing unbounded.** If L2 has more than ~20 entries, some aren't authoritative — prune.

## Maintenance

- When a new canonical doc ships, add it here.
- When a doc is superseded, move it to the superseded table — don't remove.
- Weekly: spot-check 2–3 entries for the `last verified` date vs. recent commits.
