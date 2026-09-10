---
name: deep-dive-post
description: Assists in drafting long-form, hook-driven "deep dive" posts that make a complex, disputed, or hyped technical/scientific claim understandable to an engineer-level reader — in Spanish, English, or Portuguese. Use this whenever the user wants to write a deep-dive, long-form technical explainer, or analysis post about a complex or controversial result (an AI research claim, a math/physics proof, a disputed benchmark, a "the internet is arguing about X" situation), especially when they mention wanting a strong hook, showing 1-2 equations, adding a Mermaid diagram, weighing hype against criticism, or building the post section by section instead of all at once. Push to use this over writing the post freehand any time the request involves a contested technical claim and a general engineering audience. Do NOT use this for short newsletter blurbs (see news-draft) or short spoken video scripts (see reel-draft) — this is for longer, more analytical, multi-section pieces.
---

# Deep Dive Post Writer

A deep dive earns a reader's attention by being honest about what's actually known, not by picking a side in the hype-vs-criticism fight. The reader is an engineer or someone with technical/scientific literacy — they don't need things dumbed down, they need the real mechanism explained with the noise stripped out.

This skill is project-scoped (this repo only) and complements `news-draft` (short newsletter blurb) and `reel-draft` (short spoken video script). Reach for it when the piece is longer, more analytical, and needs to hold real tension between "this might be huge" and "here's what's actually shaky about it."

## Core philosophy

- **One honest question drives the whole piece**: usually "is this actually true / actually as big as people say?" Resolve *what exactly was shown* before writing any critique — the critique only makes sense once the reader knows the real, bounded claim.
- **A concrete image beats a definition.** Before naming the formal concept, describe what it would look like/feel like in the world. Only then attach the formal term.
- **Minimal math, maximum leverage.** 1-2 equations, never more, and each one must be doing real work (showing the actual object in question, not decorating the prose). See Stephen Hawking's editorial rule below.
- **Real voices over vague hedging.** "Some say X, others say Y" is weak. Name what's actually being contested and by whom (paraphrased is fine) when the source material supports it.
- **Epistemic honesty is the spine, not a disclaimer.** Explicitly distinguish "shown/computed" from "peer-reviewed" from "formally accepted." This distinction usually *is* the resolution to the hype-vs-criticism tension — say it plainly instead of hedging at the end.
- **Say each strong idea once.** If the same point resurfaces under different words, that's a sign to cut, not reinforce.

Full technique and criteria checklist: [references/techniques.md](references/techniques.md). Read it before drafting the outline — it has the sourced writing techniques and the repurposed engineering-review criteria this skill is built on, with a short note on why each one matters.

## Workflow

Work in stages, and treat every stage after the outline as **iterative** — draft a section, show it, let the user redirect, move on. Don't try to produce the whole post in one shot unless the user explicitly asks for a full draft.

### 1. Pin down the shape

Before writing anything, get (or infer from the conversation, and confirm):

- **The source material** — article, paper, thread, or a summary the user already has. If it's thin or one-sided, say so before proceeding rather than writing around the gap.
- **Language(s)** — Spanish, English, Portuguese, or more than one. If more than one, draft in one language fully first, then adapt — don't try to write two languages in parallel section by section, the register will drift.
- **The two poles of the tension** — what the "this is huge" camp says, and what the "this is overstated" camp says. If the user hasn't supplied both sides yet, ask, or flag that research is needed first (delegate to `/research` or a subagent if a real investigation is required — don't invent a critic's position).

### 2. Extract and verify claims

Same discipline as `news-draft`: pull every factual claim out as an atomic statement, then build a `CLAIM / STATUS` table (Verified / Flagged). Only verified claims advance into the draft; flagged ones are cut or explicitly framed as unverified opinion. Do not soften this step even when the user is in a hurry — an unverified claim in a "what's actually true" post defeats the point of the post.

### 3. Resolve the central question before outlining

Answer explicitly, in your own notes, before writing prose: *what exactly was shown or claimed?* Getting this precise (the specific, bounded version — not the headline version) is what makes the later criticism section make sense instead of reading as generic skepticism.

