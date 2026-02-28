import type { AdCopyInputs, AdPlatform } from '@/types';

const platformSpecs: Record<AdPlatform, string> = {
  facebook: `Headline: max 40 chars. Primary text: 100-200 chars. Write as natural flowing prose — no forced line breaks unless the copy itself calls for a pause or list. The line break is a creative choice, not a rule. First sentence must be scroll-stopping. Emojis only if they genuinely serve the copy.`,
  google: `Headline: max 30 chars, search-intent match. Primary text: 2 descriptions max 90 chars each. No exclamation marks in headlines. No GOOGLE_FULL objects — one flat variant object only. Platform field must be exactly: google`,
  tiktok: `Caption: 80-130 chars. Sound like a person discovering something, not a brand selling something. Hook formats: "POV:", "nobody talks about", "tell me why". Keep it tight. One or two emojis max.`,
  youtube: `Title: max 70 chars, front-load the hook. Primary text: first 2 lines before "Show More" do the heavy lifting. Best hooks: "Watch this if [situation]", "Why I [action]", "The truth about [topic]".`,
  native: `Headline: max 80 chars — must read like editorial, not advertising. Primary text: 150-220 chars of article-opening prose. Never use exclamation marks, ALL CAPS, or ad language like "sale", "buy now", "discount". Click must feel earned, not pushed.`,
};

const hookFormulas = `HOOK FORMULAS — pick different ones across variants:
- Curiosity Gap: hint at something without revealing it
- Agitation: name the exact painful situation and sit in it
- Social Proof: specific number + specific result + specific timeframe
- Contrarian: contradict something the reader believes
- Story Drop: open mid-scene, no setup
- Identity: "for people who [X] but want [Y]"
- Challenge: "can you [result] in [timeframe]? most can't."
- Direct Benefit: lead with the outcome, zero preamble`;

const psychologyRules = `PSYCHOLOGY TO EMBED:
- Loss aversion beats gain: what do they lose by not acting?
- Specificity = credibility: "23 lbs" beats "weight loss", "$340 saved" beats "saves money"
- Cognitive ease: the reader should never have to re-read a sentence
- Objection preemption: address the #1 reason they won't click, inside the copy
- Emotion before logic: make them feel first, justify second`;

export function buildAdCopyPrompt(inputs: AdCopyInputs): string {
  const platformsRequested = inputs.platforms.map(p =>
    `### ${p.toUpperCase()}\n${platformSpecs[p]}`
  ).join('\n\n');

  return `You are a direct response copywriter. You write ads that convert.

## BRIEF
Product: ${inputs.productName}
What it does: ${inputs.productDescription}
Who it's for: ${inputs.targetAudience}
Main result: ${inputs.mainBenefit}
Pain points: ${inputs.painPoints}
The offer: ${inputs.offer}
CTA: ${inputs.cta}
Tone: ${inputs.tone.replace(/_/g, ' ')}

## PLATFORMS
${platformsRequested}

## FORMULAS
${hookFormulas}

## PSYCHOLOGY
${psychologyRules}

## COPY RULES
1. Every variant opens with a different hook formula — no two variants start the same way
2. Write for one reader. "You", not "people"
3. Emotion before logic — feel first, justify second
4. Specific always beats vague
5. Formatting is a creative choice — use line breaks only when the copy itself demands a pause, a contrast, or a list. Never break just to break.
6. primaryText must have real body copy — never empty
7. Tone is ${inputs.tone.replace(/_/g, ' ')} — stay consistent word to word
8. Write copy a media buyer would want to test tomorrow, not lorem ipsum dressed up

## PLATFORM RULES
- Platform field: ONLY these exact strings: ${inputs.platforms.join(', ')}
- NEVER invent new platform keys (no google_full, no facebook_feed, etc.)
- Exactly ${inputs.variantCount} variants per platform
- Total variants: exactly ${inputs.variantCount * inputs.platforms.length}

## OUTPUT — raw JSON only, no markdown, no preamble
{
  "variants": [
    {
      "platform": "${inputs.platforms[0]}",
      "headline": "...",
      "primaryText": "...",
      "description": "...",
      "cta": "...",
      "hookType": "curiosity|social_proof|fear|desire|story|contrarian|identity|question"
    }
  ],
  "notes": "3 sentences: which hooks were used across variants, why they fit this audience, what psychological principle anchors each one"
}`;
}