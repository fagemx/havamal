# Maintaining Havamal

> **Git stores history. Doctrine stores usable judgment.**
>
> Doctrine should get smaller and sharper over time, not bigger and heavier.

Maintenance is where most knowledge bases die. They grow until nobody reads them, then they stop helping anyone. Doctrine has the same risk, and the discipline that prevents it is: **aggressive triage**.

This doc is the rulebook for that triage.

---

## TL;DR

- **Git has the history. Doctrine has the judgment.** Don't put raw events in doctrine just because they happened.
- **Four actions per entry:** Keep / Promote / Archive / Delete.
- **If in doubt, incubate.** A "candidate" file catches things you're not sure about yet.
- **Review is event-driven + lightweight periodic sweeps.** Not daily maintenance.
- **Healthy doctrine shrinks.** Every review should delete or consolidate more than it adds.

---

## Why git isn't enough

Git answers:

- What changed?
- When did it change?
- Who changed it?
- What's the diff?

Git does NOT answer:

- Why was this direction rejected?
- How would a future agent detect this trap?
- Can this judgment transfer to other situations?
- Is this a temporary patch or a durable principle?
- What should a new agent learn from this?

You *could* say "let the agent crawl git later." You can, but:

- Commits are many and often small
- PR bodies are often incomplete
- Superseded plans aren't always marked
- User corrections live in chat logs, not git
- Agents mistake historical fact for current rule
- Agents can't easily distinguish "temporary expedient" from "durable principle"

The more accurate framing:

> **Git is the raw stratum. Doctrine is the refined ore.**

Don't hand every new agent the mine and ask them to re-refine.

---

## The four actions

Every doctrine entry eventually faces one of four fates. Not just keep/delete — four.

### 1. Keep

Still firing. Leave in place.

**Criteria:**
- Still useful to future agents
- Still prevents recurring mistakes
- Still explains current architecture or taste
- Still helps plan review

**Example:** "LLM does not produce trusted callback actions." (Still a live invariant.)

### 2. Promote

Short-term record → long-term doctrine.

A handoff line like:

> "The renderer plan got superseded because it mixed producer and consumer."

If this failure pattern keeps recurring, it deserves promotion to:

- `failure-memory.md` (as a full four-field entry)
- or `layer-5-thinking-modes.md` (as a reasoning posture)
- or `layer-6-heart-methods.md` (as a compressed maxim with scar)
- or `taste-examples.md` (as a contrast pair)

**Criterion:** *does this pattern recur?* If yes, promote.

### 3. Archive

Retired but historically valuable.

**Criteria:**
- Old architecture no longer in use
- Superseded plan
- Replaced convention
- Doesn't guide current work, but explains how the project got here
- Might be needed for future archaeology

Archive ≠ delete. Archived entries get marked:

> **Historical. Do not use as current doctrine.**

This matters because **old docs that look current are the most dangerous thing in a doctrine.** An unmarked stale entry misleads every fresh agent that reads it.

### 4. Delete

Actually remove.

**Criteria:**
- Duplicated by a better entry
- No judgment value (just raw history git already holds)
- Subsumed into a more general entry
- Wrong and not worth preserving
- **Would mislead future agents if left in place**

Deletion isn't losing history — git retains it. Deletion reduces **cognitive pollution** for future agents.

---

## Decision tree: what do I do with this entry?

```
Does this still influence future judgment?
├─ No  → Delete or Archive (see "delete vs archive" below)
└─ Yes → 
    ├─ Is it describing current state?
    │   └─ Yes → state-snapshot.md
    │
    ├─ Is it a recurring mistake pattern?
    │   └─ Yes → failure-memory.md
    │
    ├─ Is it a concrete good/bad contrast?
    │   └─ Yes → taste-examples.md
    │
    ├─ Is it a durable principle?
    │   └─ Yes → L1 / L5 / L6 (pick by layer guide)
    │
    └─ Is it only historical context?
        └─ Yes → Archive
```

Plain-language version, ask yourself:

1. **Will this be used to judge something in the future?**
2. **If yes, to judge what?**
3. **Is it state, method, failure, taste, principle, or history?**
4. **Would putting it in the wrong layer mislead someone?**
5. **If git already has it, does doctrine need it too?**

---

## "I don't know if it'll be used later" — the incubation answer

This situation will happen constantly. Something interesting just surfaced; you're not sure if it's doctrine material.

