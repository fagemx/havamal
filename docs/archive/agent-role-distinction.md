> **ARCHIVED (2026-07-08) — out of scope.**
> Session orchestration is not havamal's job (havamal = judgment extraction, not state or session management). Kept for provenance — do not use as current method.

# Agent-Role Distinction (proposal)

Status: proposal (draft) — 2026-07-06
Provenance: applying six-layer doctrine to Wushantou (an acceptance-layer for AI work) exposed a gap the current methodology does not address.

## The gap

The six-layer model treats "the agent" as a single reader.

Some projects have multiple agent role types with distinct responsibilities:
- One role signs doctrine and maintains the control plane
- Another role ships long-running work packages
- Another role handles user intake through a SKILL

The same doctrine reads as:
- Necessary for one role
- Noise or misleading for another

## The extension

Optional overlay on the 6-layer model. Add `roles/<role-name>/` beside main layers:

```
docs/project-doctrine/
├── (main layers — role-agnostic)
│   state-snapshot.md
│   layer-1-ideology.md
│   failure-memory.md
│   bootstrap-prompt.md
│   … (rest of 12-file template)
└── roles/                          ← proposed addition
    └── <role-name>/
        ├── methods.md              (optional)
        ├── sops.md                 (optional)
        ├── heart-methods.md        (optional)
        ├── taste-examples.md       (optional)
        └── apprenticeship-check.md (optional)
```

Not all files needed per role. Only files where role-specific content exists. Empty stubs are anti-pattern.

## What is role-agnostic vs role-specific

**Role-agnostic** (main layers):
- Applies to any agent working on the project
- System-level concerns
- Cross-role SOPs (e.g. a workflow that spans multiple roles)
- L1 ideology that any agent must respect
- Failure memory of failures any role could commit

**Role-specific** (`roles/<role>/`):
- Only that role executes it
- Failure modes only that role produces
- Taste examples where good/bad depends on which role you are
- Apprenticeship check tuned to role's specific fail-mode patterns

## Voice for role-specific files

Closer to handoff style than pure doctrine:
- First person: "I (writing) → next-you (of the same role)"
- Cite specific incidents this session hit
- Fail modes the writer themselves committed
- Explicit update responsibility ("I wrote 2026-07-06; you update if new incidents")

Different from role-agnostic doctrine which is third-person and stable.

This is one place where doctrine and handoff genuinely overlap — role-specific files carry judgment (like doctrine) but scoped to session-continuity within a role (like handoff).

## Not the same as Team-Mode ownership roles

Team mode (`docs/team-mode.md`):
- Doctrine steward — owns doctrine quality
- Product judgment owner — accepts L1 changes
- Engineering judgment owner — accepts L1/L3 changes

Those are **who edits** doctrine.

Agent-role distinction is **who reads** which subset of doctrine.

Orthogonal. Both can apply to the same project.

## When to use

- ≥ 2 distinct agent role types with different responsibilities
- ≥ 3 documented incidents per proposed role (below this, no substrate)
- ≥ 3 months of doctrine use before considering the split

Anti-pattern: adding role distinction on day 1 alongside MVD. Same discipline as L5/L6 — earn it before writing it.

## When NOT to use

- Single agent role in the project
- Governance responsibilities (use Team Mode)
- Fewer than 3 incidents per role

## Anti-patterns

- **Duplicating main content into roles/**: point up, don't copy
- **Aspirational role content**: no incident behind it — same "no scar no L6" rule
- **Mixing role-specific into main layers**: caught by peer review; extract to roles/ instead of rewriting main
- **Building roles/ structure before substrate exists**: empty role directories rot

## Example (Wushantou, 2026-07-06)

Wushantou has three agent role types:
- **strategic-thread** — session orchestration + doctrine sign + control-plane maintenance
- **executor** — long-running package ship
- **host-agent** — user-facing (scribe / planner-grower / TDD execution — three sub-roles delivered through a SKILL)

First attempt to extend the 6-layer model to Wushantou mixed strategic-thread role-specific content into main layers. Round-2 review caught it — extracted role-specific into `roles/strategic-thread/`.

`roles/executor/` was left unwritten because strategic-thread cannot testify to executor experience — same apprenticeship rule (no scar, no entry).

`roles/host-agent/` was not needed because host-agent doctrine ships as a product-side SKILL to the user's own agent runtime, not as project-doctrine to an internal team.

## Relationship to existing modes

- **Solo / Team / Archaeology** are about **who edits**
- **Agent-role** is about **who reads**
- Solo + agent-role: a solo builder using multiple agent role types (Wushantou today)
- Team + agent-role: both apply — governance for content, role for consumption
- Archaeology + agent-role: not applicable (analyzing external, not organizing own)

## Bootstrap adjustment

If `roles/` exists, `bootstrap-prompt.md` loader chain becomes:

```text
Then read (role-specific first if the reader knows their role):
  roles/<your-role>/apprenticeship-check.md
  roles/<your-role>/heart-methods.md
  main layers
```

Unknown-role case: start with main layers.

## Related

- `docs/six-layer-model.md` — the base model this extends
- `docs/doctrine-vs-handoff.md` — role-specific files sit closer to handoff-style voice
- `docs/team-mode.md` — ownership roles (different concept, orthogonal)
- `docs/apprenticeship-protocol.md` — the 6 questions can be role-tuned per role
