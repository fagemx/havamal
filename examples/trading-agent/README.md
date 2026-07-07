# Example — Trading Agent

**Status: outline.** A placeholder showing how Havamal applies to a quant / trading-agent project. Contributions welcome.

## Why this is different from a typical software project

- Failure modes include *correct code producing wrong outcomes* (the market moves)
- "Taste" is partly statistical: what counts as a good signal is backtestable
- Scars compound: a bad trade pattern can poison months of data
- Trust boundary is not user-vs-AI but **strategy-vs-execution** — a strategy can be right and still get shredded by bad execution

## Layer shape hints

**L1 (ideology):** typically anchored on risk, capital preservation, signal-vs-noise discipline.

**L3 (methods):** backtest-before-live, paper-trade-before-real, and position-sizing rules.

**L6 (heart methods):** usually very scar-heavy — "don't add leverage after a winning streak," "the backtest lied when we changed the lookback mid-review," etc.

**Failure memory:** dense. Every live-trading project collects expensive lessons quickly.

## What would go in each file

### state-snapshot.md
- Current strategies running
- Capital allocation split
- Known live risks
- Model/indicator versions in production

### L1-ideology.md
- Risk-first principles
- Position-sizing non-negotiables
- "Don't fight the system" vs "don't surrender to the system" balance

### L6-heart-methods.md
Every trader has these. Examples (likely scarred):
- "The edge is in discipline, not in the indicator"
- "A strategy that works in backtest doesn't earn trust until 60 live trades"
- "When you want to widen the stop, that's the trade telling you it's wrong"

### failure-memory.md
- Curve-fitting to the backtest
- Overriding the system mid-trade ("this one's obvious")
- Scaling up immediately after a hot streak
- Running multiple uncorrelated strategies on correlated capital

### taste-examples.md
- Good: "entry when 3 independent conditions align, pre-committed exit"
- Bad: "entry on gut, exit when it feels right"
- Why: the first is reviewable, the second is not

## Contributions needed

A real trading-agent doctrine (redacted where necessary) would be the strongest contribution this repo could receive. If you've run a live strategy for a year and have the scars, consider sharing.
