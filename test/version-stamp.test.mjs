// version-stamp.test.mjs — doctrine version footer (havamal q330)
//
// Contract:
//   - Version footer format: `<!-- havamal:version -->\nVersion: X.Y.Z | Ratified: YYYY-MM-DD | Last Amended: YYYY-MM-DD`
//   - parseVersionFooter(body) returns {version, ratified, lastAmended} or null (向後相容)
//   - renderVersionFooter is inverse of parseVersionFooter
//   - check reports missing footer as **note** (never fails) — backward compat
//   - check reports malformed footer as **note** (never fails)
//   - pack header carries "· version: X.Y.Z" when footer present
//
// Zero dependency (Node 18+ built-ins only).

import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { parseVersionFooter, renderVersionFooter } from "../bin/havamal.mjs";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const CLI = join(repoRoot, "bin", "havamal.mjs");

function run(args, opts = {}) {
  try {
    const stdout = execFileSync("node", [CLI, ...args], { encoding: "utf8", ...opts });
    return { code: 0, stdout, stderr: "" };
  } catch (err) {
    return { code: err.status ?? 1, stdout: err.stdout ?? "", stderr: err.stderr ?? "" };
  }
}

function seedDoctrine(withFooter) {
  const dir = mkdtempSync(join(tmpdir(), "hav-ver-"));
  const filler = "This body line exists to pass the 120-char empty-ish check. ".repeat(4);
  writeFileSync(join(dir, "state-snapshot.md"), `# State\n\n${filler}\n`);
  writeFileSync(join(dir, "layer-1-ideology.md"), `# L1\n\n## Belief\n${filler}\n`);
  writeFileSync(
    join(dir, "failure-memory.md"),
    `# Failure Memory\n\n### FM-1: sample\nHow it failed: because of X.\n${filler}\n${withFooter ?? ""}`
  );
  writeFileSync(join(dir, "bootstrap-prompt.md"), `# Bootstrap\n\n${filler}\n`);
  return dir;
}

test("parseVersionFooter: canonical form parsed", () => {
  const md = `${"body\n".repeat(3)}\n<!-- havamal:version -->\nVersion: 1.2.3 | Ratified: 2026-01-15 | Last Amended: 2026-07-08\n`;
  const p = parseVersionFooter(md);
  assert.deepEqual(p, { version: "1.2.3", ratified: "2026-01-15", lastAmended: "2026-07-08" });
});

test("parseVersionFooter: no footer returns null (backward compat)", () => {
  assert.equal(parseVersionFooter("just some doctrine body\n"), null);
});

test("parseVersionFooter: malformed returns null (never throws)", () => {
  const md = `body\n<!-- havamal:version -->\nVersion: nope | Ratified: bad | Last Amended: also-bad\n`;
  assert.equal(parseVersionFooter(md), null);
});

test("renderVersionFooter is inverse of parseVersionFooter", () => {
  const stamp = { version: "0.4.1", ratified: "2026-03-10", lastAmended: "2026-07-08" };
  const rendered = renderVersionFooter(stamp);
  const parsed = parseVersionFooter(rendered);
  assert.deepEqual(parsed, stamp);
});

test("check: missing footer reports 'note', still PASS (backward compat)", () => {
  const dir = seedDoctrine(null);
  try {
    const r = run(["check", dir]);
    assert.equal(r.code, 0, "check exits 0 without footer");
    assert.match(r.stdout, /PASS/);
    assert.match(r.stdout, /version footer/i, "missing footer surfaced as note");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("check: valid footer passes silently (no note)", () => {
  const footer = renderVersionFooter({ version: "1.0.0", ratified: "2026-01-01", lastAmended: "2026-07-08" });
  const dir = seedDoctrine(footer);
  try {
    const r = run(["check", dir]);
    assert.equal(r.code, 0, "check exits 0 with valid footer");
    assert.match(r.stdout, /PASS/);
    assert.doesNotMatch(r.stdout, /version footer.*absent/i, "no absence note when present");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("check: malformed footer reports 'note' but still PASS (never fails on this)", () => {
  const dir = seedDoctrine("\n<!-- havamal:version -->\nVersion: garbage\n");
  try {
    const r = run(["check", dir]);
    assert.equal(r.code, 0);
    assert.match(r.stdout, /PASS/);
    assert.match(r.stdout, /malformed/i);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("pack header carries version when a doctrine file has a footer", () => {
  const footer = renderVersionFooter({ version: "0.9.9", ratified: "2026-01-01", lastAmended: "2026-07-08" });
  const dir = seedDoctrine(footer);
  try {
    const r = run(["pack", dir]);
    assert.equal(r.code, 0);
    assert.match(r.stdout, /version: 0\.9\.9/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("pack header omits version when no footer present (backward compat)", () => {
  const dir = seedDoctrine(null);
  try {
    const r = run(["pack", dir]);
    assert.equal(r.code, 0);
    assert.doesNotMatch(r.stdout, /· version:/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