**Rule: if you don't know, don't promote yet. Incubate.**

Add a file: `references/incubation.md` (or `doctrine-inbox.md`). Format:

```markdown
## Candidate: <short name>

- **Source:** <where this came from — session, PR, retro>
- **Why it may matter:** <one line>
- **Not promoted because:** <uncertainty about fit / recurrence / cost>
- **Revisit after:** <date or trigger — e.g. "after next major feature" or "2026-05-20">
```

At each review pass, three outcomes per candidate:

- **Still important after 30 days / next milestone** → promote to the right layer
- **Hasn't recurred, no longer seems meaningful** → delete
- **Only historical significance** → archive

This is much better than forcing yourself to decide in the moment and accidentally promoting noise into L6.

---

## Entry lifecycle

Each entry can be in one of these states:

- **candidate** — in incubation, not yet doctrine
- **active** — currently firing in judgment
- **superseded** — replaced by a newer entry
- **archived** — historical, marked as such
- **deleted** — removed (git has it if needed)

Don't over-engineer this. For low-stakes entries, no metadata needed. For high-stakes ones, add a lightweight footer:

```markdown
<!-- status: active; last-reviewed: 2026-04-20; next-review: 2026-05-20 -->
```

Only apply to L1 / L6 / high-impact failure-memory entries. Adding metadata to every bullet is overkill.

---

## Maintenance rhythm — three cadences

Not daily. Maintenance should feel light, not obligatory.

### 1. Event-driven (primary)

Trigger a maintenance pass when:

- A major PR merges
- A plan gets overturned
- An agent repeats a mistake you haven't captured yet
- A user explicitly corrects something important
- A long session ends with new framing
- An experiment yields a clear "do / don't" result
- An old doc is caught misleading a fresh agent

This is the main way doctrine stays alive: react to signals, don't schedule maintenance.

### 2. Weekly / biweekly sweep (lightweight)

Solo projects: once every 1–2 weeks.
Team projects: once per week or per sprint.

Ask five questions:

1. Any stale state in `state-snapshot.md`?
2. Any incubation candidate ready to promote (or delete)?
3. Any old plans that should be archived?
4. Any L6 entry that's quietly become a slogan (no real scar) — delete?
5. Any git-only event in the last week that should have become doctrine?

If the sweep produces no changes in a month of active work, the doctrine is probably stale, not perfect.

### 3. Before handoff-heavy work

Before launching a multi-agent long task, or onboarding a new human/agent, run a focused sweep. Multi-agent setups amplify stale context.

---

## The "three times" rule — what earns doctrine

Not everything that happens deserves a doctrine entry. Use two rules:

### Three-times rule

The same class of thing has happened three times:

- Agents misread the same pattern three times
- User corrected the same thing three times
- Plan review flagged the same risk three times
- The same wrong direction keeps resurfacing

→ Promote to doctrine.

### Cost rule

Even a single occurrence — if the cost was high — earns doctrine.

Examples of "one and done" promotions:

- Almost let the LLM emit a trusted action (security/trust boundary)
- Almost broke the data layer
- Experiment extrapolation turned out wrong
- Locked into a model version that failed in production
- Old doc caused an agent to execute a superseded plan

If the cost was significant, one time is enough.

---

## What does NOT belong in doctrine

Be explicit about the boundary. These stay in git / issue / PR / handoff / chat:

- Single-instance small bugs
- Pure progress updates ("shipped feature X")
- Chat fragments without transfer value
- Emotional reactions to a moment
- Slogans without evidence
- Fast-changing environment info (package versions, vendor flags)
- One-off workarounds
- Commit summaries with no future-judgment value

If you can't name **what future decision this entry will shape**, it's not doctrine.

---

## When to delete

Delete when:

1. It's been subsumed by a more accurate entry
2. It only describes an old state
3. It doesn't help future judgment
4. It would mislead an agent about current state
5. It's raw history already preserved in git
6. It's an empty slogan
7. It duplicates another doctrine entry

**The hardest criterion is #4:**

> An entry that misleads future agents is MORE DANGEROUS to keep than to delete.

Tidy-minded people resist deletion. Resist that resistance — an over-stuffed doctrine fails at its core job.

---

## When to archive (not delete)

Archive when:

- The direction was once important
- Future agents may need to understand why we didn't take this path
- It explains a major pivot
- It's a formally superseded proposal
- It has archaeological value but shouldn't guide current work

Archived entries MUST be marked:

