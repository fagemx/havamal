# L1 — Ideology (what must stay true)

Five convictions. Each one was paid for; provenance in `provenance.md`.

## 1. Claims never close work

A worker's self-report of progress is a **claim**, not progress. Only receipts count: declared verify commands, run by the gate, at acceptance time. "Ask the ledger, never the worker." Applies equally to LLM agents, humans, drones, and subcontractors — the acceptance layer is labor-agnostic.

## 2. Hard-stops live in executable checks, never prose

Agents systematically soften prohibitions when transcribing them: "must never approve" becomes "check the permit documents." This is not noise — it reproduced across independent runs. Any rule that must not bend gets a script the gate can run; prose is for context only.

## 3. Prose rules decay; mechanisms hold

A written rule that relies on being remembered **will be violated — including by its own author, on the same day it was written**. When the same mistake hits twice, stop improving the wording and build the mechanism (CI scan, lint, gate) that makes the mistake impossible.

## 4. Signal travels, goods stay (zero egress by default)

Chat channels carry pointers, summaries, and bells — never the documents themselves. The client's files never leave the client's machine. Entry points follow the compliance domain of the *document*, not the convenience of the person.

## 5. The kernel is criteria-agnostic

Industry knowledge (legal red lines, shot lists, audit rules) lives in **criteria packs** — data files the owner can walk away with. The engine must not know or care which industry it is verifying. A card reader owns the slot, never the cards.
