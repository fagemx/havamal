# Flagship example: Wushantou (AI Delivery Foundry)

This is a **real doctrine distilled from a real project** — [fagemx/wushantou](https://github.com/fagemx/wushantou), a verification layer for AI-produced work (780+ commits, governance ledger in-repo). Every scar below has a public provenance trail; nothing here is invented for the template.

It is the answer to the fair question every methodology repo should face: *"do the authors use this themselves?"* Yes — this doctrine was extracted from the project's own decision records and friction ledger, and the failure memories below each cost real debugging time before they became rules.

Shape: MVD+ (the four MVD files plus taste examples, apprenticeship check, and provenance). Layers 2–5 are deliberately absent — their absence wasn't hurting.

```
references/
  state-snapshot.md        where the project is (dated — L2 decays by design)
  layer-1-ideology.md      5 convictions, each born from a scar
  failure-memory.md        4 tempting mistakes the project already paid for
  taste-examples.md        good vs bad, shown not described
  apprenticeship-check.md  5 questions a new agent must pass before planning
  bootstrap-prompt.md      how to load this doctrine
  provenance.md            where every entry came from
```

Try the machine face on it:

```bash
node ../../bin/havamal.mjs check examples/wushantou-foundry/references
node ../../bin/havamal.mjs pack  examples/wushantou-foundry/references
```
