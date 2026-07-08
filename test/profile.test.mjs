// profile.test.mjs — pack --profile / check marker 行為(node:test,零依賴)
// 跑法:node --test test/
import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, writeFileSync, readFileSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const CLI = join(repoRoot, "bin", "havamal.mjs");
const EXAMPLE = join(repoRoot, "examples", "wushantou-foundry", "references");

function run(args, opts = {}) {
  try {
    const stdout = execFileSync("node", [CLI, ...args], { encoding: "utf8", ...opts });
    return { code: 0, stdout, stderr: "" };
  } catch (err) {
    return { code: err.status ?? 1, stdout: err.stdout ?? "", stderr: err.stderr ?? "" };
  }
}

/** 首行正規化:generated <ISO> 每跑不同、from <dir> 依呼叫路徑而異,比對時皆抹平 */
function normalize(pack) {
  return pack.replace(/generated \S+ from [^>]+-->/, "generated <TS> from <DIR> -->");
}

// ---- 回歸:無 --profile 行為不變(對 fixture,時間戳正規化後 byte 級相等) ----

test("pack without --profile matches pre-change baseline (timestamp-normalized)", () => {
  const { code, stdout } = run(["pack", EXAMPLE]);
  assert.equal(code, 0);
  const baseline = readFileSync(join(repoRoot, "test", "fixtures", "full-pack.baseline.txt"), "utf8");
  assert.equal(normalize(stdout), normalize(baseline));
});

// ---- 切片:executor / reviewer ----

test("pack --profile executor: header names profile, drops L1/TASTE, smaller than full", () => {
  const full = run(["pack", EXAMPLE]).stdout;
  const { code, stdout } = run(["pack", EXAMPLE, "--profile", "executor"]);
  assert.equal(code, 0);
  assert.match(stdout, /profile: executor/);
  assert.ok(stdout.includes("## STATE (now)"), "executor keeps STATE");
  assert.ok(stdout.includes("## SCARS"), "executor keeps SCARS");
  assert.ok(!stdout.includes("## L1 — MUST STAY TRUE"), "executor drops L1");
  assert.ok(!stdout.includes("## TASTE"), "executor drops TASTE");
  assert.ok(Buffer.byteLength(stdout) < Buffer.byteLength(full), "slice smaller than full");
});

test("pack --profile reviewer: keeps L1+TASTE+SCARS, drops STATE", () => {
  const { code, stdout } = run(["pack", EXAMPLE, "--profile", "reviewer"]);
  assert.equal(code, 0);
  assert.match(stdout, /profile: reviewer/);
  assert.ok(stdout.includes("## L1 — MUST STAY TRUE"), "reviewer keeps L1");
  assert.ok(stdout.includes("## TASTE"), "reviewer keeps TASTE");
  assert.ok(stdout.includes("## SCARS"), "reviewer keeps SCARS");
  assert.ok(!stdout.includes("## STATE (now)"), "reviewer drops STATE");
});

test("pack --profile with unknown role fails with valid roles named", () => {
  const { code, stderr } = run(["pack", EXAMPLE, "--profile", "planner"]);
  assert.notEqual(code, 0);
  assert.match(stderr, /executor/);
  assert.match(stderr, /reviewer/);
});

// ---- entry 級 profile 標記(temp doctrine fixture) ----

function makeDoctrine(failureMemoryBody) {
  const dir = mkdtempSync(join(tmpdir(), "havamal-profile-"));
  const filler = "This body line exists to pass the 120-char empty-ish check. ".repeat(4);
  writeFileSync(join(dir, "state-snapshot.md"), `# State\n\n${filler}\n`);
  writeFileSync(join(dir, "layer-1-ideology.md"), `# L1\n\n## Belief one\n${filler}\n`);
  writeFileSync(join(dir, "failure-memory.md"), failureMemoryBody);
  writeFileSync(join(dir, "bootstrap-prompt.md"), `# Bootstrap\n\n${filler}\n`);
  return dir;
}

const MARKED_FM = [
  "# Failure Memory",
  "",
  "### FM-1: universal scar",
  "How it failed: everyone must see this line.",
  "",
  "### FM-2: reviewer-only scar",
  "<!-- profile: reviewer -->",
  "How it failed: only reviewers must see this line.",
  "",
].join("\n");

test("entry marker scopes an entry to its profile; full pack keeps entry, hides marker", () => {
  const dir = makeDoctrine(MARKED_FM);
  try {
    const exec = run(["pack", dir, "--profile", "executor"]).stdout;
    const rev = run(["pack", dir, "--profile", "reviewer"]).stdout;
    const full = run(["pack", dir]).stdout;
    assert.ok(exec.includes("FM-1"), "executor sees unmarked entry");
    assert.ok(!exec.includes("FM-2"), "executor does not see reviewer-only entry");
    assert.ok(rev.includes("FM-2"), "reviewer sees reviewer-only entry");
    assert.ok(full.includes("FM-2"), "full pack keeps marked entry");
    assert.ok(!full.includes("<!-- profile:"), "marker line itself never leaks into pack");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

// ---- check 護欄:壞標記紅、好標記綠 ----

test("check fails on unknown profile marker, passes on valid marker", () => {
  const bad = makeDoctrine(MARKED_FM.replace("profile: reviewer", "profile: bogusrole"));
  const good = makeDoctrine(MARKED_FM);
  try {
    const badRun = run(["check", bad]);
    assert.notEqual(badRun.code, 0, "unknown profile marker must fail check");
    assert.match(badRun.stdout, /bogusrole/);
    const goodRun = run(["check", good]);
    assert.equal(goodRun.code, 0, "valid marker must not fail check");
  } finally {
    rmSync(bad, { recursive: true, force: true });
    rmSync(good, { recursive: true, force: true });
  }
});
