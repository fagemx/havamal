# L6 — Heart Methods (心法)

> **Compressed lessons from scars.** One line, one scar, one trigger.
>
> **If there is no failure behind it, it does not belong in L6.**

Heart methods are the last line of defense when deliberation fails. They fire as reflex, mid-task. Each one is short enough to recite from memory and specific enough to trigger the right question.

---

## 6.1 — <Maxim>

**Scar:** <what specific failure earned this lesson>

**Triggers when:** <the situation where this maxim should fire>

---

## 6.2 — <Maxim>

**Scar:**

**Triggers when:**

---

## Reference examples

> **6.1 — Framing > model capacity**
>
> **Scar:** Spent a week tuning the main LLM prompts trying to improve output quality before realizing the framing (what we were asking the model to produce) was wrong. No amount of prompt tuning fixes a wrong frame.
>
> **Triggers when:** Output quality is disappointing and the impulse is to try a bigger model / more examples / more explicit instructions. First ask: is the frame right?

> **6.2 — 減法比加法難**
>
> **Scar:** Prompts are zero-sum. Adding a new rule means diluting attention from every existing rule. We added safety rules until the safety rules themselves degraded L4×B (canonical persona). Removed 4, quality recovered.
>
> **Triggers when:** You're about to add a rule to a prompt. First ask: what existing rule becomes weaker if this is added?

> **6.3 — Hard ban is discipline, not reminder**
>
> **Scar:** Added "never output X" to a prompt, thinking the model would remember. Model didn't. Added stronger wording. Still didn't. Finally realized: the pattern had to be *architecturally* unreachable, not just discouraged.
>
> **Triggers when:** The fix to an unwanted behavior is "tell the model not to do it harder." Probably wrong answer. Make it structurally impossible.

> **6.4 — Data-layer hardness before UX expansion**
>
> **Scar:** Shipped UX (feature v0.1) before hardening the store layer (idempotency). Stale-button double-click exposed a duplicate-event bug. Would have been painful at 10x the entry points. Fixed store first before widening UX.
>
> **Triggers when:** A UX expansion plan lands while a store/data-layer gap is known. Close the gap first.

> **6.5 — One source of truth beats three out-of-sync ones**
>
> **Scar:** Tried to track important project decisions in agent memory, in prompts, and in architecture docs simultaneously. Each drifted. The one that survived was the single canonical document — the copy everyone, human or agent, reads before acting.
>
> **Triggers when:** Decision-state is sprawling across memory, logs, and prose. Pick one canonical document and make everyone (human and agent) read the same copy.

---

## Anti-patterns

- **Slogans without scars.** "Move fast and break things" is not L6 here. It's vibe, not lesson.
- **Borrowing someone else's L6.** If the scar isn't yours, the reflex won't fire.
- **Values masquerading as lessons.** "Be honest with the user" is a value (L1 maybe). L6 is "we tried hiding X and paid Y; now we don't."
- **Growing without pruning.** If L6 has 40 entries, most aren't firing. Keep only the ones that actually trigger in real work.

## Bilingual entries

L6 often compresses better in a non-English phrase (Chinese idioms, Japanese 心法, etc.) because the source language packs a concept tighter. If bilingual fits your team, use it. If not, don't force it.

## Maintenance

- **Add** only after the scar has been earned. Writing L6 entries to document not-yet-failures is fabrication.
- **Retire** only if the lesson turns out to be wrong. Don't prune for tidiness.
- Each entry should be one-sentence-readable. If you need a paragraph to explain the maxim, it's too abstract.

## How to know if an L6 entry is working

- It triggers mid-task without conscious recall
- Other team members / agents cite it in conversation
- New scars confirm it (rather than contradict)
