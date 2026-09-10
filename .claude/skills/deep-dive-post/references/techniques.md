# Techniques and criteria checklist

Compiled from external research on high-impact science/technical writing, and from criteria repurposed out of this repo's engineering skills (`mattpocock-skills`). Read this before outlining a deep dive; use it as a checklist during the self-check step, not as a script to follow line by line.

## Sourced writing techniques

1. **Hook with a concrete conflict, not a genericity.** Quanta Magazine's ABC-conjecture piece opened with "titans of mathematics clash," not with a definition of the conjecture. Applied: open with the actual disagreement ("X claims to have solved a century-old problem — the people who'd know best aren't convinced") rather than defining the underlying concept first. ([Quanta](https://www.quantamagazine.org/titans-of-mathematics-clash-over-epic-proof-of-abc-conjecture-20180920/))

2. **One equation per piece, maybe two.** Stephen Hawking's editor told him every equation halved his readership; *A Brief History of Time* shipped with essentially one (E=mc²). Applied: cap at 1-2 equations, and only the ones that show the actual object under discussion — never decorative.

3. **Concrete image before formalism.** Grant Sanderson (3Blue1Brown) inverts the classic order: a visual, motivating case comes before the abstract definition. Applied: describe what the phenomenon would look like in the world before naming it formally.

4. **Real, specific voices in the tension — not "some say / others say."** Quanta names the actual experts and their actual arguments. Applied: name the specific objection (e.g. "is this an unreviewed AI-assisted proof, or does it rely on a modified version of the equations?") instead of a vague "there are doubts."

5. **A feature lede delays the punchline for effect.** Open on a scene or situation, then deliver the hard claim. Applied: open on "a problem that's resisted 150+ years of mathematics" before "and now a model claims to have cracked it."

6. **Vary paragraph length; avoid uniform blocks.** High-impact science writing alternates short, punchy paragraphs with slightly longer development ones. Applied: 2-4 sentences per paragraph, rarely more than 5-6 lines in a row.

7. **Transitions by conceptual continuity, not connector words.** The most effective transition is the idea a paragraph ends on becoming the idea the next one opens with — not "however/but/on the other hand" doing the work. ([The Open Notebook — Good Transitions](https://www.theopennotebook.com/2018/09/25/good-transitions-a-guide-to-cementing-stories-together/))

8. **Epistemic honesty as the piece's spine, not a closing disclaimer.** Terence Tao models being explicitly skeptical of one's own (and others') unreviewed work, and distinguishing "formally verified" from "accepted by the community." Applied: this distinction is usually the actual resolution of a hype-vs-criticism piece — state it as the throughline, not a hedge at the end. ([Terence Tao — Be skeptical of your own work](https://terrytao.wordpress.com/career-advice/be-sceptical-of-your-own-work/))

9. **Spend the space on one clear intuition, not full technical coverage.** Math/science reporting is notoriously hard even for adjacent-field experts — the value is in nailing one clear intuition (what the problem is, what the claim actually is), not attempting to cover the full technical mechanism. ([The Open Notebook — Mathematics Reporting](https://www.theopennotebook.com/2023/04/11/mathematics-reporting-an-uncrowded-niche-for-writers/))

## Criteria repurposed from this repo's engineering skills

1. **Two-axis review, not averaged (from `code-review`'s Standards + Spec split).** Check accuracy and hook/purpose separately per section — a section can be precise but boring, or gripping but wrong, and averaging those hides the real problem.

2. **No hypothesizing without a verification loop (from `diagnosing-bugs`).** Don't assert a claim about the underlying result without a source that confirms or refutes it. Before writing "X solved Y," verify the *specific, bounded* version of what was shown.

3. **Rank rival explanations before committing to an angle (from `diagnosing-bugs`).** Before locking in "this is a historic breakthrough," lay out the competing readings explicitly (real-but-bounded result / aggressive marketing / useful intermediate step) and pick the one the evidence actually supports.

4. **Anti-duplication (from `code-review`'s duplicated-code smell).** If the same idea shows up twice under different phrasing, say it once, forcefully, and move on.

5. **Precise canonical term on first use (from `domain-modeling`).** Don't use an overloaded/ambiguous term loosely from the start — state the precise, scoped version once ("finite-time blow-up for a specific family of initial conditions"), then use the shorthand.

6. **Elimination test (from `codebase-design` / `writing-for-agents`).** If removing a sentence costs the reader nothing real, it doesn't belong.

7. **One anchor metaphor, reused (from `writing-for-agents`'s leading-word pattern).** A single well-defined recurring image anchors understanding without re-explaining the concept every time it resurfaces.

8. **Resolve the load-bearing question before the next section depends on it (from `grilling`'s frontier discipline).** Specifically: settle "what exactly was shown/proven" before writing the criticism section — that answer is what makes the criticism legible instead of generic.
