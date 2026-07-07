# When to Use

> **After skeleton, before sprawl.**
>
> Too early, doctrine becomes aspiration.
> Too late, doctrine becomes archaeology.

Havamal is best created after the project has a skeleton and a few high-context sessions — but before the context spreads across too many stale plans, half-remembered decisions, and scattered chat logs.

That window is where the raw material is richest and still compressible.

---

## TL;DR

- **Don't** build doctrine on day 1.
- **Do** build it once the project has a working skeleton + real judgment traces.
- **Recover** it (with extra cost) if you waited too long.
- The best raw material is a **few high-quality long sessions**, not short handoffs.
- If in doubt, run the readiness rubric below.

---

## The three stages

### Stage 1 — Too early: don't build

At the start of a project you typically have:

- An idea
- A few conversations
- Unstable architecture
- No real failures yet
- No rejected directions
- No accumulated taste

**Don't build doctrine here.** You'll write generic slogans:

- "We value quality."
- "We keep it simple."
- "We put users first."
- "We build for scale."

Those read well, cost nothing to write, and teach future agents nothing. They are imagined convictions, not paid-for ones.

What you need at this stage:

- README
- Initial plan
- Short handoff
- Decision notes

Save the doctrine effort for when the project has scars.

### Stage 2 — Just right: build now

This is the sweet spot. You'll recognize it from these signals:

- The project has a working skeleton (v0 shipped or close to it)
- You've had a few specs / plans / PRs with substance
- The project has rejected at least one tempting direction
- Agents have made repeated mistakes that you keep re-correcting
- The user has started saying "no, not like that — like this"
- At least one high-context long session has happened where the project's shape became clearer
- You can now articulate: "this project is not X, it is Y"
- Some old handoffs or docs are starting to mislead fresh agents
- A new agent needs more than the README to continue safely

This is when doctrine material is most available AND most compressible. Write now.

**The one-line test:**

> If you're starting to feel handoffs aren't enough and the README is too cold — that's the doctrine moment.

### Stage 3 — Too late: build as recovery

If the project has grown large without doctrine, you can still build one — but it's recovery, not fresh construction.

You'll face:

- Many old specs (some superseded, some unclear)
- Long commit history
- Agents reading stale docs and getting confused
- Verbal team consensus that never made it to text
- Judgment that lives only in 2–3 people's heads

Recovery doctrine uses a different process:

1. **Current-state audit** — what's actually true right now?
2. **Mark stale docs** — which docs mislead if read literally today?
3. **Extract 5–10 key decisions** from commit history / chat logs / retros
4. **Identify 5 repeated failures** worth capturing as failure-memory
5. **Assemble 3–5 taste examples** from recent reviews and corrections
6. **Then** write the actual doctrine (L1 / L5 / L6 / failure-memory / taste-examples)

Don't jump straight to writing L1–L6. Without the archaeology step, you'll produce abstractions that don't fire.

---

## When to create (signals that say yes)

Copy this into your own `when-to-use` doc when you bootstrap a new project, and check it before committing to doctrine.

Good signals:

- The project has a working skeleton.
- You have completed several long, high-context agent sessions.
- You have repeated corrections you do not want to explain again.
- Some old plans or handoffs are starting to mislead new agents.
- The project has rejected a few tempting directions.
- You can now say: "This project is not X, it is Y."
- You have at least three real failure memories in mind.
- You have at least three taste examples you could write down.
- A new agent cannot safely continue by reading only the README.

If 6 or more apply, it's time.

## When NOT to create (signals that say no)

Do not build a doctrine if:

- The project is still only an idea.
- There is no working skeleton.
- No meaningful failures have happened yet.
- You cannot name the wrong nearby version of your project.
- You only have generic values like "quality," "simplicity," or "user focus."
- A normal README and short handoff are enough.
- You haven't yet noticed yourself repeating explanations to agents.

If 3 or more of these apply, it's too early. Come back later.

---

## The defining line

> **After skeleton, before sprawl.**

This is the shape of the good moment. Skeleton means the project has structure that's been shipped, reviewed, iterated on — real shape, not wireframes. Sprawl means context has spilled across too many docs, chats, and memories to carry in one head.

Between those two points is where doctrine is cheapest to write and highest-leverage to read.

---

## The best raw material

Not all project history is equally useful for doctrine-building. In order of value:

### 1. High-quality long sessions (highest value)

A long, high-context session — where an agent and a user went through several rounds of correction, framing, reversal, and convergence — contains the *deformation process* that shapes a project's judgment.

These sessions capture:

- How a direction got overturned
- Why the user got frustrated
- How the agent misread the intent
- How a vague feeling became an executable rule
- What words were redefined along the way
- Which metaphors were tried and abandoned

Short handoffs capture *results*. Long sessions capture *transformations*. Doctrine is built from transformations.

### 2. Reviewed plans (round-1 → round-2 → execution)

Especially plans where round-2 review caught:

- Scope drift
- Trust-boundary violations
- Stale framing
- Missing invariants

The corrections between rounds are crystallized judgment.

### 3. Postmortems and findings

- Experiment results
- Error analyses
- Post-merge issues
- Edge-case encounters

These are pre-compressed lessons waiting to become failure-memory entries.

### 4. PR summaries (good ones)

- What actually shipped
- What was deliberately excluded
- What was deferred to the future and why

### 5. Explicit user corrections

When the user says:

- "No, not like this."
- "You're being too conservative."
- "This reads like a corporate Slack message."
- "That's not the kind of unruliness I want."

