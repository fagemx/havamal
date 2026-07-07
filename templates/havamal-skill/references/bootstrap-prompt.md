# Bootstrap Prompt

> **Copy-paste loader for a fresh agent.** Send this at the start of a new session to load <project>'s posture.

---

## Template (customize the bracketed fields)

```
You are starting a session on <project>.

Before any non-trivial action, load the project doctrine in this order:

1. Read `docs/skills/<project>-doctrine/references/state-snapshot.md` — current state
2. Read `docs/skills/<project>-doctrine/references/layer-1-ideology.md` — durable convictions
3. Read `docs/skills/<project>-doctrine/references/layer-5-thinking-modes.md` — reasoning postures
4. Read `docs/skills/<project>-doctrine/references/layer-6-heart-methods.md` — compressed lessons from scars

After loading, run the apprenticeship check:
`docs/skills/<project>-doctrine/references/apprenticeship-check.md`

Answer Q1–Q6 (Q5 uses [CONCRETE TASK — provide one]).

Do NOT summarize the doctrine back to me. Enter the posture, then acknowledge readiness with your Q1–Q6 answers.

On-demand references:
- L2 Knowledge — `references/layer-2-knowledge.md`
- L3 Methods — `references/layer-3-methods.md`
- L4 SOPs — `references/layer-4-sops.md`
- Failure Memory — `references/failure-memory.md`
- Taste Examples — `references/taste-examples.md`

If any entry conflicts with current evidence, trust current evidence and update the doctrine rather than acting on stale content.
```

---

## Shorter version (trusted agent / mid-session refresh)

```
Refresh posture for <project>:

- `references/state-snapshot.md`
- `references/layer-1-ideology.md`
- `references/layer-6-heart-methods.md`

Then state: (1) what's current, (2) what's durable, (3) smallest safe next move.
No summary; posture only.
```

---

## How to use

### At session start

Send the full template. Wait for the Q1–Q6 answers. If they're project-specific and coherent, proceed. If they're generic, re-send the load instructions.

### Mid-session (after a long gap or topic shift)

Send the shorter version. Agent should re-orient in under 2 minutes.

### After doctrine changes

If L1 or state-snapshot changed materially, the agent should re-bootstrap. Don't trust a session's residual understanding of the project after an identity-level change.

---

## Integration points

- **CLAUDE.md** — reference this file as "new session quickstart"
- **AGENTS.md** — same
- **.cursor/rules/** — include the short version as a persistent system message
- **Agent runtime settings** — some platforms allow a "session bootstrap prompt" field; paste the full template there

---

## Anti-patterns

- **Using the bootstrap as the whole doctrine.** It's a loader, not the content. The doctrine lives in the six layer files.
- **Skipping the apprenticeship check.** The check is what turns reading into entering. Without it, the agent has the files but not the stance.
- **Hand-editing the bootstrap to "save tokens."** The load protocol is short on purpose. If you're shortening it, you've lost something.
