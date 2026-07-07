# State Snapshot — <project>

> **Volatile.** Refresh weekly, or on state change. If this file is older than 2 weeks and the project is active, it is probably wrong.

**Last reviewed:** YYYY-MM-DD
**Reviewer:** <name or agent>

---

## Current phase

<1–2 sentences describing where the project is in its arc. e.g. "v0.2 decision-loop stable, now widening to multi-project intake." or "Post-MVP hardening: no new features until observability story is solid.">

## Recently shipped (last 3–5 things)

- `YYYY-MM-DD` — <what shipped> (commit/PR if public)
- `YYYY-MM-DD` — <...>
- `YYYY-MM-DD` — <...>

## Actively in progress

- <what is being worked on, by whom / which agent, ETA if known>
- <...>

## Blocked / deferred

- <item> — blocked on <reason>. Owner: <who>.
- <item> — deferred to <when or condition>.

## Hard boundaries right now

Things that WILL NOT move this phase:

- <boundary> (reason)
- <boundary>

## What to ignore (stale frames)

- <old frame> — was true until `YYYY-MM-DD`, replaced by <new frame>
- <...>

## Current architecture source-of-truth

For the full list, see [`layer-2-knowledge.md`](layer-2-knowledge.md). Key pointers right now:

- <doc path> — <what it covers>
- <doc path> — <what it covers>

## Current open questions

Unresolved decisions the team is actively thinking about:

- <question> — <who is thinking about it>
- <question>

## Recent scars worth preserving in L6

If a scar has just been earned but not yet written up:

- <scar description> — TODO: write L6 entry

---

## How to update this file

1. When state changes (PR merges, pivot, new blocker) — update in-session
2. Weekly sweep — re-read and prune anything no longer current
3. On session end — note anything stale that the next session should update
4. Date-stamp the header each time

## Anti-patterns

- **Comprehensive-ness.** This is NOT a full status report. It's the minimum a fresh agent needs to orient. If it's longer than one screen, you're over-filling it.
- **Promises.** "We plan to ship X by Y" belongs in a roadmap doc, not here.
- **Rationale.** If explaining *why* takes more than a sentence, link to the spec; don't unpack here.
- **Stale entries.** Old items left in "Active" because nobody pruned them — worse than no snapshot.
