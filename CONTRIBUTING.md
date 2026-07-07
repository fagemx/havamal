# Contributing to Havamal

Havamal is a methodology repo, not a product. Contributions should strengthen the methodology, not extend it sideways.

## What We Want

- **Better examples.** Real doctrines from real projects (redacted where needed) are the highest-value contribution. New `examples/<domain>/` directories welcome.
- **Clearer language in `docs/`.** If a reader bounces off a methodology doc, that's a bug.
- **Fresh failure-memory patterns.** If you've seen an agent-driven failure mode that isn't captured anywhere in `docs/` or the templates, write it up.
- **Missing template entries.** If you discover a section that every project's doctrine ends up needing, propose adding it to the template.

## What We Don't Want (Yet)

v0 is deliberately small. We are NOT adding:

- A CLI (`npx doctrine init ...`)
- Schema validators
- Web app / playground
- Marketplace
- Auto-scaffolders that read a repo and generate doctrine

Those may come later, after the methodology is stable. For v0 the goal is: make the concept land.

## Style

- Short sentences. Declarative. No marketing copy.
- Examples over adjectives.
- Contrast pairs (good/bad) beat single examples.
- If you introduce a concept, define it in one sentence first.
- Bilingual is fine; use English for canonical doc, Chinese/other for emphasis if the project culture is bilingual.

## Doctrine Hygiene

When adding to the templates or examples, respect the layers:

- **L1 Ideology** — only durable beliefs, not temporary positions
- **L2 Knowledge** — current state, so it WILL go stale; mark dates
- **L3 Methods** — only methods that have actually been tested
- **L4 SOPs** — concrete, repeatable; not aspirational
- **L5 Thinking Modes** — metacognitive, not procedural
- **L6 Heart Methods** — **must have a scar behind it**. If no failure, not L6.

A contribution that misfiles content into the wrong layer is worse than no contribution.

## PR Checklist

- [ ] Voice matches existing docs (short, declarative, contrast-heavy)
- [ ] New L6-style entries have a concrete failure origin
- [ ] Examples are generic enough to transfer, specific enough to be useful
- [ ] No CLI / tooling scope creep
- [ ] Changed files pass the "would a fresh agent misread this?" check

## Questions

Open an issue. This repo is deliberately low-ceremony; we'd rather discuss a design decision publicly than gate contributions behind process.
