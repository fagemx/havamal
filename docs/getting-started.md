# Getting Started — Minimum Viable Doctrine (MVD)

> **30 minutes. 4 files. One runtime wire-up. Stop there.**
>
> _The first doctrine does not need to be complete. It only needs to save the next session._

This doc builds a **Minimum Viable Doctrine (MVD)**. The repo has a lot of methodology — you don't need all of it to start. You need the four files that let an agent load the project's stance, and a one-line reference in your runtime config.

## What MVD is

A Minimum Viable Doctrine is **the smallest set of files that can help a future agent avoid repeating your context loss.**

It is **not complete.** It is **useful.**

It contains exactly:

1. `state-snapshot.md` — where the project is now
2. `layer-1-ideology.md` — what must stay true
3. `failure-memory.md` — what mistakes should not repeat
4. `bootstrap-prompt.md` — how the next agent should load the project

If you follow this guide in order, you'll have an MVD in half an hour. If you try to do the "full" version on day 1, you'll stall — most doctrines that fail, fail because they were too comprehensive on day 1, not because they were too thin.

**Start with MVD. Expand only when absence hurts.**

---

## Before you start: am I ready?

Three quick checks. If you answer NO to any, come back later:

- [ ] My project has a working skeleton (not just an idea — real shipped code)
- [ ] I have at least one concrete memory of "an agent misunderstood this project" or "I keep re-explaining the same thing"
- [ ] I can name at least one tempting-but-wrong direction my project has refused

All three yes → continue. Otherwise see [`when-to-use.md`](when-to-use.md) for the full readiness rubric.

---

## Step 1 — Pick your mode (2 min)

Answer one question:

**Who edits the doctrine?**

- **Just me (+ AI agents)** → Solo Mode
- **Multiple humans (+ AI agents)** → Team Mode
- **I'm analyzing someone else's project, not building one** → Archaeology Mode (see [`archaeology-mode.md`](archaeology-mode.md) — different path, stop reading this doc)

This guide assumes Solo or Team Mode. Team Mode adds 2 extra files at Step 3; otherwise the steps are identical.

---

## Step 2 — Copy the template (1 min)

```bash
cp -r <path-to-project-doctrine>/templates/havamal-skill ./docs/skills/<your-project>-doctrine
```

Windows:

```powershell
xcopy /E /I <path-to-project-doctrine>\templates\havamal-skill docs\skills\<your-project>-doctrine
```

Don't worry about the full file list. You'll fill in four files now and leave the rest alone.

Full per-runtime placement options: [`install.md`](install.md). The default `docs/skills/` path works everywhere.

---

## Step 3 — Fill four files, in order (25 min)

### File 1: `state-snapshot.md` (5 min)

Open `references/state-snapshot.md`. Write, in plain language:

- **Last reviewed:** today's date
- **Current phase:** one or two sentences about what's shipped and what you're working on now
- **Recently shipped:** last 3 meaningful things with dates
- **Actively in progress:** 1–3 bullet items
- **Hard boundaries:** anything you know you won't do this phase
- **What to ignore:** any old docs / framings that are no longer current

Stop there. Don't try to be comprehensive. One screen is enough.

### File 2: `layer-1-ideology.md` (7 min)

Open `references/layer-1-ideology.md`. Write **3 entries**, each with:

- **Claim:** one sentence about what must stay true for this project
- **Why:** one sentence about what you paid (or commit) to hold this true
- **Violation test:** one sentence about how you'd recognize this being broken

If you can't write 3, write 2. If you can only write 1, that's fine — add more when you feel them.

**What to NOT do:** don't write generic values like "we prioritize quality" or "we care about users." Write specific claims: "LLM output is a proposal, never a commit." If your entry could apply to any project, delete it.

### File 3: `failure-memory.md` (10 min)

Open `references/failure-memory.md`. Write **3 entries**, each with four fields:

- **Temptation:** written in the voice of the agent who would make the mistake
- **How it failed:** concrete symptoms, bullet points
- **Future detection:** what pattern a future agent should watch for
- **Correct move:** the doable substitute

Pick your three most-recurring frustrations. "An agent keeps trying X when they should try Y" is a perfect starter entry.

### File 4: `bootstrap-prompt.md` (3 min)

Open `references/bootstrap-prompt.md`. Replace `<project>` with your project name everywhere. This file is a copy-paste loader — edit the template in place, you're done.

---

## Step 4 — Wire it into your runtime (2 min)

Open your runtime's config file (CLAUDE.md / AGENTS.md / GEMINI.md / `.cursor/rules/*`). Add:

```markdown
## Havamal

This project has a Havamal at `docs/skills/<your-project>-doctrine/SKILL.md`.

**Before any non-trivial work**, read the load protocol:
1. `docs/skills/<your-project>-doctrine/references/state-snapshot.md`
2. `docs/skills/<your-project>-doctrine/references/layer-1-ideology.md`
3. `docs/skills/<your-project>-doctrine/references/failure-memory.md`

Do NOT summarize the doctrine back. Enter the posture.
```

That's the entire wire-up. The moment an agent starts a session and reads the config, it will load the doctrine before non-trivial work.

---

## Step 5 — Test it (5 min)

Start a fresh agent session (new terminal, new Claude Code window, whatever). Say:

> "Read the project doctrine, then tell me the current state, one durable conviction, and one tempting mistake we've seen."

