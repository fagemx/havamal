# Repo Placement & Privacy

> **Havamal is a project asset. Version-control it.
> But not every thought belongs in main.**

Where should doctrine live? Should it be in the repo? What goes in `main` vs a branch? What should never be committed at all? This doc answers those.

---

## TL;DR

- **Default: doctrine lives in the repo.** It affects how the project is built, reviewed, and maintained — so it belongs with the project.
- **Preferred directory: `docs/project-doctrine/`** (agent-neutral). Runtime-specific adapters like `.claude/skills/` or `.codex/skills/` can be added later.
- **Three layers:**
  - `main` — stable, shareable, public-safe
  - branches — drafts, incubation, round-in-progress
  - outside repo — sensitive, personal, speculative
- **For public/open-source repos:** only public-decision-based content. Archaeology Mode inferences about individuals never go public.
- **Solo doctrine still belongs in a repo** — just make the repo private or use a private branch.

---

## The one-sentence rule

> **If a doctrine entry affects how the project should be built, reviewed, or maintained, it belongs with the project.**

Put stable, shareable doctrine in the repo. Keep private, sensitive, or speculative notes outside the repo or on a private branch.

---

## Three layers

### Layer 1 — Shared doctrine (lives in `main`)

The stable, shareable core. Goes in `main` and is version-controlled like source code.

Contents:

- `state-snapshot.md`
- `layer-1-ideology.md`
- `failure-memory.md`
- `taste-examples.md`
- `layer-5-thinking-modes.md`
- `layer-6-heart-methods.md`
- `bootstrap-prompt.md`
- `provenance.md`
- `apprenticeship-check.md`

Plus in Team Mode:

- `governance.md`
- `decision-records.md`

**Why these go in main:**

- Future sessions load them
- Other agents read them
- New contributors onboard with them
- Code reviewers reference them
- Open-source collaborators benefit from them

If doctrine lives only in one agent's memory or one developer's local `.codex/`, half its value is lost.

### Layer 2 — Drafts & incubation (branches, or `references/incubation.md`)

Not ready for `main` yet.

- `references/incubation.md` — candidate entries that haven't earned promotion
- `doctrine/` branches — work-in-progress doctrine updates, large failure-memory additions, archaeology reports under review
- Round-2 plan review inputs when the plan itself is doctrine-adjacent

Branch examples:

```bash
git checkout -b doctrine/mvd                          # first bootstrap
git checkout -b doctrine/failure-memory-llm-actions   # adding a specific FM entry
git checkout -b doctrine/archaeology-<project>        # archaeology analysis in progress
```

Merge to main when the entry is stable and confidence is high.

### Layer 3 — Sensitive / outside repo

Some content must NOT be committed (or must only be in a private repo).

Examples:

- Personal judgments about specific individuals
- Internal politics
- Non-public commercial strategy
- Customer data, API tokens, secrets
- Too-personal self-reminders
- Product direction not yet public
- Archaeology Mode entries that speculate about motives

Placement options:

- `.private/project-doctrine/` (local-only, `.gitignore`d)
- `~/.codex/memories/<project>-private-doctrine.md` (user-level, cross-project)
- Private repo or private branch
- Plain local file not in any repo

**Public repos never contain these.**

---

## What goes in `main`

| Category | Example |
|---|---|
| Stable project identity | L1 ideology with violation tests |
| Known failure patterns | L6 heart methods, failure-memory entries |
| Review-relevant taste | taste-examples |
| Current state for onboarding | state-snapshot |
| Agent bootstrap loader | bootstrap-prompt |
| Team governance | governance.md (team mode) |
| Formal decisions | decision-records.md (team mode) |
| Doctrine provenance | provenance.md |

## What does NOT go in `main` (but CAN go in a branch)

| Category | Where |
|---|---|
| Candidate doctrine not yet validated | `references/incubation.md` (committed but marked "candidate") |
| Doctrine update under review | `doctrine/*` branch + PR |
| Archaeology report under validation | `doctrine/archaeology-*` branch |
| Round-2 critique notes for a pending plan | PR comments, not doctrine |

