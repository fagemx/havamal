# Failure Memory Guide

How to help a user write good failure-memory entries. This is often the highest-value layer after state-snapshot, and it's the one users struggle most to write well.

## The format

Each entry has four fields. All four are required.

```markdown
## FM-N: <Name of the temptation>

**Temptation:**
<Written from the POV of the agent who would make the mistake. Why would the wrong move look reasonable?>

**How it failed:**
- <Concrete symptom 1>
- <Concrete symptom 2>
- <Concrete symptom 3>

**Future detection:**
<Short pattern match. What signal in a new plan/PR/decision would trigger "this is the trap"?>

**Correct move:**
<The doable substitute. Not "be more careful" — an actual action.>
```

## Writing each field

### Temptation

**Good:**
> Let the model emit button syntax directly in its response. It's "all just text" and the framework renders it. Why add a layer?

Why this works: written in the agent's voice. The agent who would make this mistake would think these thoughts. When a future agent sees this temptation, they recognize themselves.

**Bad:**
> Over-engineering by adding unnecessary layers.

Why this fails: it's diagnostic, not seductive. No future agent thinks "I'm going to over-engineer today" — they think "why add a layer?" Write the *thought that leads to the mistake*, not the label of the mistake.

### How it failed

**Good:**
- LLM hallucinated button labels that didn't map to any handler
- Prompt regressions became UI regressions
- Callback data parsing needed quoting escapes the LLMs got wrong ~5% of the time
- User-visible "button ghosting": buttons appeared but did nothing

Why this works: concrete, measurable, specific. A future agent can verify "has this failure mode already arrived?"

**Bad:**
- Things got messy
- Users were confused
- It was hard to maintain

Why this fails: could apply to anything. Doesn't help diagnose or detect the class of failure.

### Future detection

**Good:**
> Any plan where model output becomes callback data, URL path, link, ID, or state transition. The phrase "the assistant will output X" near a dispatch path is a red flag.

Why this works: it's a pattern a future agent can match against a new plan in 10 seconds.

**Bad:**
> Be careful when designing UI interactions with AI.

Why this fails: not a heuristic. A future agent can't match this against anything.

### Correct move

**Good:**
> LLM produces semantic structure (blocks, tags, intents). Deterministic renderer maps that structure to platform primitives. Trust boundary is explicit: model owns meaning, code owns dispatch.

Why this works: names the alternative concretely. A future agent reading this knows what to build instead.

**Bad:**
> Design better. Add more abstractions.

Why this fails: not an action. Doesn't tell a future agent what to build instead.

## Sourcing entries

The best failure-memory entries come from:

1. **PR reverts** — something shipped, broke, got rolled back. Generalize from the bug to the class of temptation.
2. **Round-2 review rejections** — the reviewer caught a tempting-but-wrong plan. Write up the plan pattern that would fire next time.
3. **"We already tried that" said twice** — you're now explaining the same rejection repeatedly. Write it down.
4. **Postmortems** — the incident report usually contains the seeds; you extract the generalizable pattern.
5. **User corrections of past agent work** — when the user says "no, this is why that approach doesn't work here," that's a failure-memory entry.

## How many entries

- **v0:** 3 entries. One from each of the three most-painful classes of mistake.
- **Mature:** 5–25 entries.
- **Over 25:** you've stopped compressing. Consolidate.

## The self-test

After writing an entry, test it with this question:

> "If a future agent wrote a plan with the same temptation, would this entry fire?"

If no, the entry isn't specific enough. Usually the temptation field is too abstract — rewrite it in the voice of the agent who would make the mistake.

## Common writing mistakes

### 1. "Bug report in disguise"

The entry describes what went wrong but offers no generalization. Useful for the person who was there; useless for a future agent.

Fix: after writing the "how it failed" section, ask: "what's the *class* of mistake here? What other scenarios would trigger the same failure?" Rewrite with that class in mind.

### 2. "Moralistic correct move"

The correct move is "be more careful" or "think harder." Not an action.

Fix: ask "what specific architectural change or procedural change would prevent this?" Name the thing, not the virtue.

### 3. "Strawman temptation"

The temptation is obviously stupid. No agent would recognize themselves in it.

Fix: rewrite the temptation as the *actual reasoning* that leads to the mistake. If you can't write a seductive-sounding temptation, you haven't understood the failure mode.

### 4. "Vague detection"

Detection is "watch out for bad designs." Not a pattern match.

Fix: name the specific signal. Is it a code pattern? A phrase in a plan? A class of PR title? Be specific enough that a future agent could literally grep for it.

### 5. "Over-general correct move"

Correct move is a whole architectural philosophy that would take months to adopt.

Fix: name the *minimum-viable* substitute. What's the smallest thing that prevents this failure mode?

## Working with the user to extract entries

When helping a user build their failure-memory:

1. **Ask for a recent rollback or revert.** Have them describe it concretely.
2. **Ask "what's the temptation behind this failure?"** Push them to articulate why the wrong move looked reasonable.
3. **Ask "how would you catch this next time?"** Listen for a concrete heuristic; reject vague answers.
4. **Ask "what's the minimum-viable substitute?"** Get them to name the specific alternative.
5. **Write a first draft and show them.** Their reaction often surfaces what the entry is really about.
6. **Iterate until the entry would fire** for a future plan with the same temptation.

## What NOT to put in failure memory

- Single-bug reports (post-mortems, not doctrine)
- Shame entries ("we should have known better")
- Unverified cautions (things that might go wrong, but haven't)
- Generic software advice ("don't optimize prematurely")
- Process failures that are already covered by an SOP

## Relationship with L6

A failure-memory entry and an L6 entry can point at the same scar. The difference:

- **Failure-memory** is the detailed four-field trap description
- **L6** is the compressed maxim that fires as reflex

Example:
- **FM-2:** Mocked smoke tests (full four-field entry)
- **L6.1:** "Smoke tests must hit the real thing"

The L6 is what the agent recites mid-task. The failure-memory is what they read to remember *why*.