A working doctrine produces a project-specific answer. A doctrine that's too generic will produce generic fluff — that's a signal your three L1 entries or three failure-memory entries aren't specific enough yet. Revise.

---

## You're done

That's the minimum viable doctrine. You now have:

- A living state snapshot
- 3 durable convictions
- 3 tempting mistakes captured
- A bootstrap prompt
- Runtime wired up

Your next session will feel different. Not because the doctrine is complete — because the agent now has a stance to enter.

---

## What NOT to do on day 1

Do NOT create these files on day 1 unless the specific criterion is met:

- **L2 (knowledge)** — unless the project has many authoritative source docs that agents keep misreading
- **L3 (methods)** — unless a method has been validated across ≥ 2 situations
- **L4 (SOPs)** — unless a repeated procedure has recurred 3+ times
- **L5 (thinking modes)** — unless you can name a reasoning posture you actively use
- **L6 (heart methods)** — unless real scars exist. No scar, no L6.
- **taste-examples** — unless you have concrete good/bad pairs in mind
- **apprenticeship-check** (custom version) — template default works for v0
- **provenance** — unless doctrine entries have been promoted and need traceability
- **governance** (Team Mode) — unless there is a team AND it needs owners
- **decision-records** (Team Mode) — unless decisions actually need review
- **incubation** — unless you already have candidates waiting

If the absence of a file isn't actively hurting you, leave it empty.

### Do not create doctrine debt

The opposite failure mode of "not enough doctrine" is **doctrine debt** — files full of empty words, L6 entries without scars, taste examples that are just style rules. Debt is worse than absence because:

- Future agents waste attention reading low-signal content
- The doctrine loses credibility ("why are these entries here?")
- Maintenance cost grows without maintenance value

**Never fill a template slot just because it exists.** An empty file with a comment "populate when X happens" is better than a file full of placeholder convictions.

If you can't write an entry with concrete specificity, it's not ready.

---

## Expansion path — next few weeks

Add things only when you feel the absence. Typical pacing:

### Week 1
- Add 1–2 `layer-5-thinking-modes.md` entries (reasoning postures you catch yourself using)
- Add 3 `taste-examples.md` entries when your next "no, not like that" moment happens

### Month 1
- Add 1–3 `layer-6-heart-methods.md` entries — one per real scar earned this month
- Add `provenance.md` entries for the L6 entries so the scars are traceable
- Write a real `apprenticeship-check.md` (the template's default 6 questions often works as-is)

### When you feel the absence
- `layer-2-knowledge.md` — when you realize agents keep reading stale docs. Point them at canonical.
- `layer-3-methods.md` — when you have a method you've validated across ≥ 2 situations.
- `layer-4-sops.md` — when a specific procedure recurs for the 3rd time.
- `handoff.md` — when session-to-session continuity gets messy.
- `execution-state.md` — when a long-running campaign has many small packages and the operator cannot track the larger direction from state-snapshot alone.
- `narrative-log/` — when your long sessions contain transformations worth preserving.
- `incubation.md` — when you keep having "might be doctrine, not sure yet" moments.

### Team Mode only (if applicable)
- `governance.md` — when the team needs owners / review cadence
- `decision-records.md` — when you have your first contested-but-settled decision

**The rule:** add a file when its absence is a real problem, not because the template has a slot for it.

---

## For the agent setting this up

If a user asks you to "set up project-doctrine" or "build a doctrine for this project":

1. **Check readiness first** (the three Yes/No questions above). If any NO, say so and recommend waiting.
2. **Identify mode** (one question: who edits this?). Don't elaborate on all three modes.
3. **Default to the 4-file minimum.** Do NOT walk the user through all 14 files.
4. **Write the entries WITH the user**, not FOR the user. The entries must come from their experience, not from generic templates.
5. **Stop when the 4 files are usable.** The doctrine is now live.
6. **Explicitly name what you did NOT do.** Say: "I left L5/L6/taste-examples/etc empty on purpose. Add them when you feel the absence."
7. **Test with the user's own project context.** Run the apprenticeship question ("what's current, what's durable, what's a tempting mistake") to verify the doctrine fires.

**The failure mode to avoid:** overwhelming the user with a 14-file template and 10 methodology docs on day 1. A minimum viable doctrine in 30 minutes beats a comprehensive one in 3 weeks that never ships.

---

## When to expand

The doctrine is a living document. You'll know it's time to add a file when:

- You catch yourself thinking "I wish there was somewhere to record this"
- Your state-snapshot keeps growing because you have nowhere else to put things
- An agent misreads the doctrine in a way a new layer would catch
- A long session produced material that's more than state-update but less than doctrine

**That's the signal.** Not "the template has a slot, fill it."

---

## Related

- [`when-to-use.md`](when-to-use.md) — full readiness check (before you start)
- [`install.md`](install.md) — detailed install (per-runtime paths, builder skill)
- [`migration-guide.md`](migration-guide.md) — the comprehensive version of the bootstrap (if you want the full walkthrough)
- [`everyday-use.md`](everyday-use.md) — how to use the doctrine once installed
- [`progress-records.md`](progress-records.md) — when to add which optional record type
- [`maintenance.md`](maintenance.md) — how to keep the doctrine sharp as it grows
- Chinese version: [`getting-started.zh.md`](getting-started.zh.md)

---

## One-liner

> **The minimum viable doctrine is 4 files and 30 minutes.
> Ship that, then expand only when you feel the absence of a file.**
