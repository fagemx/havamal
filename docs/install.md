# Install

Havamal is markdown + templates. No binary, no package manager, no CLI. Installing it means **copying the right directory into your own project's right location, and pointing your agent runtime at it.**

This doc covers the three things you might want to install, and how to place them for each common agent runtime (Claude Code, Codex, Gemini CLI, Cursor, or nothing at all).

---

## TL;DR

| What you want | How |
|---|---|
| **Read the methodology** | `git clone` the repo, or just browse on GitHub. No install. |
| **Build doctrine for your project** | Copy [`templates/havamal-skill/`](../templates/havamal-skill/) into your project. |
| **Give your agent the "doctrine-builder" skill** | Copy [`skills/havamal-builder/`](../skills/havamal-builder/) into your runtime's skill directory. |
| **Use Archaeology Mode on someone else's project** | Copy the three [`templates/archaeology-report.md`](../templates/archaeology-report.md), [`contribution-strategy.md`](../templates/contribution-strategy.md), [`review-risk-map.md`](../templates/review-risk-map.md) as per-analysis output files. |

No install step is more than a `git clone` + `cp -r`.

---

## Three things you might want to install

Havamal contains three artifacts. You pick what to install based on what you're doing.

### 1. The methodology docs

Files in `docs/`: philosophy, six-layer-model, failure-memory, taste-examples, etc.

**Install by:** reading them. They are markdown. `git clone` if you want a local copy:

```bash
git clone https://github.com/fagemx/project-doctrine
```

Or just browse on GitHub. No further action needed.

### 2. The havamal-skill template

Directory: `templates/havamal-skill/` — the 14-file skeleton (SKILL.md + 13 references + governance/decision-records for team mode).

