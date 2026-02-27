import type { VSLInputs } from '@/types';

const hookInstructions: Record<string, string> = {
  shock_stat: 'Open with a shocking, counterintuitive statistic or fact that reframes the problem.',
  story: 'Open mid-scene in a relatable story — no preamble. Drop the viewer directly into a specific moment.',
  bold_promise: 'Make a bold, specific, time-bound promise in the first sentence.',
  question: 'Ask a painful, specific question the exact right viewer will answer "yes" to immediately.',
  controversy: 'Open by contradicting a widely-held belief in the niche. Be polarizing on purpose.',
};

const toneInstructions: Record<string, string> = {
  casual: "Write like you're talking to a friend over coffee. Contractions everywhere. Short sentences.",
  authoritative: "Confident, commanding, expert-led. Every claim backed by logic. No hedging.",
  emotional: "Pull on emotional triggers — loss, fear, hope, transformation. Specific sensory language.",
  hype: "High energy, enthusiastic, lots of emphasis. Reads like the speaker is genuinely excited.",
};

export function buildVSLPrompt(inputs: VSLInputs): string {
  return `You are a veteran video sales letter copywriter who has written scripts that generated over $50M in revenue.

Write a complete VSL script using the brief below.

## PRODUCT BRIEF
- Product Name: ${inputs.productName}
- What It Is: ${inputs.productDescription}
- Target Audience: ${inputs.targetAudience}
- Main Problem It Solves: ${inputs.mainProblem}
- Transformation It Delivers: ${inputs.transformation}
- Price: ${inputs.price}
- Guarantee: ${inputs.guarantee}
- Bonuses: ${inputs.bonuses || 'None'}

## STYLE INSTRUCTIONS
- Hook Style: ${hookInstructions[inputs.hookStyle]}
- Tone: ${toneInstructions[inputs.tone]}

## VSL STRUCTURE (write ALL sections)
1. HOOK (60-90 words) — Stop the scroll, create an open loop
2. OPEN_LOOP (80-120 words) — Tease what they'll discover
3. STORY (150-200 words) — Relatable story establishing credibility
4. PROBLEM (100-150 words) — Agitate the pain. Make them feel it.
5. AGITATE (80-120 words) — Pour salt in the wound. What happens if nothing changes?
6. SOLUTION (100-150 words) — Introduce the product as the inevitable answer
7. HOW_IT_WORKS (120-180 words) — Explain the mechanism
8. PROOF (100-150 words) — Social proof, results, testimonials
9. OFFER_STACK (120-180 words) — Present everything they get, build value
10. PRICE_REVEAL (80-100 words) — Anchor high, reveal the real price with drama
11. GUARANTEE (60-80 words) — Make the risk disappear
12. URGENCY (60-80 words) — Real reason to act now
13. CTA (60-90 words) — Clear, direct, remove hesitation
14. CLOSE (40-60 words) — Final emotional pull, restate transformation

## RULES
- Write in ${inputs.tone} tone throughout — stay consistent
- Do NOT use corporate language, clichés, or buzzwords
- Write as if this will be spoken aloud
- Speaker directions in [brackets] are optional (e.g., [pause], [look at camera])
- Specific always beats vague — use numbers, timeframes, specific details

## OUTPUT FORMAT
Return ONLY a valid JSON object. No preamble. No markdown. Raw JSON only.

{
  "sections": [
    {
      "id": "hook",
      "label": "Hook",
      "content": "...",
      "estimatedSeconds": 25
    }
  ],
  "totalWordCount": 1450,
  "estimatedMinutes": 11,
  "topObjections": [
    "Objection 1 and how the script addresses it",
    "Objection 2 and how the script addresses it",
    "Objection 3 and how the script addresses it",
    "Objection 4 and how the script addresses it",
    "Objection 5 and how the script addresses it"
  ]
}`;
}