> **ARCHIVED (2026-07-08) — superseded by [edda](https://github.com/fagemx/edda).**
> This document taught hand-maintained execution state / control planes in markdown; that job now belongs to software. Kept for provenance — do not use as current method.

# Execution Control

> Use this when a project is moving through many small packages and the operator
> can no longer tell where the larger campaign is.

Havamal already distinguishes doctrine from handoff. Execution control
is the missing middle layer for long-running agent work:

```text
state-snapshot = where the project is now
handoff = how to continue this specific task
execution-control = which large campaign is active, what is next, and when to stop
```

It is not a replacement for doctrine. It is a live control file that prevents
the agent from making the user track every small commit.

---

## Quick start

1. Copy the template:

```powershell
Copy-Item "<path-to-project-doctrine>\templates\execution-state.md" `
  "docs\product\<project>-execution-state.md"
```

Or, if the project uses a doctrine skill, copy/use:

```text
templates/havamal-skill/references/execution-state.md
```

2. Fill only these fields first:

- `North star`
- `Current position`
- `Next queue`
- `Active stop conditions`

3. At the start of a work session, tell the agent:

```text
Read the execution-state file and state-snapshot. Pick the first unblocked
Next Queue item. Do the smallest package that advances it. After verification,
update execution-state.
```

4. At the end of the session, check that the agent updated:

- last completed package;
- current focus, if changed;
- next queue, if changed;
- friction, if the operator had to correct direction;
- verification baseline, if changed.

If those fields were not updated, the session is not closed.

---

## When to add it

Add execution control only when absence hurts:

- the project has many small incremental packages;
- the operator asks "where are we going?";
- the agent keeps advancing one step without updating the big picture;
- work spans multiple sessions or agents;
- the next task depends on a queue, not a one-off handoff.

Do not add it for a small project where `state-snapshot.md` and `handoff.md`
are enough.

---

## The three parts

Execution control is a Havamal method with three parts.

### 1. Loop control

The loop discipline:

```text
read state
pick one issue
review the approach
implement
verify
record friction
stop or continue
```

In Havamal:

- **loop** becomes "working rule for future agents";
- **backlog** becomes "next queue";
- **friction** becomes "current friction";
- **hard stop conditions** become "active stop conditions".

### 2. Resumable state

The resumability discipline:

```text
current focus
last completed unit
next eligible unit
session log
resume without chat memory
```

In Havamal:

- the file must name the current focus;
- it must name the last completed package;
- it must name the next queue in order;
- it must be enough for a fresh agent to resume.

### 3. Quality gates

The quality discipline:

```text
done when
quality threshold
pack health
reviewer challenge
do not build every possible thing
```

In Havamal:

- every queue item needs a `Done When`;
- the file should name what not to build yet;
- stage advancement should require a review or verification condition;
- "more work happened" is not the same as "the campaign advanced".

---

## Recommended file

Use one file:

```text
docs/product/<project>-execution-state.md
```

or, inside a doctrine skill:

```text
docs/skills/<project>-doctrine/references/execution-state.md
```

Keep it short enough that an agent actually reads it.

---

## Required sections

### 1. How to use this file

State when it must be read and when it must be updated.

### 2. Control method

Name the borrowed methods and how they are applied in this project.

### 3. North star

One compact flow or goal that explains the campaign.

### 4. Current position

Current focus, last completed package, latest proof, validation baseline.

### 5. Next queue

A table with:

| Order | Package | Goal | Done When |
|---:|---|---|---|

The agent should normally take the first unblocked item only.

### 6. Active stop conditions

Things that require user decision before proceeding.

### 7. Current friction

What is making progress hard, and how it is being handled.

### 8. Session log

Short append-only notes for recent packages or control changes.

### 9. Working rule for future agents

The exact checklist a future agent must follow.

---

## Update rules

At the start of a session:

1. Read execution state.
2. Read state snapshot.
3. Read only the docs needed for the first unblocked queue item.

At the end of a session:

1. Update last completed package if something shipped.
2. Update current focus if it changed.
3. Update next queue if priorities changed.
4. Add friction if the operator had to correct the process.
5. Add verification baseline if it changed.

Do not turn every small commit into doctrine. Execution state is volatile; it
can be overwritten when the campaign changes.

---

## Anti-patterns

- **Commit archaeology as project management.** If the operator must read the
  git log to know where the project is, execution control is failing.
- **Ever-growing queue.** The next queue is not a wishlist. Keep only the next
  few actionable packages.
- **No Done When.** A queue without stop conditions becomes endless motion.
- **Chat-only progress.** If the state exists only in the conversation, the
  next agent will lose it.
- **Premature automation.** Do not build a dispatcher until the file discipline
  works manually.

---

## Template

Copy:

```text
templates/execution-state.md
```

Fill it only after normal state snapshots are no longer enough.

---

## Next layer (optional)

If the markdown execution state itself outgrows one screen, or a second
reader (a status command, an external agent, a sibling session) needs the
same state, add a **machine-readable control plane**. See
[`control-plane.md`](control-plane.md) and the template at
[`../templates/control-plane.json`](../templates/control-plane.json).

The control plane is opt-in. The markdown execution state remains the
narrative source; the JSON is the structured mirror.
