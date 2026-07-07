# Everyday Use

> **Use handoff when work needs to continue.
> Use doctrine when judgment needs to continue.**

You don't "manage doctrine" daily. You load it when you're about to make a call that your project's accumulated judgment should shape.

Most of the time, you use it by telling your agent:

> Read the project doctrine first.

That's it. The agent reads the load-protocol files, re-enters the project's stance, and then does the work you asked for. You don't have to remember the six layers, the bootstrap protocol, or the file paths — you just have to know that before judgment-heavy moments, doctrine gets loaded.

---

## TL;DR

- Developers don't interact with doctrine directly. They interact with agents.
- The everyday usage is a one-liner: "read the doctrine first."
- Agents should auto-load doctrine for judgment-heavy moments, skip it for trivial ones.
- Most value comes from 9 specific moments (below).
- The test of a good doctrine: you find yourself saying "just read the doctrine" more often than re-explaining the project.

---

## How developers actually use it

You don't wake up thinking "I should use Havamal today." You wake up and say one of these to your agent:

- "Pick up where we left off."
- "Take a look at this project."
- "Review this plan."
- "Is this direction right?"
- "Don't make that mistake again."
- "I opened a new session — you figure out where we are."

All of those should trigger the agent to load doctrine.

The design job is: make sure your agent *knows* that those asks mean "read the doctrine first." The bootstrap-prompt, the CLAUDE.md / AGENTS.md / GEMINI.md reference, and the apprenticeship-check are how you train that reflex.

Once trained, the experience is invisible. You stop re-explaining the project. The agent inherits the stance.

---

## The 9 situations where loading doctrine pays

Each one: **what the developer says** → **what the agent should do** → **why it matters**.

### 1. Starting a new session

**Developer says:**
- "New session — you load up the project."
- "Take a look at where we are."

