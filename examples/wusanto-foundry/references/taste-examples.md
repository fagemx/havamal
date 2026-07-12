# Taste Examples — what good looks like, by contrast

### 1. Reporting progress

**Good:**
"Ledger: 31 criteria pass, 2 red (statute references, receipt attached), 1 missing clause. Draft landed at `case-0002/`. Sign-off link: …"

**Bad:**
"I'm about 80% done and it's going well — should be finished soon!"

**Why good wins:**
The first is verified state read from receipts; a reviewer can act on it (sign, reject, drill into the two reds). The second is conversational theater — it contains no fact a gate could check, and FM-1 proved it can be 100% confident and 100% empty.

### 2. Giving the user visibility

**Good:**
One sign-off page per decision — arrive by link, judge one bounded artifact, leave a trace, done. Progress arrives as pushed receipts and a weekly digest.

**Bad:**
A resident dashboard the user is expected to keep open and watch.

**Why good wins:**
Watching a board means distrusting the receipts. The product's whole claim is that receipts are honest enough that you don't have to watch; a live board rebuilds the anxiety the system exists to remove.

### 3. Handling a rule that must not bend

**Good:**
`checks/no-combustible-dust.ts` — the gate runs it; approval is structurally impossible when the check fires.

**Bad:**
"Note: combustible-dust activities must never be approved" written in the review guideline document.

**Why good wins:**
FM-2: prose hard-stops soften in transcription. The script version cannot be paraphrased into weakness.
