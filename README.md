# Hávamál

> **Your agent forgets why your project judges the way it does — every new session.**
> Havamal turns hard-won judgment — scars, taste, non-negotiables — into a loadable posture for AI agents.
> Start with 4 files in 30 minutes.

_Formerly `project-doctrine` (old links redirect). Renamed after the Norse **Hávamál** — the poem of hard-won maxims inside the Edda. A saga records what happened; the Hávamál teaches how to judge. That is exactly the split this repo cares about:_

> **Use handoff when work needs to continue.
> Use doctrine when judgment needs to continue.**
>
> _Handoff tells an agent what happened.
> Doctrine teaches an agent how to judge._

> 中文版 README：[`README.zh.md`](README.zh.md)

## Start here: Minimum Viable Doctrine (30 minutes)

> **Start with MVD. Expand only when absence hurts.**
>
> _The first doctrine does not need to be complete. It only needs to save the next session._

The repo is large, but the **first run is small**. A **Minimum Viable Doctrine (MVD)** is:

- **4 files**, filled in 30 minutes:
  1. `state-snapshot.md` — where the project is now
  2. `layer-1-ideology.md` — what must stay true (3 entries)
  3. `failure-memory.md` — what mistakes should not repeat (3 entries)
  4. `bootstrap-prompt.md` — how the next agent should load the project
- **One reference line** in your runtime config (CLAUDE.md / AGENTS.md / GEMINI.md)
- **One test** — a fresh agent session answers: current state, one durable conviction, one tempting mistake

That's it. MVD is not "incomplete" — it's **useful**. Everything else is opt-in later.

→ **[`docs/getting-started.md`](docs/getting-started.md)** / 中文：**[`docs/getting-started.zh.md`](docs/getting-started.zh.md)**

**Two rules:**
- **If a file's absence isn't actively hurting you, leave it empty.**
- **Do not create doctrine debt** — never fill a template with empty words or write L6 entries without real scars.

---

## Why doctrine, not just handoff?

Most AI agent handoffs tell the next agent *what happened*. Havamal teaches the next agent *how to judge*.

A handoff says:

> We merged PR #42. Next, implement the renderer.

A doctrine says:

> This project separates semantic production from UI rendering. LLMs may propose structure, but deterministic runtime code owns buttons, callbacks, state transitions, and trust boundaries.

That difference matters.

---

## What This Is

Havamal is a method for turning a project's hard-won experience into a reusable posture loader for AI agents.

It captures:

- project ideology
- current state
- validated methods
- operating procedures
- thinking modes
- failure memory
- taste examples
- apprenticeship checks

The goal is not to summarize a project. The goal is to help future agents make better project-native decisions without forcing the user to reteach the same lessons.

---

## Why Handoffs Are Not Enough

Handoffs are useful, but they decay quickly.

They usually answer:

- What happened?
- What changed?
- What should happen next?

They often fail to answer:

- Why was this direction chosen?
- What tempting path should be avoided?
- What kind of output belongs to this project?
- What failures has the project already paid for?
- What should a future agent refuse to do?
- How does a new agent prove it understands the project?

Havamal fills that gap.

---

## Core Idea

Every serious project eventually develops a school.

A school has:

- beliefs
- taboos
- taste
- methods
- scars
- language
- judgment

Havamal makes that school explicit.

---

## The Six-Layer Model

A project doctrine is organized into six layers. See [`docs/six-layer-model.md`](docs/six-layer-model.md) for details.

### L1 — Ideology

What must stay true. The durable beliefs, product philosophy, trust boundaries, and non-negotiables.

### L2 — Knowledge

What is currently true. Current phase, shipped state, active specs, recent commits, open blockers, stale docs.

### L3 — Methods

What has been proven to work. Validated ways of planning, reviewing, implementing, testing, and correcting.

### L4 — SOPs

What should be repeated. Operational recipes for recurring work.

### L5 — Thinking Modes

