# Templates

Copy-paste templates for every file in a Havamal skill. Use these when helping a user scaffold their doctrine. Each template is the minimum viable v0 content — fill in the bracketed fields with project-specific content.

For the canonical templates that ship with this repo, see [`templates/havamal-skill/`](../../../templates/havamal-skill/). This file is a condensed quick-reference.

---

## SKILL.md

```markdown
---
name: <project>-doctrine
description: Project posture loader for <project>. Load before planning, reviewing, or making non-trivial decisions.
---

# <project> Doctrine

Posture loader for <project>. Do NOT summarize this back; enter the stance.

## Load protocol

1. `references/state-snapshot.md`
2. `references/layer-1-ideology.md`
3. `references/layer-5-thinking-modes.md`
4. `references/layer-6-heart-methods.md`

On-demand: L2, L3, L4, failure-memory, taste-examples, apprenticeship-check, bootstrap-prompt, provenance, execution-state.

## One-sentence identity

<one sentence naming what this project is and what it optimizes for>

## Conventions

- <conv 1>
- <conv 2>

## Closing

Doctrine > handoff. Trust evidence and patch the doctrine when they conflict.
```

---

## state-snapshot.md

```markdown
# State Snapshot — <project>

**Last reviewed:** YYYY-MM-DD

## Current phase
<1–2 sentences>

## Recently shipped (last 3–5)
- `YYYY-MM-DD` — <thing>
- `YYYY-MM-DD` — <thing>

## Actively in progress
- <item> (owner, ETA)

## Blocked / deferred
- <item> — blocked on <reason>

## Hard boundaries
- <boundary>

## What to ignore (stale frames)
- <old frame> — replaced by <new frame>

## Canonical source-of-truth pointers
- `docs/specs/<path>` — <what it covers>

## Recent scars pending L6 entries
- <scar> — TODO
```

---

## layer-1-ideology.md

```markdown
# L1 — Ideology

## 1.1 — <Claim>

**Claim:** <one-sentence belief>
**Why:** <one-sentence justification>
**Violation test:** <concrete situation where you'd notice violation>

## 1.2 — <Claim>
...

## Changelog
- `YYYY-MM-DD` — Added 1.1. Reason: <why this is durable>.
```

3–7 entries. Each with violation test.

---

## layer-2-knowledge.md

```markdown
# L2 — Knowledge

## Reading ladder
1. state-snapshot
2. <path to canonical doc> — <one-liner>
3. <path> — <one-liner>

## Canonical specs
| Path | Description | Last verified |
|---|---|---|
| `docs/specs/<name>.md` | <one-liner> | YYYY-MM-DD |

## Superseded docs
| Path | Replaced by | Superseded on |
|---|---|---|
| `<old>` | `<new>` | YYYY-MM-DD |

## Source-of-truth for common questions
- **<question>** → <path>
```

---

## layer-3-methods.md

```markdown
# L3 — Methods

## 3.1 — <Method name>

**For:** <situation>
**How:** <2–4 steps>
**Why it works here:** <project-specific reason>
**Concrete example:** <real instance from this project>
```

Only add methods you've validated.

---

## layer-4-sops.md

```markdown
# L4 — SOPs

## SOP-1: <Situation name>

**Triggered when:** <specific trigger>
**Steps:**
1. ...
2. ...
**Done when:** <concrete exit>
**Common failure mode:** <what goes wrong if sloppy>
```

---

## layer-5-thinking-modes.md

```markdown
# L5 — Thinking Modes

## 5.1 — <Mode name>

**What it is:** <one-line>
**When to enter:** <signal>
**How to hold:** <2–3 instructions>
**How to notice you've dropped it:** <drop signal>
```

---

## layer-6-heart-methods.md

```markdown
# L6 — Heart Methods

## 6.1 — <Maxim>

**Scar:** <the specific failure that earned this>
**Triggers when:** <the situation where this fires>
```

**NO ENTRY WITHOUT A SCAR.**

---

## failure-memory.md

```markdown
# Failure Memory

## FM-1: <Name>

**Temptation:** <agent-voice description of the wrong move>

**How it failed:**
- <symptom>
- <symptom>

**Future detection:** <pattern match a future agent can apply>

**Correct move:** <the doable substitute>
```

---

## taste-examples.md

```markdown
# Taste Examples

## TE-1: <Situation>

**Situation:** <what moment is being decided>

**Good:**
<concrete artifact>

**Bad:**
<concrete, seductive artifact>

**Why good wins:**
<project-specific reason, references L1/L6>
```

---

## apprenticeship-check.md

```markdown
# Apprenticeship Check

A new agent answers these before real work:

1. **What is current?** <from state-snapshot>
2. **What is durable?** <from L1>
3. **What is stale?** <name one thing>
4. **Which tempting plan should we refuse?** <from failure-memory>
5. **Which layer does [X] belong in?** <user provides X>
6. **What is the smallest safe next move?**

## Sample good answer
<project-specific example>

## Sample bad answer
<generic, evasive example>

## Pass criteria
- Answers reference concrete entries
- Q3 actually names something stale
- Q6 is genuinely small
```

---

## bootstrap-prompt.md

```markdown
# Bootstrap Prompt

## Full (session start)

\`\`\`
Load <project> doctrine:
1. state-snapshot.md
2. layer-1-ideology.md
3. layer-5-thinking-modes.md
4. layer-6-heart-methods.md

Run apprenticeship check (Q5 uses: [task]).

Do NOT summarize. Reply with Q1–Q6 answers.
\`\`\`

## Short (mid-session)

\`\`\`
Refresh <project> posture. State: (1) current, (2) durable, (3) smallest safe next move.
\`\`\`
```

---

## execution-state.md

```markdown
# Execution State — <project>

**Last reviewed:** YYYY-MM-DD

## Current position

Current focus:
<one line>

Last completed package:
<package / commit / validation>

Latest proof:
<what has actually been proven>

## Next queue

| Order | Package | Goal | Done When |
|---:|---|---|---|
| 1 | <next package> | <smallest useful advance> | <observable stop condition> |

## Active stop conditions

- <decision requiring user approval>

## Current friction

| Date | Friction | Handling |
|---|---|---|

## Working rule for future agents

1. Read execution state.
2. Read state snapshot.
3. Pick the first unblocked queue item.
4. Verify.
5. Update this file.
```

Optional. Add only when a long-running campaign has outgrown state-snapshot and handoff.

---

## provenance.md

```markdown
# Provenance

## L1.1 — <entry>

**Originated:** YYYY-MM-DD
**By:** <person / session>
**Context:** <what was happening>
**Evidence:** <commit / PR / retro>
**Status:** active

## Retired entries

<entries retired with date and reason>
```

---

## Build order (for v0)

1. state-snapshot (easiest, highest value)
2. L1 (3–5 entries with violation tests)
3. L6 (scars first, or explicitly empty)
4. failure-memory (3 entries)
5. taste-examples (3 entries)
6. L2 (index existing docs)
7. L5 (2–4 thinking modes)
8. apprenticeship-check (customize 6 questions)
9. bootstrap-prompt (copy-paste loader)
10. execution-state (optional when long-running package queue exists)
11. L3 (optional at v0)
12. L4 (optional at v0)
13. provenance (optional at v0, required by v1)

## Completion check

v0 is ready when:

- state-snapshot dated and current
- L1 ≥3 entries with violation tests
- L6 ≥1 entry with scar (or empty + note)
- failure-memory ≥3 entries
- taste-examples ≥3 contrast pairs
- apprenticeship-check customized
- bootstrap-prompt fits in one message
- A fresh agent can answer Q1–Q6 project-specifically
