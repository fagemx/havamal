> **ARCHIVED (2026-07-08) — superseded by [edda](https://github.com/fagemx/edda).**
> This document taught hand-maintained execution state / control planes in markdown; that job now belongs to software. Kept for provenance — do not use as current method.

# Status Command (Reference)

> **Companion to `templates/control-plane.json`.**

A status command is a thin script that reads the control plane JSON and prints
the five questions in under 30 lines. It is the operator's primary entry
point into a project once the control plane is in place.

The exact language does not matter. The discipline does:

- One command, one entry point.
- Reads the control plane file. Does not infer from git.
- Prints the same five questions in a stable order.
- Supports `--json` so an external agent gets the structured form.
- Returns non-zero only when the file is unreadable; "queue is empty" is
  normal output.

---

## The five questions

1. What is the current focus?
2. What was just completed?
3. What is next?
4. What should we stop and ask before doing?
5. What is the verification baseline?

A status command must answer all five. If your output is missing one, the
operator will fall back to reading prose or commits, and the control plane
loses its value.

---

## Minimum output (single-lane)

```text
focus:    <currentFocus>
last:     <lastCompletedPackage.id> <name>  (<commit>)
proof:    <latestProof.id> <name>           (<commit>)

next queue:
  <order> <id>  <status>  <goal>
  ...

stop before:
  - <stopCondition>
  - ...

verify:
  <command>
  <command>
  expected: <expectedTests>
```

Three short blocks. One screen. No prose.

---

## Minimum output (lanes opt-in)

When `currentFocus` is an object, the status command groups output by lane:

```text
focus:
  quality:  <focus>
  runner:   <focus>

last:     <lastCompletedPackage.id>  (<commit>)
proof:    <latestProof.id>           (<commit>)

next queue:
  [quality]
    <order> <id>  <status>  <goal>
    ...
  [runner]
    <order> <id>  <status>  <goal>
    ...

stop before:
  - <stopCondition>
  - ...

verify:
  <command>
  expected: <expectedTests>
```

---

## TypeScript sketch (Node + tsx)

```ts
import { readFileSync } from "node:fs";

const control = JSON.parse(
  readFileSync("docs/product/<project>-control-plane.json", "utf8"),
);

const wantJson = process.argv.includes("--json");

if (wantJson) {
  process.stdout.write(JSON.stringify(control, null, 2));
  process.exit(0);
}

const focus =
  typeof control.currentFocus === "string"
    ? control.currentFocus
    : Object.entries(control.currentFocus)
        .map(([lane, text]) => `  ${lane}: ${text}`)
        .join("\n");

console.log(`focus:\n${focus}`);
console.log(
  `last:   ${control.lastCompletedPackage.id} ${control.lastCompletedPackage.name} (${control.lastCompletedPackage.commit})`,
);

if (control.latestProof) {
  console.log(
    `proof:  ${control.latestProof.id} ${control.latestProof.name} (${control.latestProof.commit})`,
  );
}

const forward = control.nextQueue.filter(
  (item: { status: string }) => item.status !== "done",
);
console.log("\nnext queue:");
for (const item of forward) {
  const lane = item.lane ? `[${item.lane}] ` : "";
  console.log(`  ${item.order} ${item.id} ${item.status} ${lane}${item.goal}`);
}

console.log("\nstop before:");
for (const condition of control.stopConditions) {
  console.log(`  - ${condition}`);
}

console.log("\nverify:");
for (const cmd of control.verificationBaseline.commands) {
  console.log(`  ${cmd}`);
}
console.log(`  expected: ${control.verificationBaseline.expectedTests}`);
```

Wire it as a script:

```jsonc
// package.json
{
  "scripts": {
    "<project>:status": "tsx scripts/<project>Status.ts"
  }
}
```

---

## Python sketch

```python
import json
import sys
from pathlib import Path

control = json.loads(
    Path("docs/product/<project>-control-plane.json").read_text()
)

if "--json" in sys.argv:
    print(json.dumps(control, indent=2))
    sys.exit(0)

focus = control["currentFocus"]
if isinstance(focus, dict):
    focus_text = "\n".join(f"  {lane}: {text}" for lane, text in focus.items())
else:
    focus_text = focus
print(f"focus:\n{focus_text}")

last = control["lastCompletedPackage"]
print(f"last:   {last['id']} {last['name']} ({last['commit']})")

proof = control.get("latestProof")
if proof:
    print(f"proof:  {proof['id']} {proof['name']} ({proof['commit']})")

print("\nnext queue:")
for item in control["nextQueue"]:
    if item["status"] == "done":
        continue
    lane = f"[{item['lane']}] " if "lane" in item else ""
    print(f"  {item['order']} {item['id']} {item['status']} {lane}{item['goal']}")

print("\nstop before:")
for cond in control["stopConditions"]:
    print(f"  - {cond}")

print("\nverify:")
for cmd in control["verificationBaseline"]["commands"]:
    print(f"  {cmd}")
print(f"  expected: {control['verificationBaseline']['expectedTests']}")
```

---

## Required flags

The status command must accept these flags. They form the agent contract.

| Flag | Meaning |
|---|---|
| `--json` | Emit the raw control plane object to stdout; suppress all human text |
| `--yes` | Reserved; no-op today, but accepted so callers can pipe non-interactively |

`--json` is the load-bearing flag. Without it, no external agent can consume
the status reliably.

---

## Anti-patterns

- **Embedding doctrine in the command.** Stop conditions, friction, focus —
  all come from the JSON. The command must not invent text.
- **Reading git for status.** The control plane is the source of truth.
- **Long output.** If the output passes one screen, the control plane is
  carrying state that belongs elsewhere.
- **Inconsistent ordering.** The five blocks must appear in the same order
  every time. External agents pattern-match on position.
- **Silent failure on missing fields.** If a required field is missing, the
  command must say so on stderr; never print stale defaults.

---

## Origin

Field-tested in the Mission Runtime project ("Foundry") as
`npm run mission:status`, backed by `docs/product/mission-runtime-control.json`.
The sketches above are the generalized form.
