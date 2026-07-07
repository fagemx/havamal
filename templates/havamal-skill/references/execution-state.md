# Execution State — <project>

> **Optional.** Add real content only when state-snapshot + handoff are no
> longer enough to track a long-running campaign.

**Last reviewed:** YYYY-MM-DD
**Reviewer:** <name or agent>

---

## How to use this file

Before each work session, read this file and `state-snapshot.md`.

After each work session, update:

- current focus;
- last completed package;
- next queue;
- blockers or friction;
- verification baseline if it changed.

This file exists so the operator does not need to reconstruct progress from
chat history or individual commits.

Operator prompt:

```text
Read this execution-state file and state-snapshot. Pick the first unblocked
Next Queue item. Do the smallest package that advances it. After verification,
update execution-state.
```

## Control method

Execution control combines:

- loop discipline: read state, pick one unit, verify, record friction;
- resumable state: current focus, last completed, next eligible, session log;
- quality gates: every queue item has a `Done When`.

## North star

```text
<compact campaign flow or goal>
```

## Current position

Current focus:

```text
<one line>
```

Last completed package:

```text
<package name>
Commit: <commit or n/a>
Validation: <commands or n/a>
Baseline: <test count or other verification>
```

Latest proof:

```text
<what has actually been proven, not merely planned>
```

## Next queue

| Order | Package | Goal | Done When |
|---:|---|---|---|
| 1 | <next package> | <smallest useful advance> | <observable stop condition> |
| 2 | <later package> | <goal> | <observable stop condition> |

## Active stop conditions

Stop and ask before:

- <decision requiring operator approval>
- <boundary that should not move silently>

## Current friction

| Date | Friction | Handling |
|---|---|---|
| YYYY-MM-DD | <what made work hard to track or execute> | <how it is handled> |

## Session log

| Date | Package / Action | Result |
|---|---|---|
| YYYY-MM-DD | <package> | <result> |

## Working rule for future agents

Use this checklist:

1. Read this execution state.
2. Read the project state snapshot.
3. Pick only the first unblocked queue item unless the operator overrides it.
4. Implement the smallest package that advances that item.
5. Verify.
6. Update this file.
7. Commit only when the operator asks or the session explicitly includes commit.

## Anti-patterns

- The operator must read git log to know where the project is.
- The next queue becomes a wishlist.
- A queue item has no `Done When`.
- Progress exists only in chat.
- The file grows beyond one screen without pruning.
