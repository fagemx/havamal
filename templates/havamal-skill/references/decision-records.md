# Decision Records (Team Mode Only)

> **Team mode only.** Solo projects can delete this file.
>
> A lightweight decision-record log for doctrine-adjacent decisions. NOT a full ADR system — focused specifically on judgments that shaped the doctrine itself or that rejected a tempting alternative.

---

## When to write a decision record

Write a DR when:

- A doctrine entry was added AND the team considered a specific alternative that was rejected
- A contentious architectural choice produced a new L1 / L6 entry
- A retro concluded "this was tempting, here's why we refused it"
- A proposed doctrine entry was rejected (the rejection itself is worth recording)

Do NOT write a DR for:

- Routine state-snapshot updates
- L2 pointer additions
- Trivial SOP additions
- Decisions that don't touch the doctrine

---

## Format

```markdown
## DR-N: <Short decision name>

- **Date:** YYYY-MM-DD
- **Decision:** <One sentence — what was chosen>
- **Rejected alternative:** <One sentence — what was considered and not chosen>
- **Why:** <2–4 sentences — the evidence or principle that drove the choice>
- **Doctrine impact:**
  - <new/modified L1 entry>
  - <new failure-memory entry>
  - <retired entry, if any>
- **Evidence:** <commit, PR, retro, incident>
```

---

## Example

```markdown
## DR-12: Renderer Is Consumer-Only

- **Date:** 2026-04-19
- **Decision:** The renderer is a deterministic view-model consumer. LLMs produce semantic blocks; the renderer does not parse LLM text for dispatch tokens.
- **Rejected alternative:** An earlier proposal — the agent-response type emits dispatch-token fields; renderer parses buttons from the response text via fence markers.
- **Why:** The rejected approach blurred the trust boundary. Every LLM prompt regression became a UI regression. Callback data parsing was unreliable (~5% error rate on quoting). We concluded that producer/consumer separation is architecturally safer than any amount of prompt tuning.
- **Doctrine impact:**
  - Added L1.2 (producer/consumer split)
  - Added FM-1 (LLM-generated UI actions)
  - The rejected proposal moved to `docs/plans/superseded/`
- **Evidence:** The superseded proposal doc, commit `abc1234` (revert), retro at `docs/retrospectives/2026-02-renderer-decision.md`
```

---

## What goes in "rejected alternative"

The alternative should be:

- Something genuinely considered, not a strawman
- Named specifically enough that future contributors understand what was rejected
- Stated with enough fidelity that someone tempted to reintroduce it would recognize the DR

"We decided not to over-engineer" is not a rejected alternative. "We decided not to add a v1/v2 migration framework before we had v1 data" is.

---

## How DRs interact with failure memory

A DR and a failure-memory entry can cover the same decision, but they serve different readers:

- **DR:** "We considered A vs B; we chose A; here's the reasoning with evidence." For team members who want audit trail.
- **Failure memory:** "A future plan might re-propose B; here's how to recognize the trap." For future agents pattern-matching against plans.

Not every DR needs a failure memory entry (the rejected alternative might not be tempting enough to recur). Not every failure memory entry needs a DR (some patterns were never formally considered).

---

## Maintenance

- DRs are append-only. Don't edit a DR after it's merged — if the decision changes, write a new DR that supersedes the old one.
- Obsolete DRs should be marked superseded (with date and link to the superseding DR), not deleted.
- Quarterly review: the steward checks whether any DRs describe decisions the team has quietly drifted away from. Either realign with the DR, or write a superseding DR.

---

## Anti-patterns

- **Writing DRs for every PR.** Not every decision is doctrine-adjacent. Save DRs for judgments that shaped the doctrine.
- **Writing DRs as marketing.** The audience is future team members trying to avoid re-litigating. Not external stakeholders.
- **Revisionist DRs.** A DR written years after the fact, claiming the team "had always believed X," is lying. Write it when the decision happens.
- **DRs without evidence.** "We decided X because we thought it was best" is not a DR. Name the evidence.
- **DRs that only record wins.** A decision to try something that later failed is worth recording too. The failure becomes evidence for the next DR.

---

## Starter DRs most projects accumulate

In a long-running project, DRs tend to cluster around:

- **Trust boundary decisions** (who is allowed to decide what — often the LLM-vs-runtime question)
- **Testing philosophy** (mocking policy, real-vendor smoke, integration-first)
- **Scope discipline** (what the project refuses to be)
- **Deprecation decisions** (why an old subsystem was retired)
- **Architecture splits** (monolith → services, or vice versa, and the evidence)

If your project has made any of these decisions and not recorded them, that's where to start.
