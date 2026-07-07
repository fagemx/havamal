# L4 — SOPs (Standard Operating Procedures)

> **Concrete recipes for recurring situations.** Name the situation, give the steps, define done.

Add an SOP when a situation has recurred 3+ times. Before that, handle it ad-hoc — you don't know the procedure yet.

---

## SOP-1: <Situation name>

**Triggered when:** <the specific situation that means "run this SOP">

**Steps:**

1. <step>
2. <step>
3. <step>

**Done when:** <concrete exit criterion>

**Common failure mode:** <what goes wrong if the steps are done sloppily>

---

## SOP-2: <Situation name>

**Triggered when:**

**Steps:**

1.
2.
3.

**Done when:**

**Common failure mode:**

---

## Reference example

> **SOP-1: New directive from the user**
>
> **Triggered when:** User issues a directive whose scope is unclear or non-trivial.
>
> **Steps:**
> 1. Restate the directive in your own words.
> 2. Decompose into 2–3 candidate approaches with different scope/depth.
> 3. Surface the trade-off in one sentence per approach.
> 4. Ask a specific clarifying question if the scope is ambiguous.
> 5. Wait for green light.
> 6. Execute the chosen approach.
>
> **Done when:** User has confirmed an approach AND the first concrete step is complete.
>
> **Common failure mode:** Skipping step 4 ("I know what they want") and producing the wrong scope.

> **SOP-2: Test suite regression**
>
> **Triggered when:** A previously-green test suite has new failures.
>
> **Steps:**
> 1. Classify: is this a flake, dilution (too many rules), capacity (model too small), or conflict (new rule contradicts old)?
> 2. Do NOT add new rules as the first move.
> 3. Reproduce minimally — one fixture, one variable.
> 4. Bisect to the single change that introduced the regression.
> 5. Fix at root cause; if the root cause is a dilution/conflict, reframe — don't stack rules.
>
> **Done when:** Root cause identified + minimal fix + test green + a note in the commit about which classification applied.
>
> **Common failure mode:** Jumping to step 5 without step 1. Adding rules when the problem is framing.

---

## Anti-patterns

- **SOPs that are actually methods.** If it's "how we think about X" rather than "when X happens, do Y," it's L3 or L5.
- **SOPs for single situations.** If you only ran this procedure once, you don't have an SOP yet.
- **SOPs with vague "done when."** "Done when it feels right" is not an exit criterion.
- **SOPs that substitute for judgment.** An SOP should handle the rote parts so judgment can be spent on the novel parts. If an SOP tries to encode judgment, it will fail on edge cases.

## Maintenance

- **Prune** SOPs whose triggering situation stopped recurring. Mark retired; don't silently delete.
- **Refactor** SOPs that grow beyond 7 steps — usually they're doing two things.
- **Test** an SOP occasionally by having a fresh agent follow it for a real instance of the trigger. If they get stuck, the SOP is incomplete.
