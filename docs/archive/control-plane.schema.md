> **ARCHIVED (2026-07-08) — superseded by [edda](https://github.com/fagemx/edda).**
> This document taught hand-maintained execution state / control planes in markdown; that job now belongs to software. Kept for provenance — do not use as current method.

# Control Plane Schema (v1)

> **Companion file: `templates/control-plane.json`.**

This document explains each field in the machine-readable control plane file.
Use it when implementing a `<project>:status` command or when a future agent
needs to reason about the schema without reading the JSON itself.

The control plane is an **opt-in upgrade** on top of `execution-state.md`. Use
it when the markdown execution state is no longer enough — for example when
multiple agents must read the same state, or when a status command must answer
five questions in one screen.

If a project does not need this, the markdown execution state is enough.

---

## Top-level fields

### `schemaVersion`

String. Pins the schema. Bump only when fields are added or removed.
Example: `"project-doctrine.control-plane.v1"`.

### `updatedAt`

ISO date. Set every time the file is touched.

### `currentFocus`

One-line string describing the campaign's current focus.

If the project later opts into lane-based parallelism (see
`docs/lane-parallelism.md`), this field may become an object keyed by lane.

### `lastCompletedPackage`

Object: `{ id, name, commit, summary }`.

The most recently completed work unit. The `commit` is a short SHA or the
string `"uncommitted"`.

### `latestProof`

Object with the same shape as `lastCompletedPackage`.

The deepest current end-to-end proof. This is **separate** from
`lastCompletedPackage` because a small recent package (e.g. a doc cleanup)
should not erase the project's strongest proof.

If the project has no end-to-end proof yet, omit this field.

### `nextQueue`

Ordered array of queue items. Each item has:

- `order` — integer position, monotonically increasing
- `id` — short stable identifier (e.g. `CONV11`, `BRIDGE1`, `APPROVAL3`)
- `status` — one of `done`, `next`, `queued`, `conditional`
- `goal` — one-line objective
- `doneWhen` — concrete completion test
- `lane` — optional string; only present when the project uses lanes

#### `status` values

| Value | Meaning |
|---|---|
| `done` | Already completed; preserved for traceability |
| `next` | The single eligible package; an agent should pick this unless overridden |
| `queued` | Planned but blocked behind earlier items |
| `conditional` | Only fires if a previous package surfaces a specific gap |

In single-lane mode, **at most one item is `next`**.

In lane mode (opt-in), at most one item per lane is `next`.

### `stopConditions`

Array of strings. Each entry names a class of action that requires explicit
operator approval before any package may take it.

Common examples:

- `"changing the product name"`
- `"adding durable storage"`
- `"adding external provider integration"`
- `"building a full chat UI"`
- `"calling external LLM APIs from the default demo"`
- `"introducing a new dependency"`
- `"promoting any convention or pattern as canonical"`

Stop conditions are not a wishlist. Each one should reflect a real failure
mode the project has already paid for.

### `friction`

Append-only array. Each entry records a moment where the project hit a wall
and how it responded.

Each entry: `{ date, issue, handling }`.

Friction entries are read by future agents to understand why current
guard-rails exist. Do not delete old entries.

### `verificationBaseline`

Object: `{ commands, expectedTests }`.

`commands` is the smallest set of commands that proves the project still
runs (status, typecheck, tests, lint).

`expectedTests` is a free-form string the operator can use to detect drift
(e.g. `"36 test files, 232 tests"`).

### `doctrine`

Object pointing to the project's doctrine MVD files. Lets the status
command print pointers without hard-coding them.

### `governanceRule`

One paragraph reminding future agents that they must update this file after
each package and load the doctrine MVD on entry.

---

## Optional fields used by some projects

These are not required by v1 but appear in field-tested implementations.

### `lanes`

Array of lane identifiers. Only present when the project opts into lane
parallelism. See `docs/lane-parallelism.md`.

### `llmConnectionPlan` / similar policy blocks

Object recording the project's policy on a specific stop-condition class.
Use this when one stop condition deserves its own narrative beyond the
short string in `stopConditions`.

Example:

```json
"llmConnectionPlan": {
  "policy": "LLM assistance enters through the proposal rail only.",
  "nextUserTest": "<the smallest test that would justify lifting this>",
  "llmEnabledAt": "<command that exercises the mocked or limited path>"
}
```

---

## Anti-patterns

- **Treating the JSON as the only source of truth.** It is one of the doctrine
  files; the markdown execution state and the doctrine MVD remain authoritative
  for narrative and judgment.
- **Auto-generating the JSON from commits.** Commits are not packages. A
  package may span multiple commits or none.
- **Skipping the `friction` array.** Without it, future agents cannot tell why
  current rules exist.
- **Letting `nextQueue` grow into a backlog.** Keep only the next few
  actionable packages. Older intent belongs in friction or in a separate
  backlog file.
- **Renaming or renumbering completed packages.** `done` entries are
  append-only history.