How to reason. The postures the project needs: evidence-only, dialectic, deterministic, taste review, safety gate.

### L6 — Heart Methods

What the project has paid to learn. Compressed lessons, scars, maxims, and judgment rules with concrete origin.

**L6 is not motivational slogans.** If there is no failure behind it, it probably does not belong in L6.

---

## Doctrine vs Docs vs Memory vs Handoff

| Artifact | Purpose |
|---|---|
| README | Explains what the project is |
| Architecture doc | Explains how the system works |
| Handoff | Explains what just happened |
| Memory | Preserves important facts and preferences |
| **Doctrine** | **Teaches future agents how to judge** |

A good project needs all of them. But they should not be mixed.

See [`docs/doctrine-vs-handoff.md`](docs/doctrine-vs-handoff.md) for the full comparison.

---

## What A Doctrine Skill Looks Like

A typical project doctrine skill looks like this:

```
docs/skills/<project>-session-experience/
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

The most important files are not always the state snapshot.

Often the most valuable files are:

- `failure-memory.md`
- `taste-examples.md`
- `layer-6-heart-methods.md`
- `apprenticeship-check.md`

Those files teach judgment.

---

## Failure Memory

Failure memory records tempting mistakes.

Not blame. Not bugs. Not shame.

A good failure memory entry explains:

- why the wrong move looked reasonable
- how it failed
- how to detect it next time
- what to do instead

Example:

### FM-3: LLM-Generated UI Actions

- **Temptation:** Let the model emit button syntax directly in its response.
- **How it failed:** It blurred the trust boundary between semantic generation and executable UI.
- **Future detection:** Any plan where model output becomes callback data, ids, links, or state transitions.
- **Correct move:** Let the model produce semantic blocks. Let deterministic runtime code render UI.

See [`docs/failure-memory.md`](docs/failure-memory.md) for the full method.

---

## Taste Examples

Taste examples teach what good looks like through contrast.

Adjectives are weak. Examples are stronger.

Instead of saying:

> The product should feel thoughtful.

Show:

**Good:**
The system keeps lifecycle state in the store and renders buttons deterministically.

**Bad:**
The assistant says "I can archive this for you" but no state transition exists.

**Why good wins:**
The first creates recoverable product behavior. The second creates conversational theater.

See [`docs/taste-examples.md`](docs/taste-examples.md) for the full method.

---

## Apprenticeship Check

A new agent should not just read the doctrine. It should prove it can use it.

A good apprenticeship check asks:

- What is current?
- What is durable?
- What is stale?
- Which tempting plan should be rejected?
- Which layer does this task belong to?
- What is the smallest safe next move?

If an agent can answer those, it has entered the project school.

See [`docs/apprenticeship-protocol.md`](docs/apprenticeship-protocol.md).

---

## Quick Start

1. Copy `templates/havamal-skill/` into your project (see paths per runtime below).
2. Fill in `state-snapshot.md`.
3. Write L1, L5, and L6 first.
4. Add at least 3 failure memory entries.
5. Add at least 3 taste examples.
6. Write an apprenticeship check.
7. Use the doctrine before planning new work.

### Installation paths

Just `git clone` and `cp -r` — plus an optional zero-dependency CLI (see **Machine face** below). The directory you copy to depends on your agent runtime:

| Runtime | Path |
|---|---|
| Claude Code (project) | `.claude/skills/<project>-doctrine/` |
| Codex / Gemini / agent-neutral | `docs/skills/<project>-doctrine/` + reference from `AGENTS.md` / `GEMINI.md` |
| Cursor | `docs/skills/<project>-doctrine/` + pointer from `.cursor/rules/` |
| No specific runtime | `docs/skills/<project>-doctrine/` — any agent can read it |

Full install guide (all runtimes, builder skill, archaeology templates, updates, uninstall): [`docs/install.md`](docs/install.md) / 中文：[`docs/install.zh.md`](docs/install.zh.md)

Step-by-step for filling the template: [`docs/migration-guide.md`](docs/migration-guide.md)

## Machine face

Doctrine that relies on being remembered decays — its own authors forget it. Two commands (zero dependencies, Node 18+) make it load-bearing:

```bash
node bin/havamal.mjs check docs/skills/<project>-doctrine   # doctrine-debt lint: MVD present, no template filler, scars have origins
node bin/havamal.mjs pack  docs/skills/<project>-doctrine --out .havamal-pack.md   # compressed hot pack for session-start injection
```

- **`check`** exits non-zero when MVD files are missing or filled with placeholder text — wire it into CI so doctrine debt blocks merges instead of accumulating. It also rejects unknown role names in profile markers (a typo'd marker would silently hide an entry from every slice), and surfaces the doctrine version when present (see **Doctrine version footer** below).
- **`pack`** exists because working agents consume compressed context, not full prose. Generate the pack, reference *it* from `CLAUDE.md` / `AGENTS.md`, and keep the full doctrine as cold storage for deep dives and disputes.

### Role profiles (one source, many slices)

Different roles need different judgment: an implementer needs the current state and the scars; a reviewer needs the ideology and the taste examples. `--profile` projects the **same doctrine body** into a role-shaped slice — profiles never fork files:

```bash
node bin/havamal.mjs pack docs/skills/<project>-doctrine --profile executor   # STATE + SCARS + L6
node bin/havamal.mjs pack docs/skills/<project>-doctrine --profile reviewer   # L1 + TASTE + SCARS
```

The slice header carries `profile: <name>` so downstream assemblers (e.g. a dispatch layer injecting doctrine into a kickoff prompt) can verify what they got. To scope a single entry to one role, put a marker on the first line after its heading — unmarked entries appear in every slice, and the full pack (no `--profile`) always includes everything:

```markdown
### FM-7: reviewers keep merging their own fixes
<!-- profile: reviewer -->
- **How it failed:** ...
```

Try it against the flagship example: `node bin/havamal.mjs check examples/wushantou-foundry/references`, then `node bin/havamal.mjs pack examples/wushantou-foundry/references --profile executor` (sample outputs: [`examples/wushantou-foundry/sample-packs/`](examples/wushantou-foundry/sample-packs/)). Tests: `npm test`.

### Doctrine version footer

Doctrine that ships gets promoted, amended, and (rarely) reframed. Leave a visible trace of each of those human sign-offs by ending one of your doctrine files with:

```markdown
<!-- havamal:version -->
Version: 0.5.0 | Ratified: 2026-06-15 | Last Amended: 2026-07-08
```

- **PATCH** — wording fix, no new promise
- **MINOR** — a new scar, taste example, or L-layer entry
- **MAJOR** — an incompatible reframe (rare; older packs may need re-injection)

When present, `check` echoes the current version, and every `pack` header carries it (e.g. `· version: 0.5.0`). Absent or malformed footers are surfaced as **notes**, never failures — the field is opt-in and always backward compatible.

### edda integration

<details>
<summary><strong>Do I need edda too?</strong></summary>

Short answer: **no — havamal is useful on its own**. Its contract is a plain markdown file that any harness can read: Claude Code, Codex, Cursor, Gemini CLI — reference the pack from `CLAUDE.md` / `AGENTS.md` and every new session picks it up. Adding [edda](https://github.com/fagemx/edda) buys you *auto-injection* (edda's SessionStart hook loads the pack for you) and separates the two layers cleanly: facts flow through edda, judgment enters through havamal. Use either alone; they compose when both are present.
</details>

If your sessions run [edda](https://github.com/fagemx/edda), the two compose as their names suggest — edda carries the sagas (facts, decisions, coordination), havamal carries the maxims (judgment):

```bash
havamal pack docs/skills/<project>-doctrine --out .havamal-pack.md
```

edda's SessionStart hook auto-injects `.havamal-pack.md` as a `## Doctrine (judgment layer)` section (override the path with `EDDA_DOCTRINE_PATH`, cap size with `EDDA_DOCTRINE_BUDGET_CHARS`). Division of labor: **facts flow automatically; judgment enters curated** — edda never generates judgment itself, because machine-extracted judgment without sign-off is noise. Regenerate the pack when the doctrine changes (a pre-commit hook or CI step works well); commit it or gitignore it — both are valid, committed packs travel with clones.