## What NEVER goes in a public repo

| Category | Where instead |
|---|---|
| Individual personality speculation | Not written anywhere |
| Archaeology inferences about motives | Not written anywhere |
| Customer-identifying failures | Private repo, with IDs redacted |
| Trade secrets / commercial strategy | Private repo |
| Unreleased product direction | Private branch until ready |
| User credentials / tokens | Never commit anywhere — use `.env` + `.gitignore` |
| Personal rants | Private notes file, not doctrine |

---

## Directory convention

### Preferred default

```
docs/project-doctrine/
  state-snapshot.md
  layer-1-ideology.md
  failure-memory.md
  taste-examples.md
  bootstrap-prompt.md
  ...
```

**Why `docs/project-doctrine/`:**

- Agent-neutral name (doesn't leak any runtime's naming convention)
- Reads like normal project documentation on GitHub
- Surfaces well in docs-aware tooling
- Doesn't presuppose Claude Code / Codex / any specific tool

### Runtime adapters (optional, additive)

When you want a specific agent runtime to auto-load:

```
.claude/skills/<project>-doctrine/    # Claude Code auto-resolution
.codex/skills/<project>-doctrine/     # Codex CLI
```

These can be **symlinks or copies** of `docs/project-doctrine/`, so you maintain one source of truth.

```bash
ln -s ../../docs/project-doctrine .claude/skills/<project>-doctrine
```

On Windows, `mklink /D` or maintain two copies (doctrine is small).

### Private supplement

```
.private/project-doctrine/           # in .gitignore
```

For sensitive notes that shouldn't leave your machine or go into the public repo.

### Legacy path

Earlier docs in this repo reference `docs/skills/<project>-doctrine/` — that path is still valid and works identically. Use whichever fits your project; don't break existing setups to rename.

---

## Public vs private repos

### Public / open-source repo

**Include:**
- All stable doctrine layers
- Failure-memory (de-personalized — see Team Mode)
- Taste examples with redacted specifics if needed
- Governance and decision records (team mode)

**Exclude:**
- Anything in Layer 3 above
- Archaeology inferences about individuals (even the maintainer patterns must respect "analyze decisions, not personalities")
- Unreleased strategy
- Customer-identifying info

### Private repo (solo or team internal)

**Include:**
- Everything from public repo
- More candid failure memory
- Internal context you wouldn't want indexed
- Unreleased roadmap tied to doctrine decisions

Solo doctrine for a personal project is usually in a private repo or a private branch. **It still belongs in version control** — just not in a public one.

---

## Archaeology Mode: ethical repo boundary

Archaeology Mode produces reports about someone else's project. Where those reports live matters:

### Safe to commit to YOUR repo

- `archaeology-report-<project>.md` — public-decision patterns only
- `contribution-strategy-<project>.md` — action guidance for yourself
- `review-risk-map-<planned-PR>.md` — your own pre-submission analysis

**Every inferred entry carries confidence + evidence.** See [`archaeology-mode.md`](archaeology-mode.md) §"Maintaining the boundary."

### Never commit anywhere

- Personality profiles of specific maintainers
- Speculated motives
- Any content a maintainer would find intrusive if they read it

**Rule of thumb:** could the maintainer, reading this, say "accurate and I'm comfortable with it being quoted"? If yes, in-bounds. If not, don't write it.

---

## Branch strategy

### First bootstrap (MVD)

```bash
git checkout -b doctrine/mvd
# create docs/project-doctrine/ with 4 MVD files
gh pr create --title "docs: add minimum viable project doctrine"
```

### Adding a failure-memory entry

```bash
git checkout -b doctrine/failure-memory-<topic>
# edit failure-memory.md
gh pr create --title "docs(doctrine): add failure memory for <topic>"
```

### Updating state-snapshot

- **Small team:** direct commit to main is fine. State-snapshot updates weekly.
- **Large team:** PR + owner review if governance requires.

