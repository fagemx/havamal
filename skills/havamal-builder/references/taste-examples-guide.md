# Taste Examples Guide

How to help a user write good taste examples. This is often the hardest layer to write because it asks the user to articulate what they currently only *feel*.

## The format

```markdown
## TE-N: <Situation name>

**Situation:** <what moment in the product / codebase / workflow is being decided>

**Good:**
<concrete artifact — code, copy, structure, UI state — not a description>

**Bad:**
<concrete artifact, seductively plausible — not a strawman>

**Why good wins:**
<project-specific reason. Reference L1 or L6 if possible.>
```

Every field is concrete. **The goal is contrast, not commentary.**

## The core principle

**Adjectives are weak. Contrast pairs teach.**

A sentence like "the product should feel thoughtful" compresses judgment into vocabulary. Different readers interpret "thoughtful" differently. Taste examples decompress that vocabulary into situations.

## Writing each field

### Situation

One sentence. Names the specific moment where taste is being applied.

**Good:** "User just saved a draft via an inline button. The agent replies to acknowledge."

**Bad:** "When the user does something."

### Good + Bad (the artifacts)

**Both must be concrete.** Code snippets, literal copy, actual UI states. Not descriptions of those things.

**The bad version must be seductive.** If bad looks obviously wrong, the entry teaches competence, not taste.

**They must differ in ONE axis.** If good and bad differ in 10 ways, the reader can't identify the taste call.

**Example (good):**

> **Good:**
> ```
> Draft saved.
> [Edit] [Discard]
> ```
>
> **Bad:**
> ```
> ✨ I've successfully saved your draft! Would you like me to set a reminder
> or share it with collaborators? Let me know what you'd like to do next.
> ```

They differ in tone/register (quiet completion vs. performative). That's one axis.

**Example (bad — too many axes):**

> **Good:** short, quiet, has buttons
> **Bad:** long, emoji-prefixed, asks a question, no buttons

Now the reader doesn't know: is the taste call about length? emoji? buttons? question vs. statement?

### Why good wins

**Project-specific reason.** Not a generic best practice.

**Good:**
> L1.1 (product is a quiet editor, not a chatty assistant). "Successfully" is corporate voice; emoji prefix is performative. The bad version turns a quiet completion into a menu.

This could only apply to *this* project — "quiet editor, not a chatty assistant" is the project's specific stance.

**Bad:**
> Shorter copy is better. Avoid unnecessary emoji.

Generic style advice. Not teaching taste.

## Sourcing entries

The best taste examples come from:

1. **"No, not like that — like this" moments.** The user sees a draft, says no, shows the alternative. That exchange is a taste example waiting to be written.
2. **Code review comments that generalized.** One PR got rewritten; the rewrite was the good version. Write it up before the reasoning evaporates.
3. **Two PRs shipped side-by-side, one reverted.** The reverted one is the seductive bad version.
4. **Product rewrites.** When a feature was rewritten for reasons other than bugs, those reasons are usually taste. Extract.
5. **Moments where you explained the difference twice.** If you're saying "this is why X is better" to multiple agents or humans, write the distinction down.

## How many entries

- **v0:** 3 entries. These are genuinely hard to write; 3 is a real accomplishment.
- **Mature:** 5–15 entries.
- **Over 20:** you're mixing taste with style-guide items — split the file.

## The self-test

After writing an entry, give a fresh agent just the doctrine + a new situation that tests the same axis. Ask them for a good/bad pair.

- If the agent reproduces the distinction, the entry works.
- If the agent hedges or goes generic, the entry needs sharpening.
- If the agent asks "what do you mean by X?" — the situation field is unclear.

## Common writing mistakes

### 1. "Strawman bad"

Bad option is obviously terrible. No one would write it.

**Example (strawman):**
> **Good:** Use descriptive variable names.
> **Bad:** Use single-letter variable names everywhere.

Any competent engineer rejects the bad version on reflex. This teaches nothing.

**Fix:** write a bad option that a capable agent would actually produce. Make it seductive — smooth, plausible, arguably defensible.

### 2. "Multi-axis contrast"

Good and bad differ in too many dimensions.

**Example (too many axes):**
> **Good:** A short, Chinese, button-laden reply with no emoji
> **Bad:** A long, English, question-asking reply with emoji

**Fix:** pick ONE axis. If the taste call is about register, control for length and language. Vary only register.

### 3. "Generic why"

"Why good wins" is style-guide reasoning, not project reasoning.

**Example:**
> **Why good wins:** Good code is readable.

**Fix:** reference this project's L1, L6, or user-interview evidence. What about *this* project makes the good version fit?

### 4. "Missing situation"

Entry is a context-free good/bad pair. Reader doesn't know where this taste applies.

**Fix:** name the specific moment. "When rendering an AI-generated answer" is better than "for AI outputs."

### 5. "Taste entry that's really a style rule"

"Use camelCase for variables" is a style rule, not taste.

**Fix:** ask "does this distinction depend on my project's values, or is it a universal convention?" Universal conventions → style guide. Project-dependent choices → taste.

## Working with the user

The user often knows what they want but can't articulate it. To extract taste examples:

1. **Ask for the last rewrite** they did on a PR or a product surface. Why the rewrite?
2. **Show them two versions** of something and ask which is "more us." Their reasoning is taste.
3. **Ask "what would feel wrong?"** — constraints are often easier to articulate than preferences.
4. **Watch for "thoughtful" / "clean" / "right"** as adjectives. Every one of those is a taste example waiting to be decompressed.
5. **Write a first draft and iterate.** Like failure-memory, the first version is rarely the one that lands.

## What NOT to put in taste examples

- Style-guide rules
- Universal best practices (those go in a generic style doc)
- Single-artifact "this is good" entries without contrast
- Strawman comparisons
- Taste calls that depend on personal preference rather than project values

## Relationship with L1 and L6

Taste examples are the **concrete instantiation** of L1 and L6.

- L1 says WHY the taste matters in principle
- Taste examples show WHAT the principle looks like in practice
- L6 compresses the taste call into a maxim once it's internalized

The three together are what "the school" actually *is*. Everything else is scaffolding.

## Voice of the entries

- Short
- No editorializing
- Contrast-heavy
- Project-specific "why"
- Technical precision in the Good/Bad artifacts

Entries should read like they were written by someone who has seen both options and knows which one they'd accept in a PR review.