## Everyday Use

You don't "manage doctrine" every day. Most of the time you just tell your agent:

> Read the project doctrine first.

Use it at these moments:

- **New session** → read doctrine
- **Big plan** → check doctrine
- **Review direction** → against doctrine
- **Same mistake twice** → into doctrine
- **Big milestone** → update doctrine

Skip it for typos, formatting fixes, and trivial lookups.

Full guide: [`docs/everyday-use.md`](docs/everyday-use.md) / 中文：[`docs/everyday-use.zh.md`](docs/everyday-use.zh.md)

## Should doctrine live in the repo?

Usually, yes.

> **If a doctrine entry affects how the project should be built, reviewed, or maintained, it belongs with the project.**

Three layers:

- **`main`** — stable, shareable, public-safe (state-snapshot, L1, failure-memory, taste-examples, bootstrap-prompt, …)
- **branches / `references/incubation.md`** — drafts, candidates, round-in-progress
- **Outside repo (or private repo)** — sensitive, personal, speculative; individual-profile content never commits

**Preferred default path:** `docs/project-doctrine/` (agent-neutral; runtime adapters like `.claude/skills/` can be symlinks).

For public / open-source repos: only public-decision-based content. Archaeology Mode never profiles individuals. Solo doctrine still belongs in version control — just make the repo private.

