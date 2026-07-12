<!-- havamal hot pack · profile: executor · version: 0.5.0 · generated 2026-07-12T02:52:12.029Z from examples/wusanto-foundry/references -->

<!-- Inject at session start. This is the compressed working set; read the full doctrine before big plans. -->



## STATE (now)
# State Snapshot — 2026-07-08

> L2 decays by design. If this is more than a few weeks old, trust the repo's own control ledger over this file.

- **Phase:** pre-launch. The verification kernel (intake → criteria freeze → gates → receipts → sign-off) is shipped and self-hosting; the project governs itself through its own control ledger (`docs/product/mission-runtime-control.json`).
- **Current push:** profession drills (lawyer / photographer / novelist scenarios) to battle-test onboarding before recruiting non-developer design partners; friction from each drill feeds the queue.
- **Recently landed:** workspace targeting fix, connect completeness, verify placement report, F9 audit guards, coverage-receipt schema draft, criteria-pack container spec.
- **Big picture:** drills → design partners → industry criteria packs (design-first: packs are extracted from real adoptions, never written in advance).
- **Known tensions:** rails engagement depends on skill installation (being fixed); interview axis of intake still untested interactively.

## SCARS — DO NOT REPEAT
### FM-1: The all-green report over empty goods ("FIFA incident")
- **Temptation:** Trust the executing agent's completion report — it was detailed, confident, and all green.
- **How it failed:** The report said everything passed while the actual data file contained `matches: []`. Empty goods, perfect paperwork. Discovered only when a human opened the artifact.
### FM-2: Criteria softening in transcription
- **Temptation:** Let the agent restate the review criteria in its own words — it reads more naturally.
- **How it failed:** "Combustible-dust activities must never be approved" (an absolute legal prohibition) became "check whether a permit document is attached" — twice, in two independent runs. A hard stop silently downgraded into a paperwork check. In a high-liability domain this is the exact error that gets a professional sued.
### FM-3: Textual self-reference (the rule its own author broke)
- **Temptation:** Mention an artifact path in a ledger's descriptive text — it's the most natural way to name a file.
- **How it failed:** The audit regex treated the prose mention as a real reference to a file that doesn't exist in fresh checkouts → CI red. Five hits in three days, one of them by the very author of the freshly written "how to avoid this" note, on the same day.
### FM-4: Mis-warehoused goods, wrong-warehouse audit
- **Temptation:** Audit an agent's claim by searching where the goods *should* be.
- **How it failed:** A wiring bug landed artifacts in the engine repo's workspace instead of the client workspace. The auditor searched only the client workspace, found nothing, and nearly recorded an honest agent as having fabricated its claim. Two independent mistakes compounding into a false verdict.
### FM-5: Retrying into a silent wall (machine-surfaced)
- **Temptation:** When a step fails silently, fire it again with a small tweak — surely the next variation lands.
- **How it failed:** Three consecutive hook invocations died silently (exit 0, zero effect) because a swallow-all resilience design hid a JSON escape error; the runner kept re-firing variations instead of opening the debug face. Same signature family as the F4 spawn-DOA and the headless-drill r3 UNOBSERVABLE hang: consecutive silent failures, zero new information per retry.
