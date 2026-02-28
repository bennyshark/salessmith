import type { VSLInputs } from '@/types';

const hookInstructions: Record<string, string> = {
  shock_stat: 'Open with a counterintuitive fact or statistic that reframes the problem. The reader should think "wait, that can\'t be right" — and keep reading to find out.',
  story: 'Open mid-scene. No setup, no intro. Drop the viewer into a specific moment — a feeling, a situation, a conversation overheard. They should feel like they missed something and need to catch up.',
  bold_promise: 'State the outcome in the first sentence. Specific, measurable, believable. The reader should immediately think "if that\'s true, I need to keep watching."',
  question: 'Ask the exact question that is already running on a loop in your viewer\'s head. So specific and so accurate that they feel seen.',
  controversy: 'Challenge something your audience believes — a common practice, a popular piece of advice, an industry norm. Be direct. Be willing to lose the wrong people to gain the right ones.',
};

const toneInstructions: Record<string, string> = {
  casual: 'Write exactly like you talk. Contractions everywhere. Short sentences. Incomplete sentences if they hit harder. The viewer should feel like a friend is letting them in on something.',
  authoritative: 'Confident and precise. Every claim supported by logic or evidence. No hedging, no "maybe", no "could be". The viewer should feel they\'re learning from someone who has done this.',
  emotional: 'Lean into feeling — specific, sensory, human. Name the emotions without narrating them. Show the moment, not the label.',
  hype: 'High energy. The speaker is genuinely excited. Short punchy sentences. Momentum builds. By the CTA the viewer feels like missing out would be a mistake.',
};

export function buildVSLPrompt(inputs: VSLInputs): string {
  return `You are writing a video sales letter script. Your job is to hold attention, build desire, and convert a viewer who is skeptical and distracted.

## THE BRIEF
Product: ${inputs.productName}
What it is: ${inputs.productDescription}
Who it's for: ${inputs.targetAudience}
Problem it solves: ${inputs.mainProblem}
Transformation delivered: ${inputs.transformation}
Price: ${inputs.price}
Guarantee: ${inputs.guarantee}
Bonuses: ${inputs.bonuses || 'none'}

## STYLE
Hook: ${hookInstructions[inputs.hookStyle]}
Tone: ${toneInstructions[inputs.tone]}

## THE 14 SECTIONS — write all of them

1. **HOOK** (50-80 words)
   The first thing the viewer hears. Must create an open loop or an emotional reaction in under 10 seconds. If this section doesn't work, nothing else matters.

2. **OPEN_LOOP** (60-100 words)
   Tease what they're about to discover. Make a promise you'll fulfill later. Don't reveal yet — create hunger.

3. **STORY** (120-180 words)
   A specific, relatable story. The viewer should see themselves in it. Establish credibility through experience, not credentials.

4. **PROBLEM** (80-120 words)
   Name the problem precisely. Go deeper than surface symptoms — identify the root cause they haven't identified themselves.

5. **AGITATE** (60-90 words)
   What happens if nothing changes? Make the cost of inaction feel real and immediate.

6. **SOLUTION** (80-120 words)
   Introduce the product as the natural answer to everything just described. Not a pitch — a revelation.

7. **HOW_IT_WORKS** (100-150 words)
   The mechanism. Make the viewer understand why this works when other things haven't. Simple, clear, logical.

8. **PROOF** (80-120 words)
   Specific results from real use. Names, numbers, timeframes. Write plausible, specific examples if none are provided.

9. **OFFER_STACK** (100-150 words)
   Build the value. Everything included, presented as a stack. Each item gets a line. Momentum builds toward the price.

10. **PRICE_REVEAL** (60-90 words)
    Anchor high. Reveal the real price as a contrast. The viewer should feel like they're getting something worth far more.

11. **GUARANTEE** (50-70 words)
    Remove risk completely. Make the guarantee feel generous and specific.

12. **URGENCY** (50-70 words)
    A real reason to act now — not "limited time offer." Scarcity or consequence that the viewer actually believes.

13. **CTA** (50-80 words)
    Tell them exactly what to do and what happens next. Remove any confusion or hesitation about the action step.

14. **CLOSE** (40-60 words)
    One final emotional pull. Remind them of the transformation. Make them picture their life after.

## WRITING RULES
- Write as spoken word — read it aloud in your head as you write it
- Tone is ${inputs.tone} throughout — don't drift
- Specific beats vague in every sentence
- Speaker notes in [brackets] are optional — use only when they genuinely change how a line lands
- No corporate language, no buzzwords, no passive voice
- Each section must flow naturally into the next — no hard stops

## OUTPUT — raw JSON only, no markdown, no preamble
{
  "sections": [
    {
      "id": "hook",
      "label": "Hook",
      "content": "...",
      "estimatedSeconds": 30
    }
  ],
  "totalWordCount": 1400,
  "estimatedMinutes": 11,
  "topObjections": [
    "Objection + one sentence on how the script addresses it"
  ]
}

Write all 14 sections. Make this script something the client would actually use.`;
}