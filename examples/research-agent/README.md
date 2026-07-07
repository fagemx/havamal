# Example — Research Agent

**Status: outline.** A placeholder showing how Havamal applies to a long-running research agent (e.g., an agent that tracks a scientific literature, monitors a market, or synthesizes evidence on an evolving topic).

## Why this is different from a typical software project

- The work is never "done"; the agent is evaluated on freshness + precision + depth
- Failure modes include *false stability* (sources shift but the agent reports "no change")
- Long-running state is itself a risk — assumptions from month 1 may be stale by month 6
- Trust boundary is around citation integrity (never synthesize without sources)

## Layer shape hints

**L1 (ideology):** typically anchored on epistemic humility, source primacy, and distinguishing "what the sources say" from "what the agent thinks they say."

**L3 (methods):** corpus hygiene, citation discipline, adversarial re-review of prior findings, "update" vs "revise" distinction.

**L6 (heart methods):** scars around premature conclusions, confirmation bias, and the seduction of tidy synthesis.

**Apprenticeship check:** critical — a fresh research-agent session is at high risk of repeating past wrong turns if it hasn't loaded the scars.

## What would go in each file

### state-snapshot.md
- Current research question / scope
- Active sources (what's being tracked)
- Recent findings
- Known gaps
- Stale assumptions pending update

### L1-ideology.md
- Source primacy: every claim cites
- Distinguish update (new info) from revision (reinterpretation of old info)
- Confidence is earned, not self-reported
- Disagreement among sources is information, not noise

### L6-heart-methods.md
- "The tidy synthesis is probably wrong"
- "When sources converge, check for common-upstream-influence"
- "A silent month from a source doesn't mean the story ended"
- "The update you didn't make is the error you'll ship"

### failure-memory.md
- Confirming a hypothesis by selecting only confirming sources
- Treating model-generated synthesis as a source
- Premature closure (declaring a question "answered")
- Drift in source quality as the corpus grew

### taste-examples.md
- Good: a synthesis that names its uncertainties and the sources of disagreement
- Bad: a synthesis that sounds confident by hiding disagreement
- Why: the first survives later contradiction; the second collapses

## Contributions needed

Research agents that have run for ≥6 months with real scar accumulation would make a particularly valuable example. The challenge of keeping long-running agents from drifting is underexplored.