Each correction is a doctrine entry in embryonic form.

---

## Why long sessions matter (special case)

A long, high-context session is the single richest source. In one transcript you often get:

- Multiple L6 candidates (scars from reversals mid-session)
- Multiple failure-memory entries (patterns the agent fell into)
- Several taste examples (good/bad pairs that emerged through iteration)
- Some L1 clarification (the "this project is X, not Y" moments)
- State-snapshot updates (current situation is revealed)

If you build doctrine by *reviewing your best session*, you'll extract more in 2 hours than in 2 weeks of general project documentation.

**Practical tip:** pick one high-quality long session. Re-read it end to end. For each "aha" or "no, not like that" moment, ask: which layer does this belong in? That's your starting doctrine.

---

## Doctrine readiness rubric

Score 0–2 for each of the 7 questions (0 = not at all, 1 = partially, 2 = yes, clearly).

| # | Question | Score |
|---|---|---|
| 1 | Working skeleton exists | 0 / 1 / 2 |
| 2 | Repeated user corrections exist | 0 / 1 / 2 |
| 3 | Meaningful failures have happened | 0 / 1 / 2 |
| 4 | Stale context is starting to accumulate | 0 / 1 / 2 |
| 5 | The project has rejected tempting directions | 0 / 1 / 2 |
| 6 | Good and bad taste examples are available | 0 / 1 / 2 |
| 7 | New agents need more than README to continue | 0 / 1 / 2 |

**Interpretation:**

- **0–5: too early** — keep working, come back later
- **6–9: start a lightweight doctrine** — minimum viable set (see below)
- **10–14: create full doctrine** — worth building the whole structure

If you score 4 or below, the project is too new. If you score 13+, you may already be in recovery territory — some context has likely been lost.

---

## Three modes of doctrine creation

Match your mode to your readiness score.

### Lightweight Doctrine (score 6–9)

Just past the early stage. Start with a minimum viable set:

```
state-snapshot.md
doctrine-thesis.md        (or SKILL.md — short identity statement)
failure-memory.md
taste-examples.md
bootstrap-prompt.md
```

Five files. Skip L1/L3/L4 for now. Add them as the project accumulates more to say.

### Full Doctrine (score 10–14)

Project has hit stable engineering rhythm. Build the complete structure:

```
SKILL.md
references/
  state-snapshot.md
  layer-1-ideology.md
  layer-2-knowledge.md
  layer-3-methods.md
  layer-4-sops.md
  layer-5-thinking-modes.md
  layer-6-heart-methods.md
  failure-memory.md
  taste-examples.md
  apprenticeship-check.md
  bootstrap-prompt.md
  provenance.md
```

Plus `governance.md` + `decision-records.md` if team mode.

### Recovery Doctrine (score 14+, or the project is old without doctrine)

Sprawl has already happened. Don't dive straight into writing layers. Do the archaeology first:

1. **Stale-doc audit** — list every doc; tag as canonical / superseded / ambiguous
2. **Decision archaeology** — find 5–10 decisions that shaped current state; write one-line summaries
3. **Failure extraction** — mine retros, reverts, Slack threads for repeated patterns
4. **Current-state reconstruction** — write `state-snapshot.md` from scratch, reflecting what's true today (not what was true 6 months ago)
5. **Then** write L1 / L5 / L6 / failure-memory / taste-examples based on the extracted material

Budget 2–3x the time a fresh-stage doctrine would take.

---

## How agents should evaluate readiness

When a user asks "should we build a Havamal for this?" the agent should:

1. Run the readiness rubric honestly (not optimistically)
2. Report the score
3. Recommend: don't build / lightweight / full / recovery
4. If the answer is "don't build," suggest what to do instead (README, handoff discipline, a short decision-notes file)

Don't recommend building a doctrine just because the user asked. Doctrine has a cost; match the cost to the readiness.

---

## Why premature doctrine fails

A doctrine written too early:

- Contains values instead of convictions
- Has no scars behind L6 entries, so L6 becomes slogans
- Has no real failures, so failure-memory is speculative
- Has no taste examples, so taste is written as adjectives
- Gets out of sync with the project before anyone uses it

The doctrine looks legitimate but fires no judgment. An agent reading it processes tokens without gaining stance.

**The sign of a premature doctrine:** re-reading your own L6 entries, you think "did I pay for this, or did I just write it?" If it's the latter, delete that entry.

---

## Why late doctrine is still worth it

Even in recovery mode, doctrine pays:

- New agents stop making old mistakes (failure-memory is load-bearing even late)
- Architectural pivots get recorded, not silently forgotten
- Team members stop re-litigating the same decisions
- Future agents don't have to comb through 200 Slack threads to find "how this project thinks"

Recovery doctrine is more expensive, but the downstream savings — every future agent not re-learning — compound.

---

## The one-liner

> **After skeleton, before sprawl.**
>
> Too early, it becomes aspiration.
> Too late, it becomes archaeology.

If you remember nothing else from this doc, remember this shape.

---

## Related

- [`everyday-use.md`](everyday-use.md) / [`everyday-use.zh.md`](everyday-use.zh.md) — how developers use doctrine day-to-day once it exists
- [`solo-mode.md`](solo-mode.md) — for solo builders
- [`team-mode.md`](team-mode.md) — for team projects
- [`migration-guide.md`](migration-guide.md) — the actual install process once you decide to build
- Chinese version: [`when-to-use.zh.md`](when-to-use.zh.md)
