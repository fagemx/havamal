---
name: havamal-builder
description: Teaches you how to build a Havamal skill for a given project. Use when a project has accumulated enough judgment that handoffs are no longer sufficient and a 6-layer doctrine is the right response.
---

# Havamal Builder

This skill teaches how to build a Havamal skill for your project. It is a **meta-skill**: it doesn't load a specific project's posture — it guides you through creating one.

**Announce at start:** "I'm using the havamal-builder skill to design the doctrine for <project>."

## When to use

Use this skill when:

- A project has been running ≥ 1 month with real failures
- Multiple agents or sessions work on the project
- You've caught yourself re-explaining the same convictions to fresh sessions
- A handoff doesn't carry enough context to let a new agent judge well
- The user is asking "how do I preserve what we've learned here?"

Do NOT use this skill for:

- Day-1 projects (you haven't paid for enough lessons yet)
- Projects with no recurring agent work
- One-off tasks (doctrine has no future audience)
- Projects where a README or CLAUDE.md is sufficient

## First ask: which of three modes?

Before building anything, clarify:

- **Solo Mode** — one primary builder + one or more AI agents. Low ceremony. Personal voice OK. Updates without PRs.
- **Team Mode** — multiple human contributors (plus agents). Governance required. Failure memory de-personalized. Two extra files: `governance.md` and `decision-records.md`.
- **Archaeology Mode** — *entering* an existing project (open-source, legacy, inherited). Inferring doctrine from public PRs, issues, reviews. **Ethically bounded: analyze decisions, not personalities.** Different output set: archaeology-report, contribution-strategy, review-risk-map.

The six-layer structure is shared across all three; what differs is origin (do I build it or infer it?), ceremony (solo vs team), and ethical boundary (archaeology's public-decisions-only rule).

See `docs/solo-mode.md` / `docs/team-mode.md` / `docs/archaeology-mode.md` in the project-doctrine repo for detail.

If unclear, ask: "Are you building doctrine for a project you're inside (solo / team), or inferring doctrine for a project you're entering (archaeology)?"

## What you produce

By the end of using this skill, you should have:

```
docs/skills/<project>-doctrine/   (or .claude/skills/<project>-doctrine/)
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

Not all files need to be fully populated on v0 — see `references/templates.md` for per-file minimum viable content.

## References

- [`references/doctrine-model.md`](references/doctrine-model.md) — the conceptual model (what doctrine is, what it isn't)
- [`references/layer-guide.md`](references/layer-guide.md) — per-layer "what belongs here, what doesn't"
- [`references/failure-memory-guide.md`](references/failure-memory-guide.md) — how to write failure-memory entries
- [`references/taste-examples-guide.md`](references/taste-examples-guide.md) — how to write taste-example entries
- [`references/apprenticeship-protocol.md`](references/apprenticeship-protocol.md) — the 6-question check
- [`references/templates.md`](references/templates.md) — the full template set for copy-paste

## Default: Minimum Viable Doctrine (MVD)

**Do NOT walk the user through all 14 files on day 1.** That is the most common failure mode for this skill.

**Default to MVD. Full doctrine is opt-in.**

A **Minimum Viable Doctrine (MVD)** is 4 files + runtime wiring, in 30 minutes. See [`docs/getting-started.md`](../../docs/getting-started.md) for the canonical path. Follow it. Don't improvise.

### Agent output format (use this verbatim)

When a user asks you to "build a doctrine" / "set up project-doctrine" / similar, your **first reply** should be something like:

> I'll start with **Minimum Viable Doctrine (MVD)**, not the full template.
>
> I'll create only:
> 1. `state-snapshot.md`
> 2. `layer-1-ideology.md`
> 3. `failure-memory.md`
> 4. `bootstrap-prompt.md`
>
> I'll leave the rest empty until their absence becomes a real problem.

Then proceed with the 30-minute path. Do NOT start scaffolding the full 14-file template before the user explicitly asks for it.

### Two anti-debt rules

Apply both when writing entries with the user:

1. **No scar, no L6.** If the user can't name a specific failure behind a proposed L6 entry, don't write it. Leave L6 empty or incubate the candidate.
2. **No generic values in L1.** If a proposed L1 entry could apply to any project ("we care about quality," "users come first"), reject it. Push for project-specific claims with violation tests.

Better to leave a file empty than to fill it with doctrine debt.

### The 4-file minimum (always)

1. `state-snapshot.md` — current state, 1 screen
2. `layer-1-ideology.md` — 3 entries with violation tests
3. `failure-memory.md` — 3 four-field entries
4. `bootstrap-prompt.md` — runtime loader (template, just replace placeholders)

Stop there. Wire it into CLAUDE.md / AGENTS.md / GEMINI.md. Test with a fresh session. Done.

### What NOT to do on first pass

- L5 thinking modes → leave empty, add in week 1
- L6 heart methods → ONLY if the user can name a concrete scar. Otherwise leave empty.
- Taste examples → leave empty unless the user has an obvious good/bad pair
- L2 / L3 / L4 → leave empty
- Provenance → leave empty; add the first time an L6 entry gets promoted
- Apprenticeship check → leave as template default (6 questions work as-is)
- Governance / decision-records → ONLY if Team Mode AND contested decisions already exist
- Archaeology templates → only for Archaeology Mode (different path)

### When to walk through more files

Walk through additional files only if:
- The user explicitly asks for a comprehensive setup
- You've completed the 4-file minimum AND the user asks "what's next"
- A specific file's absence is actively hurting the user right now

Default answer to "should we also set up X?": **"Not today. Add it when its absence hurts."**

### The full bootstrap process (only when explicitly requested)

If the user wants the comprehensive version beyond minimum viable:

1. **Observe.** Review recent PRs, CLAUDE.md, retros. Notice patterns the user re-explains.
2. **State-snapshot first.** Easiest, highest-value externalization.
3. **L1.** 3–5 durable convictions with violation tests.
4. **L6** (if scars exist). One entry per real scar.
5. **3 failure-memory entries.** Most-repeated temptations.
6. **3 taste examples.** Recent "no, not like that" moments.
7. **L2 as index.** Point at authoritative docs.
8. **L5 (thinking modes).** 2–4 stable postures.
9. **Apprenticeship check** — customize 6 questions.
10. **Bootstrap prompt** — runtime loader.
11. **L3 / L4** can start empty. Populate as methods validate and SOPs recur.

## Critical rules

- **No scar, no L6.** If a proposed L6 entry has no concrete failure origin, reject it.
- **L3 requires validation.** Methods go in L3 only after they've worked in your project.
- **State-snapshot is dated.** Undated snapshots rot silently.
- **L1 is conservative.** If you're adding L1 entries weekly, most aren't actually durable.
- **Taste examples are contrast pairs.** A single "this is good" isn't a taste example.
- **Do NOT let the user treat the doctrine as lore.** It's a working document. It changes as the project changes.

## Voice

- Short sentences
- Declarative, not exploratory
- Bilingual is fine if the project is bilingual
- No motivational slogans
- Examples > adjectives
- Each entry should be readable in under a minute

## How to run this skill

When the user asks you to apply this skill:

1. Announce ("I'm using the havamal-builder skill...")
2. Confirm the project is ready (3 yes/no questions from `docs/getting-started.md`)
3. Identify mode (one question: "who edits the doctrine?")
4. Default to the **minimum viable 4-file path**. Walk through Step 1–5 of `docs/getting-started.md`, not the full bootstrap.
5. Write the entries WITH the user, not FOR the user. Entries come from their experience.
6. Stop when the 4 files are usable AND wired into runtime config.
7. Explicitly name what you did NOT do: "I left L5 / L6 / taste-examples / etc empty on purpose. Add them when you feel the absence."
8. Test with the user's own project context. Use the apprenticeship question ("what's current, what's durable, what's a tempting mistake") to verify the doctrine fires.

## Completion criteria

### Minimum viable (default target)

- [ ] `state-snapshot.md` is dated and covers current phase + recent + active + hard boundaries
- [ ] `layer-1-ideology.md` has ≥3 entries, each with claim + why + violation test
- [ ] `failure-memory.md` has ≥3 four-field entries
- [ ] `bootstrap-prompt.md` has placeholders replaced with project name
- [ ] Runtime config (CLAUDE.md / AGENTS.md / GEMINI.md) references the load protocol
- [ ] A fresh agent session can answer "current state, one durable conviction, one tempting mistake" project-specifically

**That is v0-done.** Stop and ship.

### Full (only when explicitly requested)

- Above, plus:
- [ ] `layer-5-thinking-modes.md` has ≥2 entries
- [ ] `layer-6-heart-methods.md` has ≥1 entry with a scar (or explicitly empty with a note)
- [ ] `taste-examples.md` has ≥3 contrast pairs
- [ ] `apprenticeship-check.md` has 6 customized questions (template default may be fine)
- [ ] `provenance.md` links L6 entries to their scars
- [ ] `governance.md` + `decision-records.md` (Team Mode only)

After v0, the doctrine grows with the project. Weekly maintenance beats occasional rewrites — but that's the user's job, not the bootstrap's.

## One-sentence principle

> **Do not summarize the project. Extract the school.**
