# Failure Memory — tempting mistakes already paid for

Four entries. Format: temptation → how it failed → detection → correct move. Origins in `provenance.md`.

### FM-1: The all-green report over empty goods ("FIFA incident")

- **Temptation:** Trust the executing agent's completion report — it was detailed, confident, and all green.
- **How it failed:** The report said everything passed while the actual data file contained `matches: []`. Empty goods, perfect paperwork. Discovered only when a human opened the artifact.
- **Detection:** Any completion status that originates from the worker's own narration rather than machine-read receipts.
- **Correct move:** Progress questions are answered by reading the ledger (receipts, gate results, machine state). A worker's self-report is a claim; claims never close work.

### FM-2: Criteria softening in transcription

- **Temptation:** Let the agent restate the review criteria in its own words — it reads more naturally.
- **How it failed:** "Combustible-dust activities must never be approved" (an absolute legal prohibition) became "check whether a permit document is attached" — twice, in two independent runs. A hard stop silently downgraded into a paperwork check. In a high-liability domain this is the exact error that gets a professional sued.
- **Detection:** Any hard-stop rule that exists only as prose an agent will re-read and re-express.
- **Correct move:** Every hard-stop gets an executable check the gate runs verbatim. Prose explains; scripts enforce.

### FM-3: Textual self-reference (the rule its own author broke)

- **Temptation:** Mention an artifact path in a ledger's descriptive text — it's the most natural way to name a file.
- **How it failed:** The audit regex treated the prose mention as a real reference to a file that doesn't exist in fresh checkouts → CI red. Five hits in three days, one of them by the very author of the freshly written "how to avoid this" note, on the same day.
- **Detection:** Any fix whose success depends on future writers remembering a wording convention.
- **Correct move:** Two mechanisms — auditor downgrades known report-only paths to informational, and a pre-push scan catches the pattern before CI. The wording advice stays, but nothing depends on it.

### FM-4: Mis-warehoused goods, wrong-warehouse audit

- **Temptation:** Audit an agent's claim by searching where the goods *should* be.
- **How it failed:** A wiring bug landed artifacts in the engine repo's workspace instead of the client workspace. The auditor searched only the client workspace, found nothing, and nearly recorded an honest agent as having fabricated its claim. Two independent mistakes compounding into a false verdict.
- **Detection:** Any audit that does not declare its search universe ("I searched X and Y, not Z").
- **Correct move:** Audits declare coverage (what was searched, what wasn't); the system provides a machine-readable placement report so "where are the goods" has one command as its answer.
