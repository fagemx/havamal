# Bootstrap Prompt

Paste to a fresh agent session (or reference from CLAUDE.md / AGENTS.md):

```text
Before planning anything, load this project's doctrine:
1. Read references/state-snapshot.md — if older than a few weeks, prefer the repo's control ledger.
2. Read references/layer-1-ideology.md and references/failure-memory.md in full.
3. Skim references/taste-examples.md.
4. Answer references/apprenticeship-check.md — post your answers before your first plan.
Rules of engagement: claims never close work; hard-stops need executable checks; when a prose rule fails twice, propose a mechanism; out-of-scope findings become ledger entries, not inline fixes.
```

For hot-path injection (compressed, session-start):

```bash
node bin/havamal.mjs pack examples/wusanto-foundry/references --out .havamal-pack.md
```
