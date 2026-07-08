#!/usr/bin/env node
// havamal — zero-dependency machine face for project doctrine.
//   check <dir>  doctrine-debt lint: MVD files present, no placeholder filler, scars have origins
//   pack  <dir>  emit a compressed hot pack for session-start injection
//
// Doctrine that relies on being remembered decays. These commands make it load-bearing.

import { existsSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MVD_FILES = [
  "state-snapshot.md",
  "layer-1-ideology.md",
  "failure-memory.md",
  "bootstrap-prompt.md",
];

const OPTIONAL_FILES = [
  "layer-6-heart-methods.md",
  "taste-examples.md",
  "apprenticeship-check.md",
];

const PLACEHOLDER_PATTERNS = [
  /TODO/i,
  /FIXME/,
  /<fill/i,
  /\breplace this\b/i,
  /\byour project\b.*\bhere\b/i,
  /^\s*\.\.\.\s*$/m,
];

// Role projections of the single doctrine body. One source, many slices —
// profiles never fork files; they select sections (and honor entry markers).
const PROFILES = {
  executor: ["state", "scars", "l6"],
  reviewer: ["l1", "taste", "scars"],
};

// Entry-level opt-in scope: `<!-- profile: reviewer -->` (comma list allowed)
// on the first non-empty line after a heading scopes that entry.
const PROFILE_MARKER = /^<!--\s*profile:\s*([a-z0-9_\s,-]+?)\s*-->$/i;

function parseMarkerRoles(line) {
  const hit = line.trim().match(PROFILE_MARKER);
  if (!hit) return null;
  return hit[1].split(",").map((r) => r.trim().toLowerCase()).filter(Boolean);
}

// Doctrine version footer (havamal q330 HAVAMAL-HYGIENE1) — the visible trace
// of "升格永遠人簽". Format: two consecutive lines,
//   <!-- havamal:version -->
//   Version: X.Y.Z | Ratified: YYYY-MM-DD | Last Amended: YYYY-MM-DD
// Convention: MAJOR = incompatible reframe · MINOR = new scar/taste/L*
// entry · PATCH = wording fix. Missing footer stays valid (backward compat).
const VERSION_MARKER = "<!-- havamal:version -->";
const VERSION_RE = /^Version:\s*(\d+\.\d+\.\d+)\s*\|\s*Ratified:\s*(\d{4}-\d{2}-\d{2})\s*\|\s*Last Amended:\s*(\d{4}-\d{2}-\d{2})\s*$/;

/**
 * Parse a version footer from the end of a doctrine file body.
 * Returns {version, ratified, lastAmended} or null (missing OR malformed —
 * caller distinguishes via `hasVersionMarker` when needed).
 */
export function parseVersionFooter(body) {
  if (typeof body !== "string") return null;
  const idx = body.lastIndexOf(VERSION_MARKER);
  if (idx < 0) return null;
  const after = body.slice(idx + VERSION_MARKER.length);
  const line = after.split(/\r?\n/).map((l) => l.trim()).find((l) => l.length > 0);
  if (!line) return null;
  const m = VERSION_RE.exec(line);
  if (!m) return null;
  return { version: m[1], ratified: m[2], lastAmended: m[3] };
}

/** True when the file has the marker, whether or not the version line parses. */
function hasVersionMarker(body) {
  return typeof body === "string" && body.includes(VERSION_MARKER);
}

export function renderVersionFooter({ version, ratified, lastAmended }) {
  return `${VERSION_MARKER}\nVersion: ${version} | Ratified: ${ratified} | Last Amended: ${lastAmended}\n`;
}

/**
 * Scan the standard MVD+optional files in a doctrine dir; return the highest
 * (semver-max) parseable version + malformed-marker file list. Deterministic.
 */
function scanVersionFooters(root) {
  const files = [...MVD_FILES, ...OPTIONAL_FILES];
  const parsed = [];
  const malformed = [];
  const missing = [];
  for (const name of files) {
    const path = join(root, name);
    if (!existsSync(path)) continue;
    const body = readFileSync(path, "utf8");
    if (!hasVersionMarker(body)) {
      missing.push(name);
      continue;
    }
    const p = parseVersionFooter(body);
    if (p) parsed.push({ file: name, ...p });
    else malformed.push(name);
  }
  let highest = null;
  for (const p of parsed) {
    if (!highest || compareSemver(p.version, highest.version) > 0) highest = p;
  }
  return { parsed, malformed, missing, highest };
}

function compareSemver(a, b) {
  const pa = a.split(".").map((n) => Number(n) || 0);
  const pb = b.split(".").map((n) => Number(n) || 0);
  for (let i = 0; i < 3; i++) {
    if (pa[i] !== pb[i]) return pa[i] - pb[i];
  }
  return 0;
}

function resolveDoctrineDir(dir) {
  const refs = join(dir, "references");
  return existsSync(join(refs, "state-snapshot.md")) ? refs : dir;
}

function checkCommand(dir) {
  const root = resolveDoctrineDir(dir);
  const problems = [];
  const warnings = [];

  for (const name of MVD_FILES) {
    const path = join(root, name);
    if (!existsSync(path)) {
      problems.push(`missing: ${name} (MVD requires it)`);
      continue;
    }
    const body = readFileSync(path, "utf8");
    if (body.trim().length < 120) {
      problems.push(`empty-ish: ${name} (${body.trim().length} chars — doctrine debt: delete it or fill it)`);
      continue;
    }
    for (const pattern of PLACEHOLDER_PATTERNS) {
      if (pattern.test(body)) {
        warnings.push(`placeholder text in ${name} (matches ${pattern}) — never ship template filler`);
        break;
      }
    }
  }

  const fmPath = join(root, "failure-memory.md");
  if (existsSync(fmPath)) {
    const body = readFileSync(fmPath, "utf8");
    const entries = body.match(/^###\s+/gm) ?? [];
    if (entries.length < 1) {
      warnings.push("failure-memory.md has no '### FM-*' entries — scars are the point");
    }
    const originless = body.split(/^###\s/m).slice(1)
      .filter((entry) => !/origin|provenance|how it failed|怎麼失敗|來源/i.test(entry)).length;
    if (originless > 0) {
      warnings.push(`${originless} failure-memory entr${originless === 1 ? "y" : "ies"} without an origin/how-it-failed line — no scar, no entry`);
    }
  }

  const snapshotPath = join(root, "state-snapshot.md");
  if (existsSync(snapshotPath)) {
    const ageDays = (Date.now() - statSync(snapshotPath).mtimeMs) / 86_400_000;
    if (ageDays > 30) {
      warnings.push(`state-snapshot.md is ${Math.round(ageDays)} days old — L2 is "what is currently true"; stale snapshots teach wrong facts`);
    }
  }

  for (const name of OPTIONAL_FILES) {
    if (!existsSync(join(root, name))) {
      // optional by design — absence is only reported, never an error
      warnings.push(`optional file absent: ${name} (fine if its absence isn't hurting you)`);
    }
  }

  // Profile markers must name known roles — a typo'd marker silently hides
  // an entry from every slice, so an unknown role is doctrine debt (FAIL).
  for (const name of [...MVD_FILES, ...OPTIONAL_FILES]) {
    const path = join(root, name);
    if (!existsSync(path)) continue;
    for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
      const roles = parseMarkerRoles(line);
      if (!roles) continue;
      for (const role of roles) {
        if (!PROFILES[role]) {
          problems.push(`unknown profile '${role}' in ${name} — valid: ${Object.keys(PROFILES).join(", ")}`);
        }
      }
    }
  }

  // HAVAMAL-HYGIENE1 (q330): doctrine version footer trace of "升格永遠人簽".
  // Missing/malformed = note (backward compat: never FAIL). Present = quiet PASS.
  const versionScan = scanVersionFooters(root);
  if (versionScan.malformed.length > 0) {
    warnings.push(`malformed version footer in: ${versionScan.malformed.join(", ")}`);
  }
  if (versionScan.parsed.length === 0 && versionScan.malformed.length === 0) {
    warnings.push(
      "version footer absent from all doctrine files — consider adding `<!-- havamal:version -->` + `Version: X.Y.Z | Ratified: DATE | Last Amended: DATE`",
    );
  }

  const verdict = problems.length === 0 ? "PASS" : "FAIL";
  console.log(`havamal check — ${root}`);
  console.log(`verdict: ${verdict} (${problems.length} problems, ${warnings.length} notes)`);
  if (versionScan.highest) {
    console.log(`  doctrine version: ${versionScan.highest.version} (from ${versionScan.highest.file})`);
  }
  for (const problem of problems) console.log(`  ✗ ${problem}`);
  for (const warning of warnings) console.log(`  · ${warning}`);
  process.exit(problems.length === 0 ? 0 : 1);
}

function extractHeadingsAndLeads(body, { leadLines = 1, profile = null } = {}) {
  const out = [];
  const lines = body.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    if (/^#{2,3}\s/.test(lines[i])) {
      // Entry scope: a profile marker on the first non-empty line after the
      // heading. Marker lines never appear in output, in any projection.
      let entryRoles = null;
      for (let j = i + 1; j < lines.length; j++) {
        const line = lines[j].trim();
        if (line.length === 0) continue;
        entryRoles = parseMarkerRoles(line);
        break;
      }
      if (profile && entryRoles && !entryRoles.includes(profile)) continue;

      out.push(lines[i]);
      let taken = 0;
      for (let j = i + 1; j < lines.length && taken < leadLines; j++) {
        const line = lines[j].trim();
        if (/^#{1,3}\s/.test(line)) break;
        if (parseMarkerRoles(line)) continue;
        if (line.length > 0) {
          out.push(lines[j]);
          taken++;
        }
      }
    }
  }
  return out.join("\n");
}

function packCommand(dir, args) {
  const root = resolveDoctrineDir(dir);
  const maxBytes = Number(argValue(args, "--max-bytes")) || 6000;
  const outFile = argValue(args, "--out");
  const profile = argValue(args, "--profile") ?? null;
  if (profile && !PROFILES[profile]) {
    console.error(`unknown profile '${profile}' — valid: ${Object.keys(PROFILES).join(", ")}. Run without --profile for the full pack.`);
    process.exit(1);
  }
  const want = (key) => !profile || PROFILES[profile].includes(key);
  const sections = [];

  const snapshot = join(root, "state-snapshot.md");
  if (want("state") && existsSync(snapshot)) {
    const body = readFileSync(snapshot, "utf8");
    sections.push("## STATE (now)\n" + body.split(/\r?\n/).slice(0, 30).join("\n").trim());
  }

  const ideology = join(root, "layer-1-ideology.md");
  if (want("l1") && existsSync(ideology)) {
    sections.push("## L1 — MUST STAY TRUE\n" + extractHeadingsAndLeads(readFileSync(ideology, "utf8"), { profile }));
  }

  const failures = join(root, "failure-memory.md");
  if (want("scars") && existsSync(failures)) {
    sections.push("## SCARS — DO NOT REPEAT\n" + extractHeadingsAndLeads(readFileSync(failures, "utf8"), { leadLines: 2, profile }));
  }

  for (const [key, name, label] of [
    ["l6", "layer-6-heart-methods.md", "L6 — PAID LESSONS"],
    ["taste", "taste-examples.md", "TASTE (good vs bad)"],
  ]) {
    const path = join(root, name);
    if (want(key) && existsSync(path)) {
      sections.push(`## ${label}\n` + extractHeadingsAndLeads(readFileSync(path, "utf8"), { profile }));
    }
  }

  // HAVAMAL-HYGIENE1 q330: surface doctrine version in pack header when present
  const versionScan = scanVersionFooters(root);
  const versionTag = versionScan.highest ? ` · version: ${versionScan.highest.version}` : "";
  const headerTag = profile ? ` · profile: ${profile}` : "";
  let pack = [
    `<!-- havamal hot pack${headerTag}${versionTag} · generated ${new Date().toISOString()} from ${root} -->`,
    "<!-- Inject at session start. This is the compressed working set; read the full doctrine before big plans. -->",
    "",
    ...sections,
  ].join("\n\n");

  if (Buffer.byteLength(pack, "utf8") > maxBytes) {
    pack = pack.slice(0, maxBytes) + "\n\n<!-- truncated at --max-bytes; tighten your doctrine or raise the cap -->";
  }

  if (outFile) {
    writeFileSync(outFile, pack + "\n", "utf8");
    console.log(`wrote ${outFile} (${Buffer.byteLength(pack, "utf8")} bytes)`);
  } else {
    console.log(pack);
  }
}

function argValue(args, flag) {
  const hit = args.find((a) => a.startsWith(flag + "="));
  if (hit) return hit.slice(flag.length + 1);
  const i = args.indexOf(flag);
  return i >= 0 ? args[i + 1] : undefined;
}

const [command, dir, ...rest] = process.argv.slice(2);
if (!command || !dir || !existsSync(dir)) {
  console.log("usage: havamal check <doctrine-dir>");
  console.log("       havamal pack  <doctrine-dir> [--out <file>] [--max-bytes <n>] [--profile executor|reviewer]");
  process.exit(command ? 1 : 0);
}
if (command === "check") checkCommand(dir);
else if (command === "pack") packCommand(dir, rest);
else {
  console.error(`unknown command: ${command}`);
  process.exit(1);
}