**Agent does:**
1. Read `SKILL.md`
2. Read `state-snapshot.md`
3. Read L1 / L5 / L6
4. Read `failure-memory.md`
5. Report back, briefly:
   - Current state
   - Durable doctrine
   - Stale context (anything in docs that's no longer true)
   - Likely next moves

**Why:** this is the most common replacement for a handoff. You don't re-explain the project every session. The agent inherits the stance from the files.

### 2. Before starting a new feature

**Developer says:**
- "I want to build X next — use the doctrine to tell me how to approach it."
- "How do we usually slice this kind of thing?"

**Agent does:** read L1 (ideology), L3 (methods), L5 (thinking modes), failure-memory, taste-examples. Then answer:
- Which layer does this task belong to?
- What's the smallest safe slice?
- What directions should we NOT take?
- What gate does this need (feature flag, kill-switch, review)?

**Why:** prevents "ship big, regret later." Keeps new features inside the school.

### 3. Before writing a plan

**Developer says:**
- "Write an implementation plan, but run the doctrine check first."

**Agent does:**
1. Read doctrine
2. Check failure-memory for patterns this plan might re-trigger
3. Write the plan with explicit sections:
   - Invariants
   - Forbidden list (things the plan commits to NOT do)
   - Acceptance gates
   - Stale-context warnings
   - What not to do

**Why:** especially valuable when multiple agents are working. A plan that passed doctrine-check before execution is safer than a plan reviewed after.

### 4. Reviewing a plan

**Developer says:**
- "Review this plan against the doctrine."
- "Is this consistent with how we decide?"

**Agent does:** not just a technical review. Asks:
- Does it violate any L1 conviction?
- Is it using an old framing (L2 stale)?
- Is it treating temporary state as durable doctrine?
- Is it re-running a failure-memory pattern?
- Is it introducing a trust-boundary the project has already refused?
- Is it a generic best-practice that doesn't fit this project?

**Why:** catches drift that a pure technical review misses.

### 5. After a PR / merge

**Developer says:**
- "This PR merged — update the doctrine."

**Agent does:** decide whether this was:
- Just a state update → update `state-snapshot.md` only
- A new tempting-mistake class observed → add to `failure-memory.md`
- A new taste call worth preserving → add to `taste-examples.md`
- An old plan superseded → mark stale in L2 and note in state-snapshot
- A scar earned → L6 heart-method candidate
- Provenance-worthy → update `provenance.md`

**Why:** doctrine decays if it isn't refreshed. Not every PR triggers a doctrine update, but important PRs should at least be *asked* the question.

### 6. When agents repeat a mistake

**Developer says:**
- "You keep doing this. Write it into the doctrine."

**Agent does:** generalize the specific mistake into a failure-memory entry (temptation / how it failed / future detection / correct move). Possibly also compress into an L6 heart method if the scar is significant.

**Why:** this is the highest-leverage use. "I don't want to explain this again" becomes inheritable rule.

### 7. When the project direction shifts

**Developer says:**
- "We pivoted. Adjust the doctrine, not just the handoff."

**Agent does:** edit:
- Doctrine thesis / identity statement
- L1 ideology (which convictions still hold?)
- L2 current state (new reading ladder)
- L5 thinking modes
- `provenance.md` (record the shift)

And carefully triage: still valid / needs revision / superseded. A pivot doesn't mean everything old is wrong.

**Why:** safer than rewriting a README. Keeps the record of *what the project used to believe and why*.

### 8. New human or new agent onboarding

**Developer says:**
- "Onboard this agent using the doctrine."
- To a new team member: "Don't just read the README — read the doctrine."

**Agent / new person does:** run the apprenticeship-check (6 questions). Answer them project-specifically. The questions test both the doctrine and the new entrant.

**Why:** fresh eyes either pass (they've entered the school) or fail in a way that reveals doctrine gaps. Both outcomes are useful.

### 9. Porting the method to a new project

**Developer says:**
- "Use the havamal-builder to set this up for my trading agent."

**Agent does:** NOT transplant any other project's doctrine. Use the `skills/havamal-builder/` skill to:
- Ask about the new project's domain core
- Identify its worst-case wrong version
- Gather existing failure memory
- Gather taste examples
- Customize the apprenticeship check

**Why:** the six-layer structure is universal; the content must be extracted from the specific project.

---

## Ready-to-use commands

Copy-paste these into your agent. Each one triggers doctrine loading for a specific moment.

### New session

**EN:**
> Read the project doctrine and give me the current state, durable doctrine, stale context, and likely next moves.

**ZH:**
> 先讀 project doctrine，告訴我目前狀態、不可變心法、過期脈絡、下一步可能做什麼。

### Before a new feature

**EN:**
> Before planning this feature, read the doctrine and tell me the smallest safe slice and what we should not do.

**ZH:**
> 做這個功能前，先讀 doctrine，告訴我最小安全切片，以及哪些方向不要做。

### Review a plan

**EN:**
> Review this plan against the project doctrine. Focus on stale framing, trust-boundary violations, repeated failure patterns, and scope drift.

**ZH:**
> 用 project doctrine 審查這份 plan，重點看過期框架、信任邊界、重複犯錯、scope drift。

### Update doctrine after a PR

**EN:**
> This PR changed how we think. Update the doctrine: state snapshot, failure memory, taste examples, and provenance if needed.

**ZH:**
> 這個 PR 改變了我們的判斷方式，幫我更新 doctrine：state snapshot、failure memory、taste examples、provenance，必要才改。

### Record a recurring mistake

**EN:**
> We keep repeating this mistake. Turn it into a failure memory entry.

**ZH:**
> 這個錯我們一直重複，把它寫成 failure memory。

### Compress a lesson into L6

**EN:**
> This decision feels important. Decide whether it belongs in L6 heart methods, and if yes, write the entry with evidence.

**ZH:**
> 這個決策好像很重要，判斷它是不是 L6 heart method；如果是，請附上證據和來源。

### Agent onboarding

**EN:**
> Use the apprenticeship check to verify that you understand this project before proposing work.

**ZH:**
> 先跑 apprenticeship check，證明你理解這個專案，再提工作計畫。

---

## Which situation are you in?

Doctrine usage varies by setup. Match yourself to one of these.

### A. Solo developer with AI agents

**Minimum files to actively maintain:**
- `state-snapshot.md`
- `layer-1-ideology.md`
- `layer-5-thinking-modes.md`
- `layer-6-heart-methods.md`
- `failure-memory.md`
- `bootstrap-prompt.md`

**Update cadence:** weekly, or after a major feature.

**Everyday interaction:** "read the doctrine first" before any non-trivial work. That's 90% of the discipline.

### B. Solo developer with multiple AI agents in parallel

**Same files as A, but stricter about:**
- Every agent reads doctrine before starting
- Every plan-review references failure-memory
- When an agent makes a mistake, immediately file it as a failure-memory entry
- When an agent makes a good judgment call, preserve it as a taste example

Doctrine becomes the **shared brainstem** across agents.

### C. Team (multiple humans + agents)

**Add:**
- `governance.md`
- `decision-records.md`
- Doctrine changes via PR with owner review
- "Before merging this plan, check whether it changes doctrine."

**Update cadence:** review cadence defined in governance (weekly or post-milestone).

**Discipline shift:** from "fast" (solo) to "reviewable consensus" (team).

### D. Taste-heavy project (product / design / content)

**Emphasize:**
- `taste-examples.md` (high volume)
- `layer-6-heart-methods.md`
- `apprenticeship-check.md`

Because taste can't be written as adjectives ("elegant," "natural," "thoughtful"). It has to be encoded as contrast pairs.

### E. High-risk domain (trading, research, regulated software)

**Emphasize:**
- `failure-memory.md` (dense, well-detected)
- Evidence rules and adversarial checks in L3 / L5
- Deferred evaluation rather than immediate execution
- Risk gates at every decision boundary

Doctrine in these domains is a **risk-governance tool**, not a taste tool.

---

## When agents should proactively load doctrine

An agent that reads doctrine on every trivial request feels heavy. An agent that never reads doctrine drifts.

The balance: **load when judgment matters, skip when it doesn't.**

### Auto-load triggers

The agent should say "let me read the doctrine first" when:

- User says "next step" or "what's next"
- User asks for a plan
- User asks "is this direction right?"
- User asks for a review
- User says "don't make that mistake again"
- User references an old decision
- The task touches prompts, runtime, or trust boundaries
- The task builds an automated loop
- The task deletes or archives something
- A new session has started
- Work resumes after a long interrupt

### Skip-load situations

Don't pre-load doctrine for:

- Small bugs
- Formatting fixes
- Questions about a local API / symbol
- Running tests
- Fixing typos
- Looking up a specific file
- One-off scripts outside the doctrine's scope

A good heuristic: if the task could be done by a generic competent agent without project context, doctrine is probably optional. If the task requires knowing *what this project judges as good*, doctrine is required.

---

## Mental model — what the developer actually has to remember

You don't need to learn the six-layer theory. You need to remember five moments:

1. **New session** → read doctrine
2. **Big plan** → check doctrine
3. **Review direction** → against doctrine
4. **Same mistake twice** → into doctrine
5. **Big milestone** → update doctrine

That's it. Everything else (the layers, the protocols, the templates) is the agent's job to handle once the loader is wired up.

---

## Anti-patterns in everyday use

- **Loading doctrine for every tiny edit.** Heavy, slow, and dilutes the signal.
- **Never loading doctrine.** The project's judgment atrophies session by session.
- **Letting the doctrine go stale.** Agents load old framing and reason from it as if current.
- **Agent paraphrases instead of using.** Reading the files is not entering the posture — run the apprenticeship check.
- **Developer tries to maintain doctrine in their head.** That's exactly the thing the doctrine replaces.

---

## The one-line product positioning

> **Use handoff when work needs to continue.
> Use doctrine when judgment needs to continue.**

Handoffs answer *what happened*. Doctrines answer *how we decide*. They are complementary — use both, keep them in separate files, load them in different moments.

The developer's day is mostly handoff. The developer's hardest moments are doctrine.

---

## Closing principle

Doctrine is not daily maintenance. It's the thing that makes every session feel like *return* instead of *restart*.

You'll know it's working when you find yourself saying:

> "Just read the doctrine."

more often than:

> "Let me re-explain the project."