**Install by:** copying into your project. See [Placing the template](#placing-the-template-in-your-project) below.

This is the common case. If your project has enough scars to build a doctrine (see [`when-to-use.md`](when-to-use.md)), this is what you copy.

### 3. The havamal-builder skill

Directory: `skills/havamal-builder/` — the meta-skill that teaches agents how to help users build doctrines.

**Install by:** copying into your agent runtime's skill directory. See [Installing the builder skill](#installing-the-builder-skill) below.

Optional. Install this if you want an agent that can help you bootstrap or maintain doctrines. You can also just reference the methodology docs directly and skip the skill.

---

## Placing the template in your project

Copy the template, rename for your project, and point your agent runtime at it.

```bash
# from inside your project's repo root
cp -r <path-to-project-doctrine>/templates/havamal-skill ./docs/skills/<your-project>-doctrine
```

On Windows:

```powershell
xcopy /E /I <path-to-project-doctrine>\templates\havamal-skill docs\skills\<your-project>-doctrine
```

Then fill in the template files per [`migration-guide.md`](migration-guide.md).

### Placement options

Where to put the doctrine directory depends on your agent runtime.

| Runtime | Recommended path | Why |
|---|---|---|
| **Agent-neutral / open-source (preferred default)** | `docs/project-doctrine/` | Reads like normal project docs; no runtime naming leakage |
| **Claude Code** (project-local) | `.claude/skills/<project>-doctrine/` | Auto-loaded by Claude Code skill resolver |
| **Codex CLI** | `docs/project-doctrine/` + reference from `AGENTS.md` | Codex reads `AGENTS.md`; the doctrine lives as plain docs |
| **Gemini CLI** | `docs/project-doctrine/` + reference from `GEMINI.md` | Same idea as Codex |
| **Cursor** | `docs/project-doctrine/` + pointer from `.cursor/rules/` | Cursor rules reference the doctrine path |
| **Legacy / earlier-in-this-repo-references** | `docs/skills/<project>-doctrine/` | Still valid; earlier templates referenced this path |

**If in doubt, use `docs/project-doctrine/`.** It's agent-neutral, GitHub-readable, and can be symlinked into `.claude/skills/` if Claude Code auto-loading is desired:

```bash
ln -s ../../docs/project-doctrine .claude/skills/<project>-doctrine
```

For the full version-control, public/private, and branch-strategy story (what belongs in `main` vs branches vs outside the repo), see [`repo-placement.md`](repo-placement.md).

### Wiring it into your runtime's config

After copying the template, tell your runtime's config file (CLAUDE.md / AGENTS.md / GEMINI.md / `.cursor/rules/*`) where the doctrine lives.

**Example — CLAUDE.md snippet:**

```markdown
## Havamal

This project uses a Havamal at `docs/skills/<project>-doctrine/SKILL.md`.

**Before any non-trivial work, read the doctrine load protocol:**

1. `docs/skills/<project>-doctrine/references/state-snapshot.md`
2. `docs/skills/<project>-doctrine/references/layer-1-ideology.md`
3. `docs/skills/<project>-doctrine/references/layer-5-thinking-modes.md`
4. `docs/skills/<project>-doctrine/references/layer-6-heart-methods.md`

Then run the apprenticeship check at
`docs/skills/<project>-doctrine/references/apprenticeship-check.md`.

Do NOT summarize the doctrine back. Enter the posture.
```

The exact wording doesn't matter — what matters is that the agent has a clear instruction to load the doctrine before non-trivial work.

**Example — AGENTS.md / GEMINI.md:** identical content, just in a different file. Most agent runtimes look at the file they call "the agent instructions file." Paste the same snippet.

### If Claude Code: use `.claude/skills/` for auto-loading

If you specifically use Claude Code and want the skill auto-resolved by the skill tool, use `.claude/skills/<project>-doctrine/` instead of `docs/skills/...`. Then a user or agent can invoke the skill with:

```
/<project>-doctrine
```

(assuming your runtime supports slash-commands for skills).

If you already have a `docs/skills/<project>-doctrine/` doctrine and want to also expose it to Claude Code, symlink or reference:

```bash
ln -s ../../docs/skills/<project>-doctrine .claude/skills/<project>-doctrine
```

(On Windows, use `mklink /D` or just maintain two copies — the doctrine is small.)

---

## Installing the builder skill

The **havamal-builder** skill teaches an agent how to help users build doctrines. Install it if you want agents that can walk users through the bootstrap process.

```bash
# for Claude Code user-level (available across all your projects)
cp -r <path-to-project-doctrine>/skills/havamal-builder ~/.claude/skills/

# for Claude Code project-level
cp -r <path-to-project-doctrine>/skills/havamal-builder ./.claude/skills/

# for Codex
cp -r <path-to-project-doctrine>/skills/havamal-builder ./.codex/skills/
```

(Exact paths depend on your CLI version; check its skills-directory convention.)

**If your runtime doesn't have a skills directory:** put it at `docs/skills/havamal-builder/` and reference from your runtime's config:

```markdown
## Havamal Builder

If the user asks to build, review, or maintain a Havamal, load:
`docs/skills/havamal-builder/SKILL.md`
```

This works for any agent that reads its config file and follows instructions there.

---

## Archaeology Mode (no install needed)

Archaeology Mode isn't something you "install" into your project — you **use it to analyze another project**. Each analysis produces per-project output files:

```bash
# When analyzing project X, from your analysis workspace:
cp <path-to-project-doctrine>/templates/archaeology-report.md ./project-X-archaeology-report.md
cp <path-to-project-doctrine>/templates/contribution-strategy.md ./project-X-contribution-strategy.md
cp <path-to-project-doctrine>/templates/review-risk-map.md ./project-X-review-risk-map.md
```

Then fill them in per the [Archaeology Mode guide](archaeology-mode.md).

The templates live in the project-doctrine repo. You can keep reusing them per project without modifying the source.

---

## Runtime-specific notes

### Claude Code

- Skills live at `.claude/skills/<name>/` (project-level) or `~/.claude/skills/<name>/` (user-level).
- CLAUDE.md is auto-loaded at session start. Reference the doctrine there.
- A skill's `SKILL.md` is the entry point; references are loaded on demand.
- Load protocol (solo/team) in the template's SKILL.md body can be followed manually or by agent convention.

### Codex CLI

- AGENTS.md is the main convention file. Reference the doctrine path there.
- Codex may not have a first-class "skill" concept in all versions — treat the doctrine as a set of markdown docs the agent should read when instructed.
- The template's SKILL.md has minimal frontmatter (`name` + `description`) so it passes strict Codex skill validators.

### Gemini CLI

- GEMINI.md is analogous to CLAUDE.md / AGENTS.md. Reference the doctrine path there.
- Gemini CLI loads its config at session start; the doctrine load-protocol instructions in GEMINI.md fire automatically.

### Cursor

- `.cursor/rules/` holds rule files.
- Add a rule file pointing at the doctrine path and telling the agent to load it before planning.

### Other runtimes (generic)

- Pick the runtime's equivalent of "the instructions file."
- Paste the doctrine load-protocol snippet.
- The agent doesn't need to "understand" Havamal specifically — it just needs to follow the instruction to read a specific set of markdown files before non-trivial work.

---

## Updating

The project-doctrine methodology itself evolves. You can pull updates:

```bash
cd <path-to-project-doctrine>
git pull
```

**Your own project's doctrine is yours** — don't overwrite it by re-copying the templates. Update methodology docs for reference; keep your filled-in doctrine as the authoritative version.

### When methodology docs change meaningfully

If `docs/six-layer-model.md` or another canonical methodology doc changes in a way that affects how you maintain your doctrine:

1. Re-read the updated doc
2. Decide if any of your existing doctrine entries need to be reclassified
3. Do a maintenance sweep (see [`maintenance.md`](maintenance.md))

Most updates are refinements, not breaking changes.

---

## Uninstalling

Delete the relevant directory. The doctrine is plain markdown — removal is a `rm -rf` away. Your agent runtime may cache the skill reference; restart the session after removal.

---

## Quick reference

### Install a doctrine into a project

```bash
cp -r templates/havamal-skill your-repo/docs/skills/<your-project>-doctrine
```

Then reference from CLAUDE.md / AGENTS.md / GEMINI.md / `.cursor/rules/`.

### Install the builder skill for your agent

```bash
cp -r skills/havamal-builder ~/.claude/skills/
# or your runtime's equivalent skills directory
```

### Use archaeology templates per-analysis

```bash
cp templates/archaeology-report.md ./<target-project>-archaeology-report.md
cp templates/contribution-strategy.md ./<target-project>-contribution-strategy.md
cp templates/review-risk-map.md ./<target-project>-review-risk-map.md
```

---

## Related

- [`migration-guide.md`](migration-guide.md) — step-by-step for filling in the doctrine template
- [`everyday-use.md`](everyday-use.md) — how developers interact with the doctrine day-to-day (once installed)
- [`when-to-use.md`](when-to-use.md) — decide whether your project is ready for doctrine BEFORE installing
- Chinese version: [`install.zh.md`](install.zh.md)
