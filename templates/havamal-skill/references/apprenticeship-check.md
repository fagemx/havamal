# Apprenticeship Check

> **Six questions a new agent answers before taking on real work.** Reading the doctrine is not entering the school. Answering these is.

See [`docs/apprenticeship-protocol.md`](../../../docs/apprenticeship-protocol.md) for the full protocol.

---

## The six questions

### Q1 — What is current?

Name 2–3 things that are true about <project> right now. Draw from [`state-snapshot.md`](state-snapshot.md).

### Q2 — What is durable?

Name 1–2 L1 convictions that would constrain any new plan. Reference [`layer-1-ideology.md`](layer-1-ideology.md).

### Q3 — What is stale?

Name one thing in the doctrine or referenced docs that is no longer accurate. Explain why.

### Q4 — Which tempting plan should this project refuse?

From [`failure-memory.md`](failure-memory.md), name one trap and describe the situation in which it would fire.

### Q5 — Which layer does [task X] belong in?

Given a specific task provided by the user, place it in the correct layer and justify briefly. (The user picks X; don't pre-answer.)

### Q6 — What is the smallest safe next move?

Given the current state, propose one minimum-viable next action, and justify it against L1.

---

## Optional extended questions (for larger tasks)

### Q7 — What would <project> pay to NOT do this?

Forces you to see the trade-off.

### Q8 — What failure-memory entry does this plan risk rerunning?

Forces you to hunt for buried traps before writing the plan.

---

## Pass criteria

- Each answer is project-specific (not generic)
- Each answer references concrete entries from the doctrine
- Q3 actually names something stale (performing-compliance answers don't count)
- Q6's "smallest safe move" is genuinely small, not a disguised big move

## Fail signals

- Answers that could apply to any project → the agent hasn't entered the stance
- "That depends on the context" with no specifics → the agent hasn't engaged
- Q3 says "nothing looks stale" without having looked → complacency
- Q6 proposes a full feature instead of a scoped step → default agent mode, not project-native

## What failure means

If the agent fails multiple questions, either:

1. The agent hasn't loaded the doctrine properly — retry the load protocol
2. The doctrine itself is under-populated — the failure is a signal to patch the doctrine, not to blame the agent

The check is a **two-way diagnostic.**

---

## Self-administered

An agent working alone can run the check silently before starting work. The bottleneck is honesty: the agent must answer what the doctrine *says*, not what it thinks the user *wants to hear*.

Signal of dishonest self-check: the answers flow smoothly and never surface tension or uncertainty. A real self-check produces at least one "hm, I'm not sure — let me reread."
