# L1 — Ideology

> **Durable convictions.** What must stay true about <project>. If these change, the project has shifted identity — announce loudly.

Each entry has:
- A claim (one line)
- A short justification (one sentence)
- A concrete test — how would you recognize a violation?

3–7 entries is healthy. More than 10, some are probably not actually durable — demote to L3 or L6.

---

## 1.1 — <Claim>

**Claim:** <The durable belief.>

**Why:** <One-sentence justification. What the project paid or committed to hold this true.>

**Violation test:** <A concrete situation where you would notice this being broken.>

**Example entry, for reference:**

> **Claim:** Producer/consumer split — semantic generation is the LLM's job; dispatch, trust boundaries, and state transitions are deterministic code's job.
>
> **Why:** We paid for this with v0.2 (SUPERSEDED): the model was allowed to emit button syntax. It turned every prompt regression into a UI regression. Never again.
>
> **Violation test:** A plan proposes that model output (text, JSON, tags) directly becomes a callback ID, URL path, or dispatch key.

---

## 1.2 — <Claim>

**Claim:**

**Why:**

**Violation test:**

---

## 1.3 — <Claim>

**Claim:**

**Why:**

**Violation test:**

---

## Anti-examples (don't put these in L1)

- **Operational conventions.** "We use TypeScript strict mode" → L3 or L4.
- **Preferences without weight.** "We like clean code" → too vague. What does clean mean *here*?
- **Current-state claims.** "We are pre-launch" → state-snapshot.
- **User preferences.** "User prefers squash commits" → memory.
- **Aspirations.** "We want to reach 10k users" → roadmap, not doctrine.

## Maintenance

- L1 should not grow quickly. If you keep adding to L1, the new entries are probably L3/L4/L6 in disguise.
- When L1 changes, update the `## Changelog` at the bottom. Don't silently edit.
- An L1 entry that has never been tested (no violation has ever threatened it) might be *implicit* rather than durable — consider deprecating.

---

## Changelog

- `YYYY-MM-DD` — Added `1.1: ...`. Reason: <why this became L1 rather than L3>.
- `YYYY-MM-DD` — Retired `1.X: ...`. Reason: <the belief is no longer durable because ...>.
