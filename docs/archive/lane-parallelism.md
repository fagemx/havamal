> **ARCHIVED (2026-07-08) — superseded by [edda](https://github.com/fagemx/edda).**
> This document taught hand-maintained execution state / control planes in markdown; that job now belongs to software. Kept for provenance — do not use as current method.

# Lane Parallelism

> Use this only after the control plane (`docs/control-plane.md`) is in
> place and a single agent loop has run cleanly through many packages.

The control plane is single-lane by default. One `next` item. One focus.
One loop.

Some projects eventually need more than one active track at the same time —
a quality track and a runner track, or a governance track and a feature
track, or a research track and a build track. Lane parallelism is the
opt-in extension that supports this without breaking the loop contract.

---

## TL;DR

- **Single-lane is the default.** Lane parallelism is opt-in.
- **A lane is a named track of packages.** Each package may carry an
  optional `lane` field.
- **At most one `next` per lane.** Multiple `next` items are allowed only
  when each is in a distinct lane.
- **`currentFocus` may become an object keyed by lane.** A `next` per lane
  needs a focus per lane.
- **The discipline does not change.** Each lane still picks its first
  unblocked `next`, still respects all stop conditions, still updates the
  control plane after each package.

---

## When to add it

Add lanes only when all of these are true:

- The control plane has run single-lane through enough packages that the
  loop discipline is automatic.
- Two or more tracks of work are genuinely independent (different files,
  different reviewers, different verification commands).
- The operator can name each lane's intent in one short sentence.
- A real package would be blocked if you keep waiting for a single-lane
  ordering.

Do not add lanes when:

- The work is sequential pretending to be parallel.
- The operator has not yet decided which track each package belongs to.
- The loop is not running cleanly in single-lane mode.
- The agent loop contract has not been written down.

---

## Schema additions

The control plane schema adds two optional fields:

```jsonc
{
  "lanes": ["quality", "runner", "governance"],

  "nextQueue": [
    {
      "order": 23,
      "id": "QC11",
      "status": "next",
      "lane": "quality",
      "goal": "...",
      "doneWhen": "..."
    },
    {
      "order": 24,
      "id": "RUN3",
      "status": "next",
      "lane": "runner",
      "goal": "...",
      "doneWhen": "..."
    }
  ]
}
```

`currentFocus` may stay a string when only one lane has a `next`, or become
an object keyed by lane when more than one does:

```jsonc
"currentFocus": {
  "quality": "Fix the narrow extraction gap exposed by QC10.",
  "runner":  "Wire the spec-to-runtime bridge command."
}
```

The status command should print per-lane focus when lanes are in use.

---

## Lane discipline

Each lane runs the same loop as the single-lane control plane:

1. Pick the first unblocked `next` in this lane.
2. Implement the smallest package that advances it.
3. Verify.
4. Update the control plane.

The only thing that changes is:

- Multiple lanes may have a `next` at the same time.
- Each lane has its own focus.
- Each completed package updates only its own lane's focus, not the others.

A package may not change another lane's `next` without explicit operator
approval. Cross-lane changes belong in a governance package.

---

## Stop conditions still apply

Stop conditions are global, not per-lane. A package in any lane that touches
a stop-condition class still requires an approval package first.

A lane is not a way to bypass the stop list.

---

## Conflict rules

When two lanes touch the same file, the project must pick one of three
policies and document it in `docs/<project>-governance.md`:

- **Sequential merge.** The lane that finishes first commits; the second
  rebases and resolves.
- **Worktree per lane.** Each lane works in its own git worktree; merge is
  a control-plane event.
- **Shared file is forbidden in parallel.** A package that needs the shared
  file must run single-lane.

Pick one. Do not let the project drift between policies.

---

## Anti-patterns

- **Lanes as labels.** If two lanes are really one workflow with a tag,
  they are not lanes. Collapse them.
- **More than four lanes.** Past four, a human operator cannot hold all
  current foci in one screen. The project should drop a lane before adding
  one.
- **Lane-hopping packages.** A package that touches every lane is a
  governance change disguised as a feature.
- **Cross-lane secret dependencies.** If lane A silently depends on lane B,
  the JSON must encode it (`dependsOn` field, or hold `status: "queued"`
  until B publishes a marker). No hidden coupling.
- **Operator working around the queue.** If the operator regularly picks a
  package outside the `next` items, lanes are masking a planning gap, not
  enabling parallelism.

---

## Origin

The lane mechanism was added to the Foundry control plane after the
campaign reached a state where:

- Conversation Quality work (deterministic extraction polish) was on a
  different file set from Spec-To-Runtime Bridge work (CLI wiring), so
  serial ordering was wasting time.
- A governance change to the control plane itself was needed to formalize
  the lane mechanism, which itself wanted to be one of the lanes.
- The operator wanted to inspect "what's the current quality focus?" and
  "what's the current runner focus?" separately.

The reference implementation queues a `GOV2` governance package to extend
the schema before any lane is opened, so the act of enabling parallelism
is itself a single-lane package.

See:

- `docs/control-plane.md`
- `templates/control-plane.json`
- `templates/control-plane.schema.md`
