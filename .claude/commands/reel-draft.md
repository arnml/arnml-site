# Tech Shorts

Create fast, spoken-only TikTok scripts for a creator who records in casual real-life settings such as a couch, cafe, restaurant, or while drinking coffee. EN ESPAÑOL. Input: $ARGUMENTS

## Core goal

Turn a source input into a short video idea that:

- grabs attention immediately
- stays faithful to the real meaning of the source
- sounds smart, funny, and occasionally sarcastic
- questions hype without sounding cynical or anti-learning
- nudges the audience toward research, coding practice, and better system design thinking
- ends with a question that invites reflection

## Inputs this skill should handle

Accept any of these:

- a pasted article or excerpt
- a link plus a user summary
- raw notes
- a topic such as "AI agents", "RAG", "MCP", or "vector DB benchmarks"
- a messy mix of facts, opinions, and examples

If the user provides multiple sources, identify the strongest single angle instead of trying to summarize everything.

## Required workflow

Follow this order every time.

1. **Search the web**
   - Search for the topic, claim, or article to find diverse opinions, recent reactions, and community takes.
   - Look for counterarguments, benchmark results, or real-world usage reports.
   - Use search results to pressure-test the source and find the most interesting angle.

2. **Identify the real point**
   - Extract the main claim, what is actually useful, and what part is hype.
   - Separate fact from marketing language.
   - Prefer one clear takeaway over many weak points.

3. **Choose the angle** — pick one:
   - myth-busting
   - practical coding takeaway
   - system design lesson
   - research reality check
   - tool comparison with skepticism
   - funny contradiction between hype and reality

4. **Write 3 hooks**
   - Each hook must be distinct.
   - Hooks should be short enough to say naturally in the first 2 to 4 seconds.
   - Hooks must create curiosity, tension, irony, or recognition.
   - Do not make claims stronger than the source supports.

5. **Write the final script**
   - Aim for 20 to 30 seconds when spoken aloud.
   - Write only spoken lines, not stage directions.
   - Keep the pacing tight and conversational.
   - Make it sound natural for someone filming themselves casually.
   - Include one memorable funny line or light sarcastic turn.
   - Include one concrete learning-oriented takeaway.
   - End with a reflection question.

6. **Quick self-check before answering** — confirm silently that the script is:
   - faithful in meaning
   - not overloaded with jargon
   - not too corporate or polished
   - not too exaggerated to become misleading
   - fast to say in one take

## Tone rules

**Use this voice:**

- smart
- funny
- sometimes sarcastic
- skeptical of hype
- pro-learning, pro-building, pro-research

**Avoid this voice:**

- doomposting
- empty hype
- cringe motivational language
- fake certainty
- edgy for the sake of being edgy
- overexplaining like a tutorial transcript

## Fidelity rules

Preserve the source meaning. You may lightly exaggerate the framing of the hook for attention, but do not alter the factual takeaway. If the source is uncertain, say so plainly. If the source is mostly hype and low substance, say that directly and pivot to what is still worth learning.

## Content strategy rules

Prefer ideas like these:

- "everyone is hyping X, but the real lesson is Y"
- "this sounds impressive until you think about the system design"
- "cool demo, but what happens in production"
- "the model is not magic; the engineering is the point"
- "this is useful if you actually build with it"

Good closing question patterns:

- "Would you actually ship this, or just repost the demo?"
- "Are you learning the tool, or just learning the hype cycle?"
- "What breaks first when this hits production?"
- "Would this survive a real benchmark, or just a launch thread?"

## Output format

Always use this exact structure unless the user explicitly requests another format.

**Hook 1**

[one short hook]

**Hook 2**

[one short hook]

**Hook 3**

[one short hook]

**Final script**

[20 to 30 second spoken-only script]

## Default script shape

Use this rhythm unless the topic clearly needs a different one:

1. open with a sharp hook
2. name the trend, claim, or article point
3. puncture the hype or reframe it
4. give one useful coding, research, or system design takeaway
5. end with a reflection question

## Compression rules

When the draft feels too long:

- cut adjectives first
- cut secondary examples
- keep only one technical takeaway
- replace lists with contrasts
- prefer short sentences over dense sentences

## What to do when source quality is weak

If the source is shallow, vague, or overly promotional:

- do not pretend it is more rigorous than it is
- extract the one real lesson if one exists
- if needed, frame the script around why the claim is incomplete

## Ask follow-up questions only when truly necessary

Only ask for clarification if the source is too thin to identify a real point. Otherwise, make the best script possible from the provided material.

## Example prompts this skill should handle

- Turn this AI article into a 25 second TikTok with 3 hooks and one final script.
- Use these notes on vector databases and make it smart, funny, and skeptical.
- Make a short script about this coding tool launch. Push back on the hype, but keep it fair.
- Take this research summary and give me a meme-y tech version with a serious engineering takeaway.

## File output

Save to `docs/reels/<title-as-slug>.md` with this structure:

```
# Title
**content:** ...
---
**description:** ...
```

Confirm the save and show TITLE + CONTENT + DESCRIPTION as a quick preview.

## Style guide

**Voice summary**

The creator sounds like someone who actually builds and reads technical material, but refuses to worship every new launch.

**Keep:**

- quick pattern recognition
- dry humor
- mild sarcasm
- practical skepticism
- respect for real engineering work
- curiosity and reflection

**Avoid:**

- sounding bitter
- dunking on beginners
- making everything negative
- turning every script into a rant
- abstract thought leadership language

**What "smart and funny" sounds like:**

- "People are calling this revolutionary. Translation: someone shipped a nice demo."
- "The model is cool. The evals are the adult supervision."
- "This is either a workflow breakthrough or a very expensive autocomplete habit."

**What "against hype but encouraging" sounds like:**

- criticize shallow claims, not learning itself
- redirect attention toward research, benchmarks, architecture, code quality, tradeoffs, and deployment reality
- make viewers feel invited to think, not shamed for being interested

**Helpful contrast patterns:**

- hype vs production
- demo vs benchmark
- model magic vs engineering reality
- launch thread vs long-term maintenance
- novelty vs actual leverage

## Spoken delivery guidelines

Write for casual self-recording:

- use contractions
- keep sentences short
- avoid nested clauses
- avoid numbers unless they matter
- make every sentence easy to say in one breath
