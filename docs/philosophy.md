# Philosophy

## Why this exists

AI agents are getting better at executing tasks. They are not getting better at **judging** them.

A capable agent will execute a bad plan crisply. It will implement a feature that contradicts the project's trust model. It will write tests that pass but verify the wrong invariant. It will refactor in ways that dissolve the reason the code was shaped the way it was.

None of that is a skill gap. It's a judgment gap.

The gap closes when a project's **school** — its accumulated taste, its refused paths, its hard-won failures — is extractable and reloadable. Havamal is a format for that extraction.

## What a project school contains

A project that has been built on for a while has:

- **Beliefs** about what the product is and isn't
- **Taboos** — things the team has tried and ruled out, often painfully
- **Taste** — a sense of what "clean" looks like in this specific codebase
- **Methods** — ways of working that have survived contact with the domain
- **Scars** — failures that left a mark on how the team now thinks
- **Language** — vocabulary that means something specific here but not elsewhere
- **Judgment** — the ability to tell good from bad faster than reasoning from first principles

Most of this lives in the heads of the people who built the project. Some lives in architecture docs. Some in commit history. Almost none of it lives in a form a fresh agent can load.

## Why handoffs are not enough

A handoff answers: *what happened, what changed, what's next*. It is **narrative continuity**.

A doctrine answers: *what does this project believe, what has it refused, what must any future move respect*. It is **judgment continuity**.

The failure mode of agents isn't "doesn't know what happened." It's "doesn't know what this project would never do."

A handoff can be correct and the agent still goes wrong. A doctrine shortens the distance between "correct context" and "correct judgment."

## Why docs are not enough

Architecture docs, READMEs, ADRs — all useful. None of them carry:

- What we tried and abandoned (and why)
- What tempting but wrong paths we see agents fall into
- The taste contrast between a "good" solution here and a generic "best practice" that doesn't fit

Those are the things a human onboards by sitting next to someone for a month. A doctrine makes the same information loadable without the month.

## Why memory is not enough

Persistent-memory systems (Claude auto-memory, Cursor rules, custom vector stores) capture *facts* well. They are weaker at capturing *judgment*. A memory entry like "user prefers X over Y" is not a doctrine — doctrine would also say *why*, *when that preference applies*, *and what failure produced it*.

Memory and doctrine are complementary. A doctrine references memory (see `L2 knowledge`). Memory feeds back into doctrine when a pattern stabilizes.

## The school metaphor

A school of thought (in art, medicine, science) isn't just a set of facts. It's a stance — a way of seeing problems and a set of moves that feel natural inside the stance and alien outside it. Impressionism vs Realism isn't a disagreement about technique; it's a disagreement about what a painting is *for*.

Software projects that last long enough develop schools too. The team may not notice, because the school is the water they swim in. It becomes visible when a new engineer — or a new agent — joins and makes moves that are technically reasonable but *feel wrong* inside the school.

Havamal is a way to make the school explicit without killing it. Explicit enough that a new agent can enter it. Soft enough that it stays alive and grows.

## Not a substitute for thinking

A doctrine is a prior, not an oracle. It says "here is how we have judged so far, here is what we've paid for those judgments." It does not say "therefore this new situation must be resolved this way."

The best doctrine is the one that helps an agent ask the *right question faster*, not the one that prescribes an answer.

When doctrine and evidence conflict, evidence wins. But the doctrine gives the agent the vocabulary to recognize the conflict in the first place.

## Not a finished artifact

Doctrine is written continuously. Every time a user says "no, not that" — that is a doctrine entry waiting to be written. Every time a plan gets a round-2 review that lands a new invariant — that is a doctrine entry. Every time a PR gets merged and the team says "good, we want more like this" — that is a doctrine entry.

If your doctrine hasn't changed in a month and your project is active, your doctrine is probably stale.

## Summary

- Handoff = continuity of work
- Memory = continuity of fact
- Docs = continuity of structure
- **Doctrine = continuity of judgment**

All four matter. They serve different questions. Don't mix them.
