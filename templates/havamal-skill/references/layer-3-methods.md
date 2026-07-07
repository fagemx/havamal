# L3 — Methods

> **Validated ways of working.** Only methods that have been tested on this project. No aspirational best-practices.

Each method has:
- A name
- What it's for
- Why it works here (not a generic justification — project-specific)
- A concrete example from this project

---

## 3.1 — <Method name>

**For:** <what situation this method handles>

**How:** <2–4 step description>

**Why it works here:** <project-specific reason — what about <project> makes this method fit?>

**Concrete example:** <at least one real instance from this project where this method was used and it worked>

---

## 3.2 — <Method name>

**For:**

**How:**

**Why it works here:**

**Concrete example:**

---

## Reference example

For what a healthy L3 entry looks like:

> **3.1 — Round-2 plan review before execution**
>
> **For:** Any non-trivial implementation plan.
>
> **How:**
> 1. Plan author produces v1.
> 2. Separate reviewer (human or fresh agent) does a round-2 pass: names blockers, missing pins, scope-fence violations.
> 3. Plan patches inline — round-2 corrections become a visible section in the plan.
> 4. Only then execute.
>
> **Why it works here:** Our plans tend to over-specify architecture and under-specify execution. The round-2 catches missing invariants before implementation locks them in. We've shipped 5 PRs using this pattern; every round-2 surfaced ≥3 blockers that would have cost hours to debug post-implementation.
>
> **Concrete example:** PR #128 (renderer v0.1) — round-2 found 5 issues including a broken-typecheck commit state and a truncation-vs-omit policy mistake. All patched pre-execution.

---

## Anti-patterns

- **Blog-post methods.** "Use feature flags" without evidence it works here → not L3.
- **Generic TDD.** If the method reads like it came from any methodology book, sharpen it to this project's shape.
- **One-off procedures.** A procedure you ran once isn't a method; keep it in a plan doc.
- **Methods without a failure mode.** A healthy method has a known failure mode. If you can't describe when the method *stops* working, you haven't pressure-tested it.

## Maintenance

- **Add** when a method validates across ≥2 situations.
- **Retire** when a method stops working or the situation no longer arises.
- Each entry should be readable in under a minute.
