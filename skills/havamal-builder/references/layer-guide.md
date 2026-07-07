# Layer Guide

A per-layer "what belongs here / what doesn't" reference. When helping a user build their doctrine, this guide tells you where to place each piece of content.

For the full model, see [`docs/six-layer-model.md`](../../../docs/six-layer-model.md) in the project-doctrine repo. This file is the builder's quick-reference.

---

## state-snapshot — volatile current state

**Goes in:**
- Current phase of the project
- Last 3–5 shipped things with dates
- Actively in-progress work
- Blockers / deferrals
- Hard boundaries for this phase
- What to ignore (stale frames)
- Pointers to currently-authoritative architecture docs
- Recent open questions

**Does NOT go in:**
- Anything older than a few weeks
- Roadmap promises
- Aspirations
- Detailed rationale (use plans for that)

**Rule:** if it's not true this week, update it this week.

---

## L1 — Ideology

**Goes in:**
- Durable convictions about what the project is
- Trust boundaries (who/what decides what)
- Non-negotiables
- Identity claims (what we are and are not)

**Does NOT go in:**
- Operational conventions ("we use TS strict") → L3/L4
- Preferences without weight → specify more
- Current-state claims → state-snapshot
- User preferences → memory, not doctrine
- Aspirations → roadmap
- Style rules → style guide

**Rule:** each L1 entry must have a **violation test** — a concrete situation where you'd recognize it being broken.

**Healthy size:** 3–7 entries.

---

## L2 — Knowledge

**Goes in:**
- Pointers to authoritative docs (with paths and dates)
- Reading ladder for fresh sessions
- Source-of-truth map for common questions
- Superseded docs (explicitly marked as retired, not deleted)

**Does NOT go in:**
- Explanations of what a doc says
- Generic software practices
- Architecture content (lives in the referenced doc)
- Facts about users / individuals → memory

**Rule:** L2 is an **index**, not a mirror.

**Healthy size:** 10–20 pointers.

---

## L3 — Methods

**Goes in:**
- Planning / review / implementation methods that have been *tested in this project*
- Each with a concrete example showing it worked

**Does NOT go in:**
- Aspirational methods ("we should do X") → experiments file
- Generic best practices → blog post, not doctrine
- One-off procedures → plan doc
- Methods without a failure mode (untested methods have no known failure mode)

**Rule:** if you haven't used it AND it worked, it's not L3 yet.

**Healthy size:** 5–15 entries, growing slowly.

---

## L4 — SOPs

**Goes in:**
- Concrete recipes for situations that recur 3+ times
- Each with trigger, steps, done-when, common failure mode

**Does NOT go in:**
- "How to think about X" → L5
- One-shot procedures → plan doc
- Generic how-tos → not project-specific

**Rule:** a situation needs to recur 3 times before it earns an SOP.

**Healthy size:** 3–10 entries.

---

## L5 — Thinking Modes

**Goes in:**
- Real-time reasoning postures
- Metacognitive self-checks
- Posture switches (e.g., "this is a taste question, slow down")

**Does NOT go in:**
- Methods with concrete steps → L3
- Rules / bans → L1 or FM
- Platitudes without trigger or test

**Rule:** each mode has a **trigger** (when to enter) and a **drop signal** (how to notice you've lost it).

**Healthy size:** 3–7 entries.

---

## L6 — Heart Methods

**Goes in:**
- Compressed lessons from real scars
- One line, one scar, one trigger
- Bilingual OK if it compresses tighter

**Does NOT go in:**
- Slogans without scars → reject
- Borrowed maxims from elsewhere → reject (reflex won't fire)
- Values → L1
- Methods → L3

**Rule:** **no scar, no L6.** Every entry must name the specific failure that earned it.

**Healthy size:** 3–15 entries, accrued over time.

---

## failure-memory

**Goes in:**
- Tempting-but-wrong patterns the project has paid for
- Each with four fields: temptation / how it failed / future detection / correct move

**Does NOT go in:**
- Bug reports (too specific)
- Shame / blame entries
- Vague cautions ("be careful with X")

**Rule:** each entry must have a **detection heuristic** — a pattern a future agent can match against a new plan.

**Healthy size:** 5–25 entries.

---

## taste-examples

**Goes in:**
- Concrete good/bad pairs for project-specific situations
- Each with situation, good artifact, bad artifact, why-good-wins (project-specific reason)

**Does NOT go in:**
- Style-guide rules (use tabs vs spaces)
- Strawman "bad" options
- Single "this is good" entries without contrast

**Rule:** **contrast > prose**. Good and bad must differ in ONE axis.

**Healthy size:** 3–15 entries.

---

## apprenticeship-check

**Goes in:**
- The 6 customized questions for this project
- Sample good answer
- Sample bad answer
- Pass / fail criteria

**Does NOT go in:**
- A long list of trivia questions
- Questions that could be answered without reading the doctrine
- Questions the doctrine doesn't actually answer

**Rule:** the check tests the doctrine AND the agent. If agents routinely fail, fix the doctrine first.

---

## bootstrap-prompt

**Goes in:**
- The full copy-paste session-start loader
- The short mid-session refresher
- Integration hints (CLAUDE.md, AGENTS.md, etc.)

**Does NOT go in:**
- The full doctrine content (just pointers)
- Multiple loaders for different tasks (keep it simple)

**Rule:** prompt should fit in one message and load the agent in under 3 minutes.

---

## provenance

**Goes in:**
- Where each L1 / L6 / FM entry originated (date, context, evidence)
- Status (active / retired)

**Does NOT go in:**
- Personal credit ("so-and-so's idea")
- Provenance for trivial entries (L4 SOPs don't each need provenance)

**Rule:** L6 without provenance is suspect. Every L6 entry should have a traceable scar.

---

## When content doesn't fit any layer

Options:

1. **It's memory, not doctrine.** → Put it in user/project memory instead.
2. **It's architecture, not doctrine.** → Put it in `docs/specs/`.
3. **It's handoff, not doctrine.** → Put it in a plan doc or a session-end note.
4. **It's aspirational, not validated.** → Park it in an `experiments/` file.
5. **It's truly orthogonal.** → Maybe you need a new layer. Propose it, but be skeptical — most "new layer" intuitions are actually one of the above.

## The "which layer?" decision flow

```
Is it about current state? ──────────── state-snapshot
Is it a durable belief? ──────────────── L1
Is it a pointer to a longer doc? ────── L2
Is it a validated method? ─────────────── L3
Is it a procedure for a recurring situation? ──── L4
Is it a reasoning posture? ────────────── L5
Is it a compressed lesson with a scar? ──── L6
Is it a tempting mistake? ────────────── failure-memory
Is it a good/bad contrast pair? ────────── taste-examples
None of the above ────────── probably not doctrine
```
