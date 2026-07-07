# Doctrine Model

The conceptual model behind Havamal. Read this before helping a user build their doctrine.

## Four artifacts, four questions

| Artifact | Answers |
|---|---|
| **README** | What is the project? |
| **Docs / specs** | How does the system work? |
| **Memory** | What facts should I remember? |
| **Handoff** | What just happened? |
| **Doctrine** | **How does this project judge?** |

Each artifact fails if asked to do the others' job. A doctrine that tries to be a README is vague. A README that tries to be doctrine is preachy. Memory that tries to be doctrine is stale the week after you write it.

## What doctrine uniquely does

**Doctrine preserves continuity of judgment.**

It makes explicit:

- What this project has *tried and rejected* (not just what it uses)
- What tempting paths a future agent should refuse
- What class of output counts as good here (not by style guide — by taste)
- What scars the project has paid for, compressed into reflex
- How a new agent can tell they've entered the project's stance

None of those live well in README / docs / memory / handoff.

## The six layers, in two sentences each

- **L1 Ideology** — Durable convictions. If L1 changes, the project has shifted identity.
- **L2 Knowledge** — Pointers, not content. An index of where current truth lives.
- **L3 Methods** — Ways of working that have been validated in this project. Not aspirational best-practices.
- **L4 SOPs** — Concrete recipes for situations that recur. Triggered by situation, not by tool.
- **L5 Thinking Modes** — Real-time reasoning postures. How to notice you're thinking badly and adjust.
- **L6 Heart Methods** — Compressed lessons from scars. One line, one scar, one trigger.

Plus **state-snapshot** (volatile, dated) and **bootstrap-prompt** (copy-paste loader) as supporting files.

## The layer logic

Layers are ordered from *stable* (L1 rarely changes) to *reflex* (L6 fires mid-task). State-snapshot sits above as the only volatile file.

```
                     volatile
                     ─────────
                     state-snapshot
                     ─────────
                     L1 — durable beliefs
                     L2 — pointers to truth
                     L3 — validated methods
                     L4 — situational SOPs
                     L5 — reasoning postures
                     L6 — compressed scars
                     ─────────
                     reflex
```

A session loads in this order: *state → beliefs → thinking → scars*, then the rest on demand.

## Why not fewer layers?

Two common temptations:

1. **"Just merge L3/L4 into 'how we work'."** — L3 is *methods you've validated*; L4 is *procedures for recurring situations*. They decay differently. Methods grow slowly; SOPs grow situationally. Mixing them produces a file that's half aspirational best-practices and half incident runbooks.

2. **"Just merge L5/L6."** — L5 is conscious self-observation ("notice your drift"). L6 is reflex firing mid-task ("框架 > 模型"). They operate at different cognitive speeds. L5 is deliberation; L6 is pre-deliberation.

## Why not more layers?

Each extra layer dilutes what the others do. A 10-layer doctrine won't be loaded. Stop at six.

## The "enter the posture, don't summarize" rule

A load-bearing instruction. When a new agent reads a doctrine, their default behavior is:

> "I have read the doctrine. Here is a summary: [paraphrase]."

This is **performative compliance**, not entering the posture. It proves the tokens were processed but not that they're shaping judgment.

The rule says: after reading, **don't summarize. Answer the apprenticeship check instead.** That forces the agent to *use* the doctrine on a concrete task. The check is what turns reading into entering.

## The apprenticeship check as a 2-way diagnostic

The check tests the agent AND the doctrine. If a fresh agent can't answer the 6 questions, it's often because a layer is under-populated, not because the agent is incompetent.

Treat a failed check as doctrine-improvement signal first, agent-coaching signal second.

## Doctrine as a living artifact

If nothing in the doctrine has changed in a month and the project is active, the doctrine is probably stale.

Doctrine grows from:

- Round-2 reviews that land new invariants → L1 or L3 entry
- "We already tried that" said twice → failure-memory entry
- "No, not like that — like this" from the user → taste example
- A scar earned → L6 entry
- An architecture pivot → state-snapshot update + L1 audit
- A method that works in 2+ situations → L3 entry

## The common failure modes of doctrines

1. **Too aspirational.** L1 packed with "we should" claims, not "we do" realities.
2. **Too static.** Written once, never updated. Useful at month 2, misleading at month 6.
3. **Too long.** 40-entry L6 that nobody reads. Compress or prune.
4. **Too generic.** Entries that could apply to any project. Doesn't teach *this* project's school.
5. **Too siloed.** One person wrote it, nobody else edits it. Becomes that person's style guide, not the team's doctrine.

## When to recommend against building a doctrine

- Project is < 1 month old
- No recurring agent work
- User is asking for a README, not a doctrine (clarify first)
- Only one person / agent ever touches the project
- User treats doctrine as lore rather than working document — the effort will be wasted

## Summary

Doctrine is one of five artifacts. Its specific job is to preserve **how a project judges**. It is organized in six layers because each layer solves a different problem at a different volatility. It is built iteratively, starting with state-snapshot and L1, then L5/L6, then failure-memory and taste-examples. It stays alive only if it's edited weekly.

**Do not summarize the project. Extract the school.**
