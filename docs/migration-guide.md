# Migration Guide

How to install Havamal in your project. The short version: copy the template, fill it in for your project, start using it before your next plan.

## Prerequisites

Havamal is most useful when:

- Your project has been running long enough to have real failures (≥ 1 month of substantive work)
- Multiple sessions or agents touch the project
- You've noticed yourself re-explaining the same conviction
- Your next question is "how would a new agent enter this project?"

If you're at day 1 of a project, write a README first. Come back here in a month.

## The 10-step install

### 1. Copy the template

```
cp -r templates/havamal-skill docs/skills/<your-project>-doctrine
```

Or on Windows:

```
xcopy /E /I templates\havamal-skill docs\skills\<your-project>-doctrine
```

You now have the skeleton:

```
docs/skills/<your-project>-doctrine/
  SKILL.md
  references/
    state-snapshot.md
    layer-1-ideology.md
    layer-2-knowledge.md
    layer-3-methods.md
    layer-4-sops.md
    layer-5-thinking-modes.md
    layer-6-heart-methods.md
    failure-memory.md
    taste-examples.md
    apprenticeship-check.md
    bootstrap-prompt.md
    provenance.md
```

### 2. Fill `state-snapshot.md` first

This is the easiest and highest-value file. List:

- Current phase
- Last 3–5 shipped things
- What's actively in progress
- What's blocked or deferred
- What to ignore (old frames that are no longer current)

Date-stamp the header. Give it one day-old information and stop; don't overwrite it with everything you know.

**Rule of thumb:** if you don't know how to start, start here. The rest becomes easier once the volatile state is externalized.

### 3. Draft L1 (ideology)

Sit down and answer: **what must stay true about this project?**

Aim for 3–7 convictions. Each one:

- Starts with a claim
- Has a short justification (1 sentence)
- Is testable — you should be able to recognize a violation

Early-stage L1 often has 2–3 entries. That's fine. Add as convictions prove out.

### 4. Draft L5 (thinking modes) and L6 (heart methods) next

Before L2/L3/L4. Why: these are stable and compressed. They are also the easiest to write when the doctrine is fresh — you remember the scars.

**L5** is metacognitive — "how to reason here." Stock 2–4 entries to start.

**L6** is scar-based — "what we've paid to learn." Start with 1–3. If you have more than 5 without a scar behind each, prune.

### 5. Add 3 failure-memory entries

Pick the three tempting mistakes your project has seen most often. For each, fill the four fields: temptation, how it failed, future detection, correct move.

If you can only think of one, write one. Three is a starter goal, not a gate.

### 6. Add 3 taste examples

Pick three situations where "good" and "bad" differ in a *project-specific* way. For each, write a good/bad pair and explain why good wins *in this project's context*.

Most projects struggle here at first. That's OK. The first three entries are practice.

### 7. Fill L2 (knowledge) as an index

List the authoritative specs and architecture docs, in reading order. Do NOT copy content — point.

For each entry:

- Path (relative to project root)
- One-line description
- Last-verified date or commit

Mark superseded docs explicitly.

### 8. Write the apprenticeship check

Customize the 6 questions from `docs/apprenticeship-protocol.md` to your project. The questions stay the same; what counts as a good answer is project-specific.

### 9. Write the bootstrap-prompt

A short (< 50 lines) copy-paste block a fresh agent can receive at session start. It should point at:

- The SKILL.md
- The state-snapshot
- The minimum layers to load before talking (usually state + L1 + L5 + L6)

### 10. Use it before your next plan

The doctrine isn't done when you finish writing. It's "in beta" until the first time you use it to shape a real decision. Use it on the next plan you write. Notice what's missing. Patch.

## What to leave for later

- **L3 (methods)** can start empty. Populate only when you've *validated* a method.
- **L4 (SOPs)** grows situationally. Don't front-load it.
- **Provenance** is a meta-doc tracking where entries came from. You can write it in phase 2.

## Order of return

Week 1: state-snapshot + L1.
Week 2: L5 + L6 + 3 failure-memory entries.
Week 3: 3 taste examples + L2 index.
Week 4: apprenticeship check + bootstrap-prompt.

If you try to do all ten in one sitting, you'll produce generic content. Stagger it.

## Common mistakes during install

### Over-claiming L1

New doctrines often pack L1 with things that *should* be true rather than things that *are* durable. If you wrote 15 L1 entries, most of them are actually aspirations; move them to a separate "aspirations" file or demote to L3.

### Filling L3 with blog posts

"We should use feature flags." Have you? If not, that's an experiment, not doctrine. L3 holds what's been *tested in your project*.

### Copying someone else's L6

L6 is scar-based. If the scar isn't yours, the reflex won't fire. Borrow patterns; don't borrow lines.

### Writing failure memory as bug reports

"We had a bug where X returned null when Y." That's a post-mortem. Failure memory generalizes: "The temptation to assume non-null was strong because — here's the pattern."

### Treating state-snapshot as permanent

If it's not true this week, update it this week. A stale state-snapshot is worse than no state-snapshot.

## After install: keeping it alive

See `CONTRIBUTING.md` and the inline guidance in `references/extension-guide.md` (if your template includes one).

Key habits:

- **Every round-2 review** that lands a new invariant → consider a doctrine entry
- **Every "we already tried that"** said twice → failure memory entry
- **Every "no, not like that — like this"** from the user → taste example
- **Every scar** → L6 entry
- **Every architecture pivot** → state-snapshot update + L1 audit

## Integration with Claude Code / Cursor / Codex

If you're using an agent runtime with persistent skill loading (Claude Code skills, Cursor rules, etc.), wire your doctrine skill into the runtime:

- **Claude Code:** Place at `docs/skills/<project>-doctrine/` or `.claude/skills/<project>-doctrine/` and reference from CLAUDE.md
- **Cursor:** Use `.cursor/rules/` to point at your SKILL.md
- **Codex:** Reference from AGENTS.md

Then enforce the protocol: a fresh session runs the bootstrap-prompt before any non-trivial work.

## When NOT to migrate

- Your project is < 1 month old → you haven't paid for enough lessons yet
- You have no accumulated failures → nothing to capture
- You're the only person / agent touching this project → a README is enough
- You're building for a one-time deliverable → doctrine has no future audience

## Closing

The install takes an afternoon. The discipline takes longer — the value is in using it *every session* until it's second nature. A doctrine that sits unread is just another file in your repo. A doctrine that gets consulted before every plan is the closest thing to institutional memory a distributed team (human + agents) can have.
