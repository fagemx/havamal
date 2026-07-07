> **ARCHIVED (2026-07-08) — superseded by [edda](https://github.com/fagemx/edda).**
> This document taught hand-maintained execution state / control planes in markdown; that job now belongs to software. Kept for provenance — do not use as current method.

# Control Plane

> Use this when `execution-state.md` is no longer enough — when an external
> agent must answer "where are we?" in one command, or when more than one
> agent needs to read the same campaign state.

Havamal starts with markdown execution state. That is enough for many
projects. Some projects outgrow it.

```text
state-snapshot      = where the project is now
execution-state.md  = which campaign is active and what's next (human-readable)
control-plane.json  = the same campaign state, machine-readable (optional)
```

The control plane is **not a replacement** for the markdown execution state.
It is a parallel surface that lets a status command, an MCP tool, or a fresh
agent load the campaign state without reading prose.

It is **opt-in**. If a project has not felt the absence, it does not need it.

---

## TL;DR

- **Add it when prose execution state stops fitting one screen** or when a
  second reader (an external agent, a sibling session, a status command)
  needs the same state.
- **Two files, one command:** `control-plane.json` + a thin
  `<project>:status` command that prints the five questions in <30 lines.
- **Markdown execution state stays.** It carries narrative; the JSON carries
  structure. They must agree.
- **The control plane is one layer above doctrine, not above the markdown.**
  Doctrine MVD remains the judgment loader.

---

## When to add it

Add the control plane only when one of these is true:

- The operator regularly types `git log` to figure out where the project is.
- A second agent or a sibling session needs to read the campaign state.
- The markdown execution state has grown past one screen and is no longer
  scannable.
- The project wants `--json` output from a status command (see
  `templates/status-command.md`).
- The project wants opt-in parallel lanes (see `docs/lane-parallelism.md`).

Do not add it when:

- The markdown execution state still fits one screen and one agent is the
  only reader.
- The campaign is short enough that a handoff is all that's needed.
- The project has not yet completed an MVD doctrine.

---

## The five questions

The control plane exists to answer five questions with one command:

1. What is the current focus?
2. What was just completed?
3. What is next?
4. What should we stop and ask before doing?
5. What is the verification baseline?

A status command reads `control-plane.json` and prints those answers in a
form an external agent can also consume as JSON.

If your status command needs more than 30 lines, the control plane is
carrying state that should live elsewhere (doctrine, evidence files, code).

---

## File layout

```text
docs/
  product/
    <project>-execution-state.md   ← narrative, friction, session log
    <project>-control-plane.json   ← machine-readable mirror
  state-snapshot.md                 ← still owns volatile project state
scripts/
  <project>Status.<lang>            ← prints the five questions
```

A project that uses a doctrine skill may instead place the JSON under:

```text
docs/skills/<project>-doctrine/references/control-plane.json
```

The naming is not load-bearing. The disciplines are.

---

## Agreement with the markdown execution state

The JSON and the markdown must agree on three things:

- the current focus;
- the most recently completed package;
- the next queue (ids, order, status).

If they disagree, the project must stop and align them before the next
package. A disagreement is a governance failure, not a normal state.

The markdown owns prose that the JSON cannot — friction stories, session
log, narrative explanations. The JSON owns shape — the queue array, the
status enum, the verification baseline as data.

---

## Update rules

At the start of a session:

1. Run the status command (or read the JSON).
2. Read the markdown execution state only if the status command is unclear.
3. Read the doctrine MVD if this is a fresh agent.

At the end of a session:

1. Update `lastCompletedPackage` if something shipped.
2. Update `currentFocus` if it changed.
3. Update `nextQueue` if a package moved between statuses.
4. Append a `friction` entry if the operator had to correct the process.
5. Update the markdown execution state to match.

If those updates do not happen, the session is not closed.

---

## What this layer is not

- **Not a project management tool.** The control plane is one screen of
  active state, not a roadmap.
- **Not a roadmap.** Long-horizon planning belongs in product docs.
- **Not a substitute for doctrine.** Stop conditions are short pointers; the
  reason behind each one lives in failure memory.
- **Not promoted as canonical.** This layer is an opt-in upgrade. Many
  projects will never need it, and that is fine.

---

## Anti-patterns

- **Auto-syncing the JSON from git commits.** A package is a unit of judgment,
  not a unit of revision history. Commits cannot infer status.
- **Treating `friction` as a changelog.** Friction entries record judgment
  shifts, not every code change.
- **Letting `stopConditions` decay into platitudes.** Each entry must be a
  real failure mode the project has already paid for.
- **Bypassing the markdown.** The JSON is structure, not story. Without the
  story, future agents cannot tell why current shape exists.
- **Building a dispatcher before the discipline holds.** A scheduler that
  picks the next package automatically only helps after the human-driven
  loop has run cleanly for a while.

---

## Origin

This layer was field-tested in the Mission Runtime project ("Foundry") while
working through dozens of small packages across multiple sessions. The
markdown execution state worked at first. It stopped scaling when:

- a second reader (a status command, then an external agent) needed the
  same state;
- queue items started carrying lane metadata for parallel work;
- the operator wanted to ask `what's the next focus?` from outside the
  project conversation.

The Foundry implementation (`docs/product/mission-runtime-control.json` +
`npm run mission:status`) is the reference. The template here is the
generalized form.

See:

- `templates/control-plane.json`
- `templates/control-plane.schema.md`
- `templates/status-command.md`
- `docs/lane-parallelism.md`
