> **ARCHIVED (2026-07-08) — superseded by [edda](https://github.com/fagemx/edda).**
> This document taught hand-maintained execution state / control planes in markdown; that job now belongs to software. Kept for provenance — do not use as current method.

# <Project> Execution State

Date: YYYY-MM-DD
Status: live execution control file

## How To Use This File

Before each work session, read this file and the project `state-snapshot.md`.

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

## Control Method

Execution control combines:

- loop control: read state, pick one unit, verify, record friction;
- resumable state: current focus, last completed, next eligible, session log;
- quality gates: every queue item has a `Done When`.

Applied here as:

```text
Progress Map = stable big picture
Execution State = live current position
Package Evidence = proof for each completed slice
```

## North Star

```text
<compact campaign flow or goal>
```

## Current Position

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

## Next Queue

| Order | Package | Goal | Done When |
|---:|---|---|---|
| 1 | <next package> | <smallest useful advance> | <observable stop condition> |
| 2 | <later package> | <goal> | <observable stop condition> |

## Active Stop Conditions

Stop and ask before:

- <decision requiring operator approval>
- <boundary that should not move silently>

## Current Friction

| Date | Friction | Handling |
|---|---|---|
| YYYY-MM-DD | <what made work hard to track or execute> | <how it is handled> |

## Session Log

| Date | Package / Action | Result |
|---|---|---|
| YYYY-MM-DD | <package> | <result> |

## Working Rule For Future Agents

Use this checklist:

1. Read this execution state.
2. Read the project state snapshot.
3. Pick only the first unblocked queue item unless the operator overrides it.
4. Implement the smallest package that advances that item.
5. Verify.
6. Update this file.
7. Commit only when the operator asks or the session explicitly includes commit.
