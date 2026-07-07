# Governance (Team Mode Only)

> **Team mode only.** Solo projects can delete this file.
>
> Governance answers: who can change the doctrine, how do changes happen, and what happens when the doctrine conflicts with reality.

---

## Ownership

- **Doctrine steward:** @<name>
- **Product judgment owner:** @<name>
- **Engineering judgment owner:** @<name>
- **Research judgment owner (if applicable):** @<name>
- **Review cadence:** <e.g. every Friday + after major architectural changes>

## What the steward does

- Reviews all doctrine PRs for consistency and layer-correctness
- Prunes stale entries quarterly
- Flags entries that have drifted from evidence
- Mediates conflicts (see below)

## What the judgment owners do

- Accept or reject changes to L1 entries in their domain
- Accept or reject new failure-memory entries in their domain
- Final word on taste-examples in their domain

## Change process

All doctrine changes go through a PR against `docs/project-doctrine/` (or wherever your doctrine lives).

Commit message style:

- `docs(doctrine): add failure memory for <class>`
- `docs(doctrine): update L1 after <trigger>`
- `docs(doctrine): retire <entry>, superseded by <replacement>`

### PR review criteria

Not "is the prose good." These six:

1. Is this durable doctrine, or temporary state?
2. Is this team consensus, or one person's preference?
3. Is there concrete evidence behind it (commit, retro, incident)?
4. Does this entry fire for a future agent, or is it too abstract?
5. Does it conflict with an existing L1 / L6 entry?
6. Which layer does it belong in? (Is it in the right one?)

### Minimum approvers

| Layer | Approvers needed |
|---|---|
| state-snapshot | Any contributor (frequent updates) |
| L1 ideology | Product OR engineering judgment owner (match the axis) + steward |
| L2 knowledge | Any contributor (pointers only) |
| L3 methods | Steward (validate "it has been used") |
| L4 SOPs | Steward |
| L5 thinking modes | Steward + judgment owner |
| L6 heart methods | Steward + evidence of scar |
| failure-memory | Judgment owner (domain-matched) |
| taste-examples | Judgment owner (domain-matched) |
| apprenticeship-check | Steward |
| governance.md | Steward + product owner |

---

## Conflict resolution

When two team members disagree about a doctrine entry:

1. **Disagreement is about evidence** (fixable with data): gather more data, reconvene
2. **Disagreement is about value** (requires a decision): relevant judgment owner decides
3. **Steward is a party to the disagreement:** defer to product + engineering owners jointly
4. **Regardless of outcome:** write a decision record (see `decision-records.md`)

Disagreement is normal. Disagreement without a decision record is a future source of re-litigation.

---

## Retirement policy

An entry is retired — not silently deleted — when:

- The underlying convention it documents is no longer true
- It has been superseded by a new entry
- The situation it addresses no longer arises

Retirement format:

```markdown
## L1.X — <old claim> (RETIRED YYYY-MM-DD)

**Retired because:** <what changed>
**Replaced by:** <if applicable>
**Preserved because:** <why we're keeping the history visible>
```

Do not delete retired entries. They prevent re-proposing ideas the team already considered.

---

## Doctrine vs reality

When a doctrine entry conflicts with current evidence:

1. **Trust evidence.** Always.
2. **Update the doctrine.** Don't leave the contradiction unresolved.
3. **Write a decision record** describing the evidence that forced the update.

A doctrine that refuses to be revised becomes a cult artifact. The discipline is to update it when reality outgrows it.

---

## Escalation paths

- **Steward disagrees with judgment owner:** neutral party mediates (another owner, or a senior team member not directly involved)
- **Judgment owner is unresponsive:** steward can make a time-bounded decision and note it as "pending owner review"
- **Team-wide dispute about a core L1 entry:** treat as a product/engineering decision, not a doctrine decision. Hold a formal meeting, record the decision.

---

## Anti-patterns to avoid

- **Doctrine-by-committee on every change.** Small updates should not require 5 approvals. Match approver count to layer volatility.
- **Doctrine steward as bottleneck.** If the steward is gating every state-snapshot update, they're doing the wrong role.
- **Entries written by one person, rubber-stamped by others.** Either get real review or don't pretend to have it.
- **Governance so heavy that nobody updates the doctrine.** The cure becomes worse than the disease.

---

## Review cadence

Weekly:
- State-snapshot sweep (is it current?)
- Any entries flagged as stale → discuss

Monthly:
- L2 knowledge refresh (are the referenced docs still canonical?)
- L4 SOP check (are any SOPs no longer triggering?)

Quarterly:
- Full doctrine read-through with steward + judgment owners
- Retire obsolete entries
- Propose new L1 entries if necessary

Post-milestone / post-incident:
- L6 addition if a new scar was earned
- Failure-memory addition if a new class of mistake emerged

---

## Onboarding

New team members:

1. Read the doctrine (load-protocol order)
2. Answer the apprenticeship-check in writing (their onboarding PR)
3. Steward reviews the answers
4. If any question surfaces doctrine gaps, those gaps get filed as issues

A new member's fresh-eye confusion is often more informative than long-tenured members' acceptance.