Full guide (branch strategy, decision flow, public/private split, archaeology ethics): [`docs/repo-placement.md`](docs/repo-placement.md) / 中文：[`docs/repo-placement.zh.md`](docs/repo-placement.zh.md)

## Progress records are flexible

Different records serve different time scales — and no project needs all of them.

| Record | Time scale | Purpose |
|---|---|---|
| State snapshot | now | what is true today |
| Handoff | next session | how to continue a task |
| Narrative log | one arc | how a judgment formed |
| Decision record | durable decision | what was decided and why |
| Provenance | doctrine lifetime | where doctrine entries came from |

**Havamal prescribes the promotion path, not the format:**
`raw progress → narrative → decision → doctrine`

Use the smallest record that preserves the needed judgment. Don't turn every update into doctrine.

Full guide (which records for which mode, decision flow, anti-patterns): [`docs/progress-records.md`](docs/progress-records.md) / 中文：[`docs/progress-records.zh.md`](docs/progress-records.zh.md)

Execution state, control planes, and lane parallelism are **not havamal's job** — that is state management, and it belongs to running software: use [edda](https://github.com/fagemx/edda) (facts, decisions, and coordination flow automatically). Havamal keeps only the judgment layer. The old hand-maintained markdown methods are preserved in [`docs/archive/`](docs/archive/) for provenance.

## Maintenance

Do not put everything into doctrine.

> **Git stores history.
> Doctrine stores usable judgment.**

When something important happens, triage it into one of four fates:

- **Keep** — still fires, leave in place
- **Promote** — handoff observation → durable rule (failure-memory, taste, L6)
- **Archive** — historical, mark as such ("Do not use as current doctrine")
- **Delete** — duplicated / misleading / no judgment value (git keeps it if needed)

If unsure, park it in `references/incubation.md` and revisit next review.

Guiding principle:

> **Doctrine should get smaller and sharper over time, not bigger and heavier.**

Full guide (lifecycle, triage template, review cadence, anti-patterns): [`docs/maintenance.md`](docs/maintenance.md) / 中文：[`docs/maintenance.zh.md`](docs/maintenance.zh.md)

