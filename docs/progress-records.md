# Progress Records

> **Doctrine fixes how judgment is distilled.
> Progress recording is flexible.**

A common confusion when adopting Havamal: "do I need a state-snapshot AND a narrative log AND a decision record AND a provenance file?"

No. You need the smallest set of records that preserves the judgment you want to carry forward. This doc maps out the record types, what each one is for, and how they feed the doctrine.

---

## TL;DR

- **Different records serve different time scales.** State snapshot is "today." Handoff is "the next hour." Narrative log is "this week's arc." Decision record is "this settled question." Provenance is "where this doctrine came from."
- **Use the smallest record that preserves the needed judgment.** Not every update becomes doctrine.
- **The promotion path is fixed, not the format:** raw progress → narrative → decision → doctrine.
- **Solo / Team / Archaeology modes emphasize different records.** Match the record set to the mode.

---

## The core record types

They're listed in increasing time scale.

For long-running campaigns, execution state (which campaign is active, next
eligible unit, stop conditions) belongs to running software, not markdown:
use [edda](https://github.com/fagemx/edda). The retired hand-maintained
method is preserved in [`archive/`](archive/).

### 1. State snapshot — "right now"

**Purpose:** Let a new session quickly know what is currently true.

**Contains:**
- Current phase
- Shipped commits / PRs in the last few days
- Active blockers
- Next likely moves
- Stale docs that would mislead if read literally
- Current owner / current branch

**Does NOT contain:**
- Long narrative history
- Why things got here
- Full decision paths
- Heart methods

**Short, overwritable, low-narrative.** Update weekly or on state change. Dated header.

**It's a map of "where we are now," not a diary.**

### 2. Handoff — "the next session"

**Purpose:** Let the next session continue a specific in-flight task.

**Contains:**
- What I was just doing
- Which tests passed / failed
- Which branch
- The next command
- A pothole to watch

**Even more short-lived than state-snapshot.** A handoff is "pass the baton on a specific run." It doesn't carry doctrine.

**If you merge handoff and snapshot into one doc, handoff gets forgotten quickly.** Keep separate if both matter.

### 3. Narrative log — "one arc"

**Purpose:** Preserve how a judgment formed over a session or a short period.

**Contains:**
- How a direction got overturned
- How a concept sharpened
- How an agent misread at first and recovered
- Why the current frame is better than the previous one
- What words got redefined along the way

**Not as compressed as doctrine. Not as short as snapshot.** It's the **raw material** from which doctrine is later extracted.

Example:

```markdown
# Narrative Log: Renderer Producer/Consumer Split

At first, an earlier plan tried to let the assistant emit interactive
surface instructions directly in the reply. It looked attractive
because buttons felt conversational.

But it blurred a trust boundary: generated text would become UI
behavior.

The split became clear later:
- The second-stage LLM produces semantic blocks
- Runtime code renders interactive elements deterministically
- Channel adapters only consume trusted view models

Doctrine candidate:
LLMs produce semantic material. Runtime owns trusted action surfaces.
```

Narrative logs are especially valuable after **high-context long sessions** — that's where transformation happens, and transformation is what later compresses into L6.

### 4. Decision record — "a settled question"

**Purpose:** Record a specific decision plus the rejected alternative.

**Contains:**
- The decision
- The rejected alternative (named specifically, not a strawman)
- Why (the evidence or principle)
- Doctrine impact
- Evidence links

**More formal and shorter than a narrative log.** It's a verdict, not a story.

Especially useful in Team Mode — prevents re-litigating the same decision every few months.

Solo projects need decision records less often; one or two per architectural pivot is typical.

### 5. Provenance — "where doctrine came from"

**Purpose:** Link each durable doctrine entry back to its source.

**Contains:**
- L1 / L6 / failure-memory / taste entries
- Date added
- Source (session, PR, incident)
- Evidence (commit, PR#, retro doc)
- Status (active / retired)

Provenance is how future agents can tell the difference between **"we paid for this"** and **"someone wrote this once."** Essential for L6 entries and load-bearing failure-memory.

---

## The time-scale table

| Record | Time scale | Purpose |
|---|---|---|
| **State snapshot** | now | what is true today |
| **Handoff** | next session | how to continue a specific task |
| **Execution state** | campaign | active campaign, next eligible unit, stop conditions |
| **Narrative log** | one arc (session / week) | how a judgment formed |
| **Decision record** | durable decision | what was decided, what was rejected |
| **Provenance** | doctrine lifetime | where doctrine entries came from |

---

## Core / recommended / optional

Not every project needs every record.

### Core (almost always)

- `state-snapshot.md`
- `failure-memory.md`
- `taste-examples.md`
- L1 / L5 / L6

These are the **minimum viable doctrine**. Without them, the doctrine isn't doing its job.

### Strongly recommended

- `provenance.md`
- `bootstrap-prompt.md`
- `apprenticeship-check.md`

These make the doctrine **usable by agents** rather than just by the person who wrote it.

### Optional — match to mode and project

- `handoff.md` — if your workflow is session-to-session handoff-heavy
- `narrative-log/` (directory) — if you do long high-context sessions and want their transformation preserved
- `decision-records.md` — if your project has contested decisions worth formalizing (team mode leans on this)
- `incubation.md` — if you frequently encounter "might be doctrine, not sure yet" moments
- `weekly-retro.md` — if your team does regular retros and wants them linked to doctrine updates

Don't pre-populate all of these. Add a record file only when its absence is actually hurting.

---

## Which mode emphasizes what

The record set shifts with the usage mode.

### Solo Mode

**Heavy:**
- `narrative-log/` — you do long sessions; preserve the transformations
- L6 heart methods — you can extract L6 directly from narrative logs
- `state-snapshot.md`

**Light:**
- `decision-records.md` — formal DRs feel overkill for solo
- `governance.md` — not needed

**Why:** many solo doctrine entries start as stories ("I was trying X and realized Y"). Narrative log is the natural first capture. Doctrine entries get extracted from narrative logs during weekly sweeps.

### Team Mode

**Heavy:**
- `decision-records.md` — prevents re-litigation
- `provenance.md` — multi-person edits demand traceability
- `governance.md` — required
- `state-snapshot.md`

**Light:**
- `narrative-log/` — OK to have, but mark as `exploratory / not doctrine` so readers don't treat it as consensus

**Why:** teams need auditability more than they need transformation stories. A narrative-heavy team doctrine drifts toward being one person's memoir.

### Archaeology Mode

**Heavy:**
- `archaeology-report.md`
- `contribution-strategy.md`
- `review-risk-map.md`
- `evidence-log.md` (if needed) — link every inference to the PR / issue / comment that supports it

**Not applicable:**
- Your own narrative log — you're analyzing someone else's project, not your journey

**Why:** archaeology is inference; inference without evidence is speculation. Evidence density is what makes the output trustworthy.

---

## The promotion path

The point of having multiple record types isn't to track everything — it's to **channel raw events into doctrine** through a defined path.

```
Long session / PR / user correction / incident
   ↓
Narrative log  (raw transformation captured)
   ↓
Doctrine candidates  (incubation.md)
   ↓
Failure memory / taste examples / L6 / L1
   ↓
Provenance.md updated with origin
```

At each arrow, ask: is this ready to go further, or should it live at the current level a bit longer?

- If narrative log entries are piling up but nothing gets promoted, you're hoarding raw material.
- If doctrine is growing but provenance is empty, you're losing the audit trail.
- If provenance entries exist but point to missing evidence, the doctrine is technically present but rootless.

---

## Decision flow: where does this info belong?

When something new surfaces and you're not sure where to record it:

| It's… | Put it in |
|---|---|
| Current state only | `state-snapshot.md` |
| Something the next session needs to continue | `handoff.md` |
| How a judgment formed during a session | `narrative-log/<topic>.md` |
| A specific decision with a rejected alternative | `decision-records.md` |
| A recurring mistake pattern | `failure-memory.md` |
| A good/bad contrast pair | `taste-examples.md` |
| A durable principle with a violation test | L1 |
| A compressed lesson with a scar behind it | L6 |
| A pointer to where a doctrine entry came from | `provenance.md` |
| Something that might be doctrine, but not sure yet | `incubation.md` |
| Something that already lives in git and doesn't need refining | Leave in git |

If multiple rows could apply, pick the one the **reader** would need. A contributor scanning for "how do I plan this?" wants doctrine. A session resuming tomorrow wants handoff. Both can point at the same underlying event.

---

## Anti-patterns

- **Turning every session's end into a doctrine entry.** Most sessions produce no doctrine. A good narrative log is often enough.
- **Keeping doctrine but not state-snapshot.** Agents will operate on stale assumptions about what's shipped.
- **Narrative log with no promotion.** If nothing gets compressed into doctrine after months, the log is a journal, not a doctrine source.
- **Decision records that only repeat what was merged.** A DR without a named rejected alternative is just a PR body.
- **Provenance that handwaves the evidence.** "Based on team discussion" isn't evidence. Link the message, the PR, the commit.
- **Merging handoff into state-snapshot.** They decay differently; keep them separate when both matter.

---

## The governing principle

> **Use the smallest record that preserves the needed judgment.**
>
> 用能保存判斷的最小紀錄形式。

If state-snapshot is enough, don't write a narrative log. If a handoff is enough, don't write a decision record. If the information is already in git with enough context, don't copy it into doctrine.

**Doctrine is not an archive. It's the refined layer on top of an archive that git is already keeping.**

---

## What Havamal prescribes vs leaves open

**Havamal prescribes:**

- The six-layer structure (L1–L6)
- The promotion path (narrative → candidate → doctrine → provenance)
- The ethical boundary in Archaeology Mode
- The maintenance discipline (Keep / Promote / Archive / Delete)

**Havamal leaves open:**

- Whether you keep a narrative log at all
- Whether you use decision records
- Whether handoff lives in a file or in a chat pin
- Whether state-snapshot is weekly or event-driven
- Whether incubation is a file or a mental note

Match the format to your project's rhythm. What matters is that **raw events eventually become judgment**, not the specific ceremony by which they get there.

---

## Quick mode cheat-sheet

**Solo Mode** — what to actually maintain:
```
state-snapshot.md
layer-1-ideology.md
layer-5-thinking-modes.md
layer-6-heart-methods.md
failure-memory.md
taste-examples.md
bootstrap-prompt.md
narrative-log/  (loose, per-arc)
```

**Team Mode** — add:
```
provenance.md
decision-records.md
governance.md
```

**Archaeology Mode** — instead of the above, use per-target-project:
```
archaeology-report.md
contribution-strategy.md
review-risk-map.md
evidence-log.md  (optional)
```

---

## The short version

> **Havamal does not prescribe one progress-log format.
> It prescribes a promotion path: raw progress → narrative → decision → doctrine.**
>
> **Havamal 不規定進度一定怎麼記。
> 它規定的是：原始進度如何被提煉成判斷。**

That distinction is the whole point.

---

## Related

- [`maintenance.md`](maintenance.md) — once something is doctrine, how to keep it sharp
- [`six-layer-model.md`](six-layer-model.md) — what doctrine entries look like once promoted
- [`solo-mode.md`](solo-mode.md) — mode-specific record emphasis (narrative-heavy)
- [`team-mode.md`](team-mode.md) — mode-specific record emphasis (DR-heavy)
- [`archaeology-mode.md`](archaeology-mode.md) — evidence-heavy
- Chinese version: [`progress-records.zh.md`](progress-records.zh.md)