### Archaeology analysis

```bash
git checkout -b doctrine/archaeology-<target-project>
# produce archaeology-report / contribution-strategy / review-risk-map
gh pr create --draft --title "docs(doctrine): archaeology of <project>"
```

Draft PR for discussion, especially if any inference is borderline. Merge only after the confidence + evidence check passes.

### Team mode: doctrine-changing PRs are reviewed like architecture PRs

See [`team-mode.md`](team-mode.md) for governance specifics. Commit message style:

- `docs(doctrine): add failure memory for <class>`
- `docs(doctrine): promote <entry> to L6`
- `docs(doctrine): mark <entry> superseded`
- `docs(doctrine): archaeology report for <project>`

---

## Should solo doctrine go in a repo?

**Yes.** Even if you're the only user.

Because "you" is not one audience — it's:

- Next week's you
- A fresh agent session
- A different model (Claude → Codex → Gemini)
- A different machine
- Long-task resumption
- Future archaeology

If doctrine lives only in local agent memory, any environment change snaps the thread.

**But:** if the content is personal or sensitive, use a **private** repo (or a private branch, or a local-only `.private/` directory). The version-control benefit doesn't require publicity.

---

## If your doctrine is a mix of public and sensitive

Split it:

```
docs/project-doctrine/               # public-safe, in main
  state-snapshot.md
  layer-1-ideology.md
  failure-memory.md
  taste-examples.md
  bootstrap-prompt.md

.private/project-doctrine/           # in .gitignore, or private repo
  sensitive-notes.md
  commercial-context.md
  personal-reminders.md
```

Or keep them in separate repos (public methodology + private supplement) and reference one from the other via local paths.

**Don't mix.** A single doctrine file that contains both safe and sensitive content will either leak, or force you to keep the whole thing private.

---

## Decision flow: should this specific thing be committed?

Ask in order:

1. **Does this entry depend on non-public information?** If yes → private repo or outside repo.
2. **Does this entry profile an individual?** If yes → don't write it anywhere.
3. **Is this entry a stable, validated observation?** If yes → `main`. If no → branch or incubation.
4. **Would a maintainer of a project I'm analyzing be comfortable with this being quoted?** If no → don't write it.
5. **Does removing this entry make future agents more or less likely to repeat a known mistake?** If removing makes them more likely → commit it.

If all five pass: commit to main.

---

## Common mistakes

- **Keeping doctrine only in CLAUDE.md.** It's tied to one runtime and one machine. Externalize into `docs/project-doctrine/` so any tool can read it.
- **Putting sensitive content in a public repo "because it's just internal notes."** It's indexed, mirrored, and scraped. Assume everything in a public repo is permanent.
- **Never branching for doctrine changes.** Direct commits to main are fine for small updates (state-snapshot), but large L6 additions or archaeology reports deserve review.
- **Treating `.private/` as safe without checking `.gitignore`.** Commit it once, it's in history. Double-check before adding sensitive files.
- **Committing archaeology reports that profile individuals.** Even if well-intentioned. Re-read [`archaeology-mode.md`](archaeology-mode.md) §"Ethical boundary."
- **Not versioning solo doctrine at all.** Your future self is a different audience. Use a private repo if you don't want it public, but do use a repo.

---

## Governing principle

> **Havamal is a project asset. Version-control it with the project.
> But not every thought belongs in main, and not every thought belongs in public.**

Three layers (main / branches / outside), one ethical rule (analyze decisions, not personalities), and one test: "would this help future agents, or mislead them?"

---

## Related

- [`install.md`](install.md) — per-runtime placement details
- [`archaeology-mode.md`](archaeology-mode.md) — ethical boundary for inferred entries
- [`team-mode.md`](team-mode.md) — governance for doctrine PRs
- [`maintenance.md`](maintenance.md) — once committed, how entries age
- Chinese version: [`repo-placement.zh.md`](repo-placement.zh.md)
