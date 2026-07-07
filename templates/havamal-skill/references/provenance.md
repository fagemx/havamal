# Provenance

> **Where the doctrine entries came from.** Transparency about origin helps readers judge durability and spot stale lineages.

Not every entry needs a provenance note — but load-bearing L1, L6, and failure-memory entries benefit from traceability.

---

## Why provenance

- An entry with unclear origin is harder to trust or retire
- A scar (L6) without a linked failure is suspect — provenance forces the link
- Future maintainers can tell what was validated through practice vs. borrowed from elsewhere
- Attribution matters if the doctrine goes public

---

## Format

```markdown
## L1.1 — <entry claim>

**Originated:** YYYY-MM-DD
**By:** <person / agent / session>
**Context:** <what was happening when this became doctrine>
**Evidence:** <commit, PR, thread, document that shows the lesson or justification>
**Status:** active / retired (YYYY-MM-DD)
```

---

## Example

> **L6.1 — Framing > model capacity**
>
> **Originated:** 2026-03-18
> **By:** Session reflection after a prompt-tuning week
> **Context:** Spent 6 days attempting to improve main-model output by adjusting prompt wording, adding few-shot examples, and trying larger models. Quality plateaued. Reframing the task (what the model was being asked to produce) solved it in one iteration.
> **Evidence:** `docs/retrospectives/2026-03-stage-2-framing-retro.md`, commit `abc1234`
> **Status:** active

> **FM-1: LLM-generated UI actions**
>
> **Originated:** 2026-02-25
> **By:** A superseded proposal's SUPERSEDE decision
> **Context:** v0.2 allowed the main agent prompt to emit button syntax. It shipped, then regressed: prompt changes broke the UI, button labels hallucinated, callback parsing inconsistent.
> **Evidence:** `docs/plans/superseded/2026-02-v0_2-button-syntax-SUPERSEDED.md`, revert commit `def5678`
> **Status:** active

---

## What needs provenance

| Entry type | Provenance needed? |
|---|---|
| L1 (ideology) | Yes — especially the original founding convictions |
| L2 (knowledge) | Implicit (the referenced doc is the provenance) |
| L3 (methods) | Yes — record which situation first validated it |
| L4 (SOPs) | Light — note the first 2–3 situations that recurred |
| L5 (thinking modes) | Sometimes — if a specific failure drove it |
| L6 (heart methods) | **Always** — the scar is the provenance |
| Failure memory | **Always** — a failure without provenance is a fiction |
| Taste examples | Light — reference the PR or discussion where the distinction emerged |

## What retired entries teach

When retiring an entry, keep the provenance record and mark it retired with a date and reason:

```markdown
## L1.X — <entry> (RETIRED 2026-05-01)

**Retired because:** <what changed to make this no longer durable>
**Replaced by:** <if a successor exists, link it>
```

Retired-but-preserved entries are valuable: they show the arc of the project's thinking, and they prevent new contributors from re-proposing already-rejected ideas.

---

## Anti-patterns

- **Provenance as credit.** This isn't about who "owns" an entry. It's about evidence and traceability.
- **Fabricated provenance.** If you're writing a doctrine cold (no real scars yet), don't invent origins. Mark entries as "borrowed from <source>" or "provisional."
- **Missing provenance on L6.** An L6 entry without a scar is a slogan. Either attach a scar or demote.
