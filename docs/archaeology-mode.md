# Archaeology Mode

> **Inferring doctrine from an existing project.**
>
> Analyze decisions, not personalities.
> Infer norms, not motives.

Solo Mode and Team Mode both assume you're inside a project from the start, building doctrine as you go. **Archaeology Mode** is different: you're entering a project that already exists — someone else's open-source project, a legacy codebase you inherited, a new employer's repo — and you need to infer the project's judgment system from what's already there.

This doc explains how.

---

## TL;DR

- Archaeology Mode reads **public artifacts** (PRs, issues, reviews, release notes, CONTRIBUTING), not private channels.
- It produces **hypotheses about decision patterns**, not verdicts about people.
- Best signal is usually in **rejected PRs** and **heavily reviewed PRs**, not merged ones.
- Output: a project-doctrine brief, contribution strategy, and review-risk map.
- **Every inferred entry carries a confidence level and evidence.** Unmarked confidence = unusable.
- The goal is **reducing review-cycle waste and rejection rates**, not gaming maintainers or bypassing review.

---

## Why this mode exists

Most agent-assisted onboarding into an unfamiliar project looks like:

> "Analyze this codebase and tell me what you see."

That produces an architecture map. Architecture maps answer: *how does this system work?*

They don't answer:

- What kinds of patches get accepted here?
- What kinds of changes get quietly rejected or stall in review?
- What evidence do reviewers expect?
- What tradeoffs does this project repeatedly make?
- What is "good" here?
- What is "not how we do it" here?

A new contributor (human or agent) who writes technically correct code but violates the project's unstated judgment system will get rejected anyway. The code wasn't wrong; the **shape** was wrong.

Archaeology Mode closes that gap by reading the **record of past judgments** — PRs, issues, reviews — to infer the shape the project expects.

---

## The ethical line

This is the single most important paragraph in this doc.

> **Analyze public decisions. Do not analyze private personality.**

What Archaeology Mode may do:

- Read public PR / issue / review / discussion artifacts
- Summarize patterns in what gets accepted or rejected
- Describe evidence expectations reviewers have demonstrated
- Infer the project's taste and tradeoff priorities
- Catalogue the conventions contributors tend to follow

What Archaeology Mode must NOT do:

- Psychoanalyze specific maintainers ("X is controlling," "Y prefers Z because...")
- Speculate about private motives
- Label individuals with personality traits
- Build strategies for manipulating specific people
- Teach users how to flatter, evade, or game reviewers
- Describe any interaction a reasonable maintainer would find intrusive

The short form:

> **Analyze decisions, not personalities. Infer norms, not motives.**

If an output paragraph couldn't be shown to the maintainers it's about without them finding it uncomfortable, it's over the line.

---

## What Archaeology Mode reads

Inputs, roughly in order of signal-per-effort:

### High signal

- **Rejected or closed-without-merge PRs** — what the project refused
- **Heavily reviewed PRs** — where the project's judgment surfaces in back-and-forth
- **Reopened issues** — what wasn't settled
- **Maintainer pushback comments** — "not this way" is often more informative than "LGTM"
- **Design debates** — public RFCs, architecture discussions
- **Scope-reduction discussions** — where maintainers cut a proposal down
- **Release-note framing** — what the project calls "important"

### Medium signal

- **Merged PRs that needed multiple rounds** — what shape the code had to become
- **CONTRIBUTING.md / governance docs** — explicit rules (useful but often out of date)
- **Issue triage patterns** — what gets labeled, what gets closed as "wontfix"
- **Roadmap / milestones** — stated priorities

### Lower signal (but not useless)

- **Merged PRs that went through cleanly** — teach less than contested ones
- **README / top-level docs** — canonical identity, rarely the source of friction
- **Commit message style** — local convention, not deep judgment
- **Dependency choices** — technical, rarely ideological

**The counterintuitive insight:** merged PRs teach you what the project accepts *eventually*. Rejected PRs teach you what the project refuses *immediately*. The refusal data is usually denser in judgment.

---

## What Archaeology Mode produces

Archaeology Mode produces specific reports, not one monolithic doctrine. Each serves a different purpose.

### 1. `project-doctrine-brief.md`

The overall inferred doctrine. Answers:

- What does this project believe it is for?
- What tradeoffs does it repeatedly make?
- What directions does it refuse?
- What counts as "good" here?
- What counts as "wrong shape"?

### 2. `contribution-strategy.md`

Action-oriented guidance for a contributor. Answers:

- Where should a new contributor start?
- What PR size tends to be accepted?
- Does this project want an issue filed first?
- What evidence should a PR carry (tests, benchmarks, migration path)?
- What subsystems are sensitive?

### 3. `review-risk-map.md`

Forward-looking risk analysis for a specific planned change. Answers:

- Where is this PR most likely to be pushed back on?
- What reviewer concerns should be pre-addressed?
- What designs need an RFC first?
- What tests are non-negotiable?

### 4. `maintainer-decision-patterns.md` (note the name)

**Patterns**, not personality. Answers:

- What themes do reviewers repeatedly raise?
- How does the project handle scope creep?
- Does the project prefer small patches or large refactors?
- Does it require evidence, or accept taste judgments?
- What's the project's stance on backward compatibility?

### 5. `failure-memory-candidates.md`

Not about the project *failing* — about contribution patterns that consistently fail review:

- Common rejection reasons
- Design directions the project has declined before
- Traps new contributors fall into

These candidates can be promoted into the project's own failure-memory if you later build doctrine inside the project.

### 6. `taste-examples-candidates.md`

Good/bad contrast pairs inferred from reviews:

- PRs reviewers praised as "the right shape"
- PRs reviewers flagged as "not how we do this"
- The deltas between the two

---

## The 7-step process

### Step 1 — Read the explicit doctrine

Start with what the project already states:

- `README.md`
- `CONTRIBUTING.md`
- `docs/` directory
- `GOVERNANCE.md` (if present)
- `ROADMAP.md` or similar
- Top-level design docs / ADRs

This is the **explicit** layer. Assume it is partially true and partially outdated. Note which parts you trust vs which look stale.

### Step 2 — Sample PR / issue history

For a small project, read broadly. For a large project, sample per subsystem.

Minimum viable sample:

- 5 recently merged PRs
- 5 recently rejected / closed-without-merge PRs
- 5 heavily reviewed PRs (any outcome)
- 5 design-level issues
- Most recent release notes / milestone summaries

Larger projects: scale the sample, stratified by subsystem.

### Step 3 — Extract repeated review concerns

Categorize patterns you see in review comments. Common axes:

- Scope ("too big", "split this up")
- Missing tests
- Backward compatibility
- Performance
- API design
- Maintainability / code organization
- Security / trust boundaries
- Documentation expectations
- User experience
- Project-direction mismatch

Count the occurrences. The ones that show up across many PRs are doctrine.

### Step 4 — Infer doctrine candidates

Translate review patterns into durable-sounding rules:

**Raw observation:**
> In 4 out of 5 large parser PRs, reviewers asked for a failing test first.

**Doctrine candidate:**
> This project requires failing tests to be written before parser-behavior changes are accepted.

Phrase each candidate as a rule a future contributor could use. Mark as **candidate** — it's inferred, not official.

### Step 5 — Find positive examples

Balance the rejection analysis with positive cases:

- PRs that merged quickly with praise
- PRs the maintainer referenced as "good example of X"
- Patterns that became templates for later PRs
- Shapes the reviewers affirmed

These become your taste-examples candidates — "this is what good looks like here."

### Step 6 — Write the contribution strategy

Translate doctrine into actionable advice:

> **Before opening a PR:**
> - Open an issue first for API-level changes
> - Include a failing test for parser changes
> - Keep the first PR under ~300 LOC when possible
> - Avoid touching generated files
> - If changing an abstraction, include migration notes

This is where archaeology output becomes useful, not just descriptive.

### Step 7 — Mark confidence and evidence

Every inferred entry MUST carry:

```markdown
**Confidence:** high / medium / low
**Evidence:**
- PR #123 (reviewer comment)
- PR #456 (rejection reason)
- issue #789 (maintainer decision)
```

Without these, the output reads as official rule and will mislead users. Inference without evidence is speculation.

**Confidence guide:**
- **High** — pattern visible in 5+ independent artifacts, over recent months
- **Medium** — pattern visible in 2–4 artifacts, or older but uncontradicted
- **Low** — suggested by 1 artifact, or contradicted by another — explicitly provisional

