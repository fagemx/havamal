# Taste Examples

> **What "good" looks like, through contrast.** One good artifact, one bad artifact, and the project-specific reason good wins.

Adjectives are weak. Contrast pairs teach.

See [`docs/taste-examples.md`](../../../docs/taste-examples.md) in the project-doctrine repo for the full method.

---

## TE-1: <Situation name>

**Situation:** <what moment in the product / codebase / workflow is being decided>

**Good:**
<concrete artifact — code, copy, structure, UI state — not a description>

**Bad:**
<concrete artifact, seductively plausible — not a strawman>

**Why good wins:**
<project-specific reason. Reference L1 or L6 if possible. Not a generic best-practice.>

---

## TE-2: <Situation name>

**Situation:**

**Good:**

**Bad:**

**Why good wins:**

---

## TE-3: <Situation name>

**Situation:**

**Good:**

**Bad:**

**Why good wins:**

---

## Reference examples

> **TE-1: Confirmation reply after a user action**
>
> **Situation:** User just saved a draft via an inline button. The agent replies to acknowledge.
>
> **Good:**
> ```
> Draft saved.
> [Edit] [Discard]
> ```
>
> **Bad:**
> ```
> ✨ I've successfully saved your draft! Would you like me to set a reminder
> or share it with collaborators? Let me know what you'd like to do next.
> ```
>
> **Why good wins:**
> - L1: product is a quiet editor, not a chatty assistant. "Successfully" is corporate voice; emoji prefix is performative.
> - L6: the buttons *are* the next state; making them clickable beats asking a question.
> - The bad version turns a quiet completion into a menu.

> **TE-2: Where new surface-level features live**
>
> **Situation:** Adding a new callback for "mark as read."
>
> **Good:**
> - New `markItemRead` helper in `src/data/items-store.ts` mirroring lifecycle helpers (read → state check → mutate → atomic write)
> - `item_mark_read:` callback handler in the channel adapter, lock-wrapped, mirroring archive/settle
> - Zero prompt / renderer / type change
>
> **Bad:**
> - Add `markRead` hint to the LLM prompt so the model knows to emit a "mark read" intent
> - Parse intent from `AgentResponse`, route via new pipeline branch
> - Expand the main agent prompt with a new section
>
> **Why good wins:**
> - Violates producer/consumer split (L1) — model shouldn't own dispatch
> - Bad version reruns FM-1 (LLM-generated UI actions)
> - Good version reads like existing code (L3 method discipline)

---

## Anti-patterns

- **Strawman bad.** If the bad option is obviously wrong, the entry teaches nothing.
- **Multi-axis contrast.** If good and bad differ in ten ways, the reader can't identify the taste call. Change one axis.
- **Generic "why good wins."** If it could apply to any project, it's not teaching *this* project's school.
- **No situation.** Contrast pairs need grounding; a generic good/bad isn't a taste example, it's a style note.

## Maintenance

- Add when the user says "no, not like that — like this" and you think the distinction generalizes.
- Add when two PRs shipped and one got reverted — annotate why.
- Retire when the L1 / L6 that justified an entry changes.
- 3 entries is a strong v0. 10–20 is a mature taste file. Beyond that, you're probably mixing style with taste — split.

## Interaction with other layers

- L1 **ideology** = why the taste matters in principle
- Taste examples = what that principle looks like in practice
- L6 **heart methods** = the taste compressed into reflex, once internalized
- **Failure memory** = the scar that often sits behind a taste entry