> **Historical only. Do not use as current doctrine.**

Unmarked archive is the same as stale doctrine — equally dangerous.

---

## When to promote

Promotion is the most valuable maintenance action. You're compressing observations into durable rules.

**Promote when:**

- What looked like an event is actually a pattern
- It can prevent future mistakes, not just explain a past one
- It helps agents make better judgments
- It transfers across situations
- You can write it as a single durable rule

**Example promotion:**

Event:
> "The renderer feature v0.1 shouldn't let LLMs generate buttons."

Promoted:
> "LLM produces semantic material; deterministic runtime produces trusted UI actions."

That second form is doctrine. The first is a handoff.

---

## How agents should help with maintenance

Maintenance shouldn't be all on the developer. Agents should propose updates at the right moments — not at every moment.

### Agents SHOULD surface doctrine candidates when:

- User says "this again" / "we keep running into this"
- User explicitly corrects something structural
- A plan gets overturned
- A postmortem concludes
- An agent review finds a structural issue
- A long session ends
- A PR changes architecture or product direction

### Agents should NOT surface doctrine candidates when:

- Typos or formatting fixes
- Small bugs without systemic implication
- Routine merges
- Running tests
- Looking up local code
- Everyday execution work

### Proposal format

An agent noticing doctrine material can offer:

> "This looks like doctrine material. Options:
> 1. Leave it in handoff (just this session)
> 2. Add to failure memory
> 3. Add to taste examples
> 4. Promote to L5 / L6
> 5. Archive a stale doc it replaces"

Don't ask every time. Ask at the *right* time — see the triggers above.

---

## Doctrine triage template

For candidates that aren't obviously one action, use a triage record. See:

- [`templates/doctrine-triage.md`](../templates/doctrine-triage.md) — copy-paste per-candidate template
- [`templates/havamal-skill/references/incubation.md`](../templates/havamal-skill/references/incubation.md) — ongoing candidates file

---

## Anti-pattern: doctrine debt and doctrine obesity

Two related failure modes:

**Doctrine debt** (acquired on day 1) — files filled with empty words, L6 entries without scars, taste examples that are really style rules. Created by filling every template slot instead of leaving unready ones empty. See [`getting-started.md`](getting-started.md) for the prevention.

**Doctrine obesity** (acquired over time) — the slow accumulation of low-signal entries, stale state, un-pruned history.

Both produce the same symptom: a doctrine that is technically populated but **doesn't fire.**

The failure mode most projects fall into (obesity):

- Doctrine grows every week
- Nothing gets deleted
- L6 fills with slogans that were never scars
- Failure-memory becomes a bug log
- Taste-examples becomes a style guide
- New agents read everything and retain nothing
- Maintenance becomes a chore nobody does

**Sign of obesity:** you stopped recommending "read the doctrine" because you're embarrassed about its state.

**The cure:**

- Every review pass must delete or consolidate more than it adds (at least sometimes)
- Every L6 re-read asks: "did I actually pay for this, or just write it?"
- Every failure-memory entry passes "does the detection heuristic actually fire?"
- Every taste-example passes "does this contrast still teach, or is it dated?"

---

## The governing principle

> **Doctrine should get smaller and sharper over time, not bigger and heavier.**

Most maintenance is compression, not accumulation. If your monthly review produces three additions and zero removals, something's drifting.

---

## Quick reference

| Situation | Action |
|---|---|
| Entry still fires | Keep |
| Handoff-level observation that now recurs | Promote |
| Old but worth remembering why | Archive (with "historical" marker) |
| Duplicate / misleading / no judgment value | Delete |
| Not sure yet | Incubate (candidate file) |
| Git already has it, doctrine doesn't add | Leave in git |
| Short-term workaround | Handoff, not doctrine |
| Single cheap bug | Issue / PR, not doctrine |
| Single high-cost trap | Promote immediately (one-time cost rule) |
| Same pattern 3rd time | Promote (three-times rule) |

---

## Related

- [`everyday-use.md`](everyday-use.md) — when to load doctrine during work
- [`when-to-use.md`](when-to-use.md) — when to create a doctrine in the first place
- [`six-layer-model.md`](six-layer-model.md) — layer definitions
- [`failure-memory.md`](failure-memory.md) — how to write failure-memory entries
- [`taste-examples.md`](taste-examples.md) — how to write taste examples
- Chinese version: [`maintenance.zh.md`](maintenance.zh.md)