---

## Usage Modes

Havamal supports three modes. The six-layer structure is the same; what changes is *where the judgment comes from*.

### Solo Mode

> A doctrine is a memory prosthetic for your future self and your agents.

Building doctrine inside your own project, as you go. Low ceremony. Personal voice OK. Updates without PRs.

Full guide: [`docs/solo-mode.md`](docs/solo-mode.md).

### Team Mode

> A doctrine is a shared judgment contract for humans and agents.

Multiple humans and agents sharing a project. Governance required. Failure memory de-personalized. Two extra files: `governance.md` and `decision-records.md`.

Full guide: [`docs/team-mode.md`](docs/team-mode.md).

### Archaeology Mode

> **Analyze decisions, not personalities.
> Infer norms, not motives.**

Entering a project that already exists — open-source, legacy, inherited, new employer — and inferring its doctrine from public artifacts (PRs, issues, reviews, release notes).

Produces contribution hypotheses, not official rules. Every inferred entry carries confidence + evidence. The goal is reducing review-cycle waste, not gaming maintainers.

Full guide: [`docs/archaeology-mode.md`](docs/archaeology-mode.md) / 中文：[`docs/archaeology-mode.zh.md`](docs/archaeology-mode.zh.md).

### Which mode should I use?

Use **Solo Mode** if you're the primary builder of your own project and work mostly with agents.

Use **Team Mode** if multiple humans + agents contribute to the same codebase and judgment needs to be reviewable.

Use **Archaeology Mode** if you're entering a project from outside and need to understand its public decision patterns before opening PRs.

Use **none** if:
- The project is small and a README is enough
- No real failures or taste decisions have happened yet
- The project is a one-off deliverable with no future audience

**Doctrine is useful after a project has scars — yours, your team's, or the project's you're joining.**

## When Should You Create One?

**Not on day one.**

Create a Havamal after the project has:

- a working skeleton
- a few high-context sessions
- repeated agent mistakes or user corrections
- rejected directions
- meaningful failure memory
- enough taste examples to show what belongs and what does not

Too early, doctrine becomes **aspiration**.
Too late, doctrine becomes **archaeology**.

The best time is: **after skeleton, before sprawl.**

Full guide + readiness rubric + three creation modes (lightweight / full / recovery):
[`docs/when-to-use.md`](docs/when-to-use.md) / 中文：[`docs/when-to-use.zh.md`](docs/when-to-use.zh.md)

---

## Examples

See [`examples/`](examples/):

- [`wushantou-foundry/`](examples/wushantou-foundry/) — **flagship: a real doctrine from a real public project**, every scar with provenance (start here)
- [`software-project/`](examples/software-project/) — a fully-fleshed skeleton for a typical software product
- [`trading-agent/`](examples/trading-agent/) — outline for a quant / trading-agent project
- [`ai-short-drama-factory/`](examples/ai-short-drama-factory/) — outline for an AI-content pipeline
- [`research-agent/`](examples/research-agent/) — outline for a long-running research agent

---

## Core Principle

> **Do not summarize the project.
> Extract the school.**

## One-sentence definitions

**Solo Mode:**
> A doctrine is a memory prosthetic for your future self and your agents.

**Team Mode:**
> A doctrine is a shared judgment contract for humans and agents.

**Archaeology Mode:**
> Analyze decisions, not personalities. Infer norms, not motives.

中文：

> 個人模式：Doctrine 是未來的你和你的代理，用來接住現在判斷力的外接記憶。
>
> 團隊模式：Doctrine 是人類與代理共同使用的判斷契約。
>
> 考古模式：分析決策，不分析人格；推論規範，不揣測動機。
>
> **AI 代理越來越會做事，但它們還是不知道一個專案為什麼這樣判斷。
> Handoff 保存工作連續性。
> Havamal 保存判斷連續性。**

---

## License

MIT — see [`LICENSE`](LICENSE).
