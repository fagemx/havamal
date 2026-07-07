# Failure Memory

> **Tempting mistakes this project has paid for.** Read before planning; scan before executing.

Each entry has four fields:
- **Temptation** — why the wrong move looks reasonable
- **How it failed** — what went wrong, concretely
- **Future detection** — early signal to catch it next time
- **Correct move** — the minimum-viable alternative

If any field is vague, the entry isn't useful yet.

See [`docs/failure-memory.md`](../../../docs/failure-memory.md) in the project-doctrine repo for the full method.

---

## FM-1: <Name of the temptation>

**Temptation:** <one paragraph — write from the POV of the agent who would make the mistake>

**How it failed:**
- <concrete symptom>
- <concrete symptom>
- <concrete symptom>

**Future detection:**
<short pattern match — the heuristic that would catch this in a new plan>

**Correct move:**
<the doable substitute>

---

## FM-2: <Name>

**Temptation:**

**How it failed:**
-
-

**Future detection:**

**Correct move:**

---

## FM-3: <Name>

**Temptation:**

**How it failed:**
-
-

**Future detection:**

**Correct move:**

---

## Reference example

> **FM-1: LLM-generated UI actions**
>
> **Temptation:**
> Let the model emit button syntax or callback data directly in its response — it's "all just text" and the framework renders it, so why add a layer?
>
> **How it failed:**
> - LLM hallucinated button labels that didn't map to any handler
> - Prompt regressions became UI regressions (no separation of concerns)
> - Callback data parsing needed quoting escapes that LLMs got wrong ~5% of the time
> - User-visible "button ghosting": buttons appeared but did nothing
>
> **Future detection:**
> Any plan where model output becomes callback data, URL path, link, ID, or state transition. The phrase "the assistant will output X" near a dispatch path is a red flag.
>
> **Correct move:**
> LLM produces semantic structure (`blocks`, `tags`, `intents`). Deterministic renderer maps that to platform primitives. Trust boundary is explicit: model owns meaning, code owns dispatch.

---

## Starter entries most projects need

These are patterns we see in most AI-augmented projects. Consider as prompts, not prescriptions:

- **LLM-generated dispatch tokens** — letting model output become IDs/URLs/callbacks
- **Mocking what should be integration-tested** — the fix passes, prod breaks
- **Adding a rule to the prompt instead of reframing** — diluting existing rules
- **Optimizing for a benchmark that doesn't reflect user experience**
- **Turning a scope-fence into a guideline** — if it's not enforced, it's not a fence
- **Assuming the model "understands" a constraint it was merely told**

## Maintenance

- **Add** when a class of mistake has fired 2+ times
- **Retire** entries whose triggers no longer arise in the project
- **Consolidate** when two entries are actually the same pattern

## Anti-patterns

- **Bug reports in disguise.** "We had a null pointer in X" isn't failure memory; it's a post-mortem item.
- **Vague temptations.** "Over-engineering" — agents don't recognize themselves in this; sharpen to a specific act.
- **Moralistic corrections.** "Should have been more careful" — not a move. Name a specific move.
- **Entries without detection heuristics.** If the reader can't catch the trap in a new plan, the entry is a story, not a tool.
