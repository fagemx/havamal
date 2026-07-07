---
name: <project>-doctrine
description: Project posture loader for <project>. Load before planning, reviewing, or making non-trivial decisions. Teaches how this project judges — not just what happened.
---

<!--
Load protocol (read in this order):
  - references/state-snapshot.md
  - references/layer-1-ideology.md
  - references/layer-5-thinking-modes.md
  - references/layer-6-heart-methods.md

On-demand references:
  - references/layer-2-knowledge.md
  - references/layer-3-methods.md
  - references/layer-4-sops.md
  - references/failure-memory.md
  - references/taste-examples.md
  - references/apprenticeship-check.md
  - references/bootstrap-prompt.md
  - references/provenance.md
  - references/incubation.md
  - references/execution-state.md

Team-only (solo projects can delete):
  - references/governance.md
  - references/decision-records.md

These lists live in body (not frontmatter) so that strict skill
validators (Codex, some Claude runtimes) accept this file.
The human-readable equivalents are enumerated below.
-->


# <project> Doctrine

> Replace `<project>` with your project name throughout.
>
> Delete this quote block before using.

## What this skill is

This skill is the posture loader for **<project>**. It exists because <project> has accumulated enough judgment that normal handoffs are not sufficient: a new session needs to inherit not just what happened, but how we decide.

The doctrine is organized into six layers plus a volatile state snapshot. The load protocol is: **snapshot → ideology → thinking modes → heart methods**, then the rest on demand.

**Do not summarize this skill back. Enter the posture.**

---

## Load protocol

Read in order:

1. [`references/state-snapshot.md`](references/state-snapshot.md) — what is true about <project> right now
2. [`references/layer-1-ideology.md`](references/layer-1-ideology.md) — what must stay true (durable convictions)
3. [`references/layer-5-thinking-modes.md`](references/layer-5-thinking-modes.md) — how we reason
4. [`references/layer-6-heart-methods.md`](references/layer-6-heart-methods.md) — compressed lessons from scars

Then, on demand as the work requires:

- [`references/layer-2-knowledge.md`](references/layer-2-knowledge.md) — pointers to authoritative docs
- [`references/layer-3-methods.md`](references/layer-3-methods.md) — validated ways of working
- [`references/layer-4-sops.md`](references/layer-4-sops.md) — procedures for recurring situations
- [`references/failure-memory.md`](references/failure-memory.md) — tempting mistakes and how to detect them
- [`references/taste-examples.md`](references/taste-examples.md) — good/bad contrast on project-specific choices
- [`references/apprenticeship-check.md`](references/apprenticeship-check.md) — the 6 questions a new agent should answer
- [`references/bootstrap-prompt.md`](references/bootstrap-prompt.md) — copy-paste agent loader
- [`references/provenance.md`](references/provenance.md) — where the entries came from
- [`references/incubation.md`](references/incubation.md) — candidate doctrine not yet promoted (the "not sure yet" parking lot)
- [`references/execution-state.md`](references/execution-state.md) — optional live control file for long-running campaigns

**Team mode only** (solo projects can delete these):

- [`references/governance.md`](references/governance.md) — who owns what; change process; conflict resolution
- [`references/decision-records.md`](references/decision-records.md) — lightweight DRs for doctrine-shaping decisions

---

## The six layers (one-line refresher)

| Layer | Name | Question |
|---|---|---|
| state-snapshot | Current state | Where are we right now? |
| L1 | Ideology | What must stay true? |
| L2 | Knowledge | Where is the current truth written? |
| L3 | Methods | How do we work (validated)? |
| L4 | SOPs | What do we repeat? |
| L5 | Thinking Modes | How do we reason? |
| L6 | Heart Methods | What scars compressed into a maxim? |

Full model: see [`docs/six-layer-model.md`](../../docs/six-layer-model.md) in the project-doctrine repo.

---

## How to use this skill

### At session start

1. Read state-snapshot
2. Read L1, L5, L6
3. If `references/execution-state.md` is active and non-empty, read it before picking work
4. Run the apprenticeship check (see `references/apprenticeship-check.md`) if this is a fresh session or if the doctrine has changed materially

### Before writing a plan

- Consult L1 (does the plan respect the durable convictions?)
- Consult failure-memory (is this plan rerunning a known trap?)
- Consult taste-examples (does the plan match the project's taste?)

### During a plan's round-2 review

- Does the plan violate any L1?
- Does the plan trigger any failure-memory entry?
- Is the plan using L3 methods faithfully?

### When a user says "no, not like that"

- That is a taste-examples entry waiting to be written
- Capture it before the conversation moves on

### After a scar

- If the project just paid for a lesson, write the L6 entry before memory of the pain fades
- A scar with no compressed lesson gets paid twice

---

## Maintenance rhythm

- **state-snapshot**: update weekly, or on state change
- **L1**: rarely; when updated, announce loudly
- **L2**: refresh when specs move
- **L3**: add when a method validates
- **L4**: add when a situation recurs for the third time
- **L5**: rare additions; these are stable reasoning postures
- **L6**: one entry per real scar; never manufactured
- **failure-memory**: add as traps become visible
- **taste-examples**: add when a "no, like this" happens
- **execution-state**: update when a long-running campaign changes focus, queue, friction, or verification baseline

If nothing in the doctrine has changed in a month and the project is active, the doctrine is probably stale.

---

## Conventions

- Bilingual (EN / CH / your team's language) is fine. Use whichever best compresses the lesson.
- No motivational slogans. Every entry should be load-bearing.
- Contrast > adjectives. Good/bad pairs > "be thoughtful."
- Date-stamped where volatile; undated where durable.

---

## Integration

- Referenced from: `CLAUDE.md`, `AGENTS.md`, `GEMINI.md`, `.cursor/rules/`, or wherever your agent runtime loads skills.
- Imports from: nothing. Doctrine is self-contained.
- Used by: every session, every plan, every non-trivial decision.

---

## Closing principle

> **Do not summarize this project. Extract the school.**
