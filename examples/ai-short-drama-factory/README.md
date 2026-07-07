# Example — AI Short-Drama Factory

**Status: outline.** A placeholder showing how Havamal applies to an AI-content pipeline (short-form video generation: script → storyboard → voice → video → edit).

## Why this is different from a typical software project

- Output quality is judged subjectively; no unit tests for "is this watchable"
- Pipeline has multiple LLM/diffusion stages that compound errors
- "Taste" is the product — if the team can't articulate taste, the output is generic
- Failure modes include *plausible but soulless* output (worse than broken)

## Layer shape hints

**L1 (ideology):** typically anchored on a specific genre/voice/audience. "We make X kind of drama, not Y."

**L3 (methods):** prompt-chain hygiene, style-locking (seed/reference images), review-gate between pipeline stages.

**L6 (heart methods):** scars around "generic drift" — the pipeline's natural output is mid. Everything in L6 probably pushes against that gravity.

**Taste examples:** heavy. This is the layer where the product's soul lives.

## What would go in each file

### state-snapshot.md
- Current pipeline version
- Active style packs / reference assets
- Recent episode outputs
- Model versions in each stage

### L1-ideology.md
- What kind of drama are we making?
- What is never acceptable in our output?
- Where does automation end and human taste begin?

### L6-heart-methods.md
- "Generic is the default state of an AI pipeline — every stage must push against it"
- "If the script reads like ChatGPT wrote it, reshoot"
- "The human touch is a stage, not a polish"

### failure-memory.md
- Style drift between stages (voice doesn't match storyboard)
- Over-indexing on early successes (same joke structure repeated 10 episodes)
- Prompts that worked in Feb stop working in April (model update)
- "Good enough" episodes eating audience trust slowly

### taste-examples.md
**This is the most important file for this project type.** Every episode post-mortem should produce at least one taste entry. Good vs bad scene → why this project's audience responds to the good one.

## Contributions needed

A real AI-content pipeline's doctrine (redacted) would demonstrate how taste-heavy doctrine works in practice. The more specific the genre (suspense, rom-com, absurdist), the more valuable the example.
