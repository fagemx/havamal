# Apprenticeship Protocol (for the Builder)

How to help a user design and run the apprenticeship check for their project. The full method is in [`docs/apprenticeship-protocol.md`](../../../docs/apprenticeship-protocol.md); this file is the builder's operational guide.

## The six questions

The canonical check asks six questions. You help the user customize them.

1. **What is current?** (from state-snapshot)
2. **What is durable?** (from L1)
3. **What is stale?** (active engagement test)
4. **Which tempting plan should this project refuse?** (from failure-memory)
5. **Which layer does [concrete task X] belong in?** (model-of-doctrine test)
6. **What is the smallest safe next move?** (judgment test)

## Customization per project

The questions stay the same. What a **good answer** looks like is project-specific.

For each question, the apprenticeship-check file should include:

- The question
- What counts as a project-specific answer
- A sample good answer
- A sample bad answer

## Sample good answer (generic example)

Drawn from the Acme SaaS example doctrine in `examples/software-project/`; adapt to your project:

> **Q1:** Citation-in-response shipped 2026-04-15. Trust-hardening phase. No new AI features until citation coverage ≥95%.
>
> **Q2:** L1.1 (trust > speed). L1.3 (every AI answer must be citable).
>
> **Q3:** `ai-first-narrative-2026-01.md` is superseded. Would mislead on current positioning.
>
> **Q4:** FM-1 (auto-applied AI suggestions) would fire on any plan proposing "apply when confidence > 95%."
>
> **Q5 (for "add AI-suggested tags"):** Plan invokes SOP-2 (new AI feature), which means citability (L1.3), kill-switch (L1.4), and refusal state must be addressed in the plan.
>
> **Q6:** Smallest safe move is NOT coding. It's writing the plan with citation + refusal paths, submitting for round-2, THEN scaffolding.

## Sample bad answer (diagnostic)

```
Q1: Things are going well.
Q2: We prioritize quality.
Q3: Nothing looks stale.
Q4: Avoid over-engineering.
Q5: Depends on context.
Q6: Start with the highest-priority task.
```

None are project-specific. Agent has read but not entered.

## Pass criteria

- Each answer references concrete entries from the doctrine
- Q3 actually names something stale (no "all good" answers)
- Q6's "smallest safe move" is genuinely small (not a disguised feature)
- The answers would sound wrong if applied to a different project

## Failure signals

- **Generic fluency:** answers sound smart but reference nothing
- **Performing compliance:** "I have read the doctrine and understand the importance of X" (paraphrasing, not using)
- **Evasion:** "it depends" without specifying
- **Overconfident Q3:** claims nothing is stale without having looked

## Two-way diagnostic

The check tests the agent AND the doctrine. Interpret results as:

- **Most questions fail → the doctrine has under-populated layers.** Fix the doctrine.
- **Q3 always fails → state-snapshot or L2 isn't being refreshed.**
- **Q4 fails → failure-memory entries aren't specific enough to fire.**
- **Q5 fails → the layer guide isn't in the doctrine, or the agent hasn't internalized the model.**
- **Q6 always proposes big moves → L1 is missing a "smallest-safe-step" conviction, OR the agent is in default "impress the user" mode.**

If an agent fails the check, the first move is NOT to retrain the agent. It's to ask whether the doctrine answers the question well enough.

## Running the check in practice

**At session start** (fresh agent):
1. Agent loads doctrine per bootstrap-prompt
2. User provides a concrete task for Q5
3. Agent answers Q1–Q6 in a single reply
4. User confirms or asks for re-read

**Mid-session** (drift suspected):
- Short form: ask Q1, Q2, Q6
- If the agent has drifted, a full re-bootstrap is usually cheaper than correcting mid-flight

**Self-administered** (agent working alone):
- Agent reads and answers silently before starting a plan
- Honesty is the bottleneck; a "flowing smoothly" answer is suspect

## Extending the check

Some projects need extra questions:

- **Q7: What would this project pay to NOT do this?** — For larger tasks; surfaces trade-offs.
- **Q8: Which failure-memory entry does this plan risk rerunning?** — For architectural changes.
- **Q9: Does this violate any L1?** — For identity-adjacent changes.

Don't add questions by default; the six cover most cases. Add when a recurring failure mode isn't being caught by the existing six.

## Running the check against the fresh doctrine (v0 test)

After helping a user build their v0 doctrine, **run the check against it** using a fresh agent session.

- If the check fails, the doctrine is under-populated. Note which layers fail; help the user add to those.
- If the check passes but the agent sounds generic, the doctrine is technically complete but not yet specific enough. Push on sharpness.
- If the check passes with project-specific answers, v0 is ready.

## What to tell the user

After they've built v0 and passed the check:

1. The doctrine is alive — it decays without use. Consult it before every plan.
2. Every "no, not like that" is a taste example waiting to happen.
3. Every scar earned is an L6 entry waiting to be compressed.
4. The check is self-administered once they're comfortable. Their honesty is the only gate.
5. If they haven't edited the doctrine in a month and the project is active, it's probably stale.