Low-confidence entries are still useful (they're hypotheses to validate) but should be flagged clearly.

---

## Maintaining the boundary in practice

Concrete examples of the line.

### ✅ OK

> **Inferred:** This project rejects large cross-cutting refactors unless they unlock a concrete bug fix.
>
> **Evidence:** PRs #442, #518, #601 were closed after review noted refactor-without-bug-fix pattern. PR #523 (also a refactor) was merged because it was attached to a specific parser bug.
>
> **Confidence:** high

### ❌ Not OK

> **Inferred:** The lead maintainer prefers simple code because they find complex abstractions stressful.

That's personality speculation. Not evidence-based, not public-decision-based, and unusable.

### ✅ OK (even when it involves a person)

> **Inferred:** Reviewer @maintainer has consistently requested that parser changes include a benchmark comparison.
>
> **Evidence:** Comments on PRs #201, #245, #311.
>
> **Implication for contributors:** Attach benchmarks to parser PRs; it's an established expectation, not a surprise ask.

This is fine because it's **a public pattern with evidence**, framed as an expectation to prepare for — not a personality claim or manipulation strategy.

### Rule of thumb

Could the maintainer, reading this entry, say "yes, that's accurate, and I'm comfortable with it being quoted"? If yes, it's in bounds. If not, rewrite.

---

## How agents should run Archaeology Mode

When a user asks for this:

> "I want to start contributing to project X. Use archaeology mode to infer its doctrine."

The agent should:

1. **Confirm scope.** What's the user's goal — one PR, ongoing contribution, full onboarding? The depth scales with the goal.
2. **Confirm ethical frame.** "I'll analyze public artifacts and produce decision-pattern hypotheses. I won't profile individual maintainers." Get explicit agreement.
3. **Run the 7-step process.** Produce the 3–6 output files.
4. **Mark confidence everywhere.** No confidence level = no output.
5. **Surface the highest-leverage findings first.** "Before opening your first PR, the three things that most reduce rejection risk are..."
6. **Propose validation.** "When you open a PR, here's what to confirm with maintainers if the change is substantial."

If the user pushes toward personality analysis or maintainer-gaming, the agent refuses and re-anchors on the ethical frame.

---

## When to use Archaeology Mode

**Good fit:**
- Entering an open-source project as a new contributor
- Inheriting a legacy codebase
- New employee onboarding where reading the code isn't enough
- Contractor picking up someone else's project
- An agent (bot) submitting automated PRs and learning what gets accepted
- Multi-agent setups evaluating unfamiliar repos

**Bad fit:**
- A project where you already have full insider context (use Solo or Team Mode)
- A project with no meaningful review history yet (nothing to infer from)
- A project whose public artifacts are actively misleading (closed-source planning with public-only surface)
- Any setting where the user wants to use output to manipulate specific people — refuse

---

## What this is NOT

- **Not a replacement for talking to maintainers.** When a planned change is substantial, contact them.
- **Not a guarantee your PR will be accepted.** It reduces risk, doesn't eliminate it.
- **Not authority.** It produces *hypotheses about project norms*, not official rules.
- **Not a personality profile.** Ever.
- **Not a shortcut around the project's judgment.** The goal is aligning with it, not bypassing it.

The product positioning line:

> **Archaeology Mode produces contribution hypotheses, not official truth.
> Use it to reduce review friction, not to bypass maintainers.**

---

## Why this belongs in Havamal

Solo Mode and Team Mode are about *preserving* judgment inside a project. Archaeology Mode is about *inferring* judgment that was already paid for but never written down.

Together they are the three pillars:

1. **Solo Mode** — preserve judgment for future-you and your agents
2. **Team Mode** — make team judgment explicit and reviewable
3. **Archaeology Mode** — infer project judgment from existing code, PRs, issues, and reviews

With all three, Havamal isn't just "my personal agent-memory tool." It's a general methodology for **AI agents entering unfamiliar projects.**

---

## Templates

Three ready-to-fill templates live at:

- [`templates/archaeology-report.md`](../templates/archaeology-report.md) — the per-project doctrine brief + pattern library
- [`templates/contribution-strategy.md`](../templates/contribution-strategy.md) — action-oriented contribution guide
- [`templates/review-risk-map.md`](../templates/review-risk-map.md) — forward-looking risk map for a specific planned change

---

## The boundary, one more time

> **Analyze decisions, not personalities.
> Infer norms, not motives.**

If you remember nothing else, remember this.

---

## Related

- [`solo-mode.md`](solo-mode.md) — building doctrine inside your own project
- [`team-mode.md`](team-mode.md) — team-shared doctrine
- [`six-layer-model.md`](six-layer-model.md) — layer definitions (useful when inferred entries get promoted)
- [`failure-memory.md`](failure-memory.md) — how to write failure-memory entries (archaeology candidates can graduate)
- [`taste-examples.md`](taste-examples.md) — how to write taste examples (same)
- Chinese version: [`archaeology-mode.zh.md`](archaeology-mode.zh.md)