### 4. Choose the anchor

Pick one concrete image or metaphor that carries the whole piece (e.g. "taming the whirlpool," "a lock with the key already cut"). Reuse it instead of re-explaining the concept from scratch each time it resurfaces — it's the thread that keeps a short, dense piece feeling like one continuous idea rather than a list of facts.

### 5. Outline

A deep dive built on this philosophy usually has this shape — treat it as a default, not a rigid template:

1. **Hook** — open on the concrete conflict or image, not the definition. ("Half the internet says X just solved a century-old problem. The other half says it's marketing." beats "X is a famous unsolved problem in...")
2. **What's the problem, and why is it hard** — the concrete image first, the formal statement second, one equation at most here if the object itself needs it.
3. **What was actually done** — the core equation (if not already shown), the real, bounded claim, and enough of the mechanism that a technical reader feels they understand *how*, not just *that*. A Mermaid diagram fits well here if the logic has a clear sequence (a flowchart of the construction, a comparison, a decision path) — don't add one just to have a diagram.
4. **What's contested, or what's being left out** — the specific, named criticism, not a vague "some are skeptical." If it touches the actor's track record or incentives (funding, past controversies, business model), keep it factual and sourced — this is the section most likely to overreach, so hold it to the same CLAIM/STATUS bar as everything else.
5. **Where it actually stands** — the epistemic-honesty payoff: verified vs. accepted vs. still open. This is the section that resolves the hook's tension; it should feel earned, not tacked on.

Confirm the outline with the user before drafting full sections — it's cheap to redirect here and expensive after three sections are written.

### 6. Draft, section by section

For each section: draft it, apply the self-check below, and show it before moving to the next. Expect to go back and forth — a section that reads as accurate may not land as a hook, or vice versa; that's normal and is exactly what the two-axis check below is for.

### 7. Self-check every section on two separate axes

Don't average these into one impression — a section can fail one and pass the other:

- **Accuracy axis**: Is every claim here still backed by the CLAIM/STATUS table? Did a hedge get lost in editing for flow?
- **Hook/purpose axis**: Does this section earn its place — does it move the reader from confusion toward the piece's central resolution, or is it filler?

Also run, once per section:
- **Redundancy check** — does this repeat something already said elsewhere in the piece under different words? Cut, don't reinforce.
- **Canonical term check** — first use of any technical shorthand ("blow-up," "resolved," "counterexample") should be precise about scope, before the piece starts using it loosely.
- **Elimination test** — if a sentence were deleted, would the reader lose a fact, a criticism, or an implication? If not, cut it.

## Style

- Paragraphs: 2-4 sentences, rarely more than 5-6 lines.
- Transitions by continuity of idea (end a paragraph on the concept the next one opens with), not by connector words ("sin embargo," "however," "por outro lado").
- Equations: `$...$` inline or `$$...$$` block (KaTeX-compatible). Cap at 1-2 for the whole piece.
- Diagrams: ` ```mermaid ` fenced blocks, only when the logic is genuinely sequential/comparative.
- Bold for names/products/key terms, italics for secondary emphasis, matching the house style already used in `news-draft`/`reel-draft`.
- Tone: confident, never hyped; critical without being cynical. The piece should read as "here's what's actually true," not as a takedown or a puff piece.

## Output

Produce, per language requested:

**TITLE** — short, concrete, no emojis.

**HOOK/SUMMARY** — 1-2 sentences, states the tension, not the resolution.

**CONTENT** — Markdown compatible with `marked`, following the section shape above, with `##`/`###` headers (emoji-led, matching the other post skills' convention), `---` between major sections.

Save to `docs/deep-dives/<title-as-slug>.<lang>.md` (e.g. `docs/deep-dives/openai-navier-stokes.es.md`), structured as:
```
# Title
**HOOK:** ...
---
## content...
```

If multiple languages were requested, save one file per language, sharing the same slug. Confirm each save and show TITLE + HOOK as a quick preview before moving on.
