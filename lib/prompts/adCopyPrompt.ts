import type { AdCopyInputs, AdPlatform } from '@/types';

const platformSpecs: Record<AdPlatform, string> = {
  facebook: 'Primary text: 125 chars ideal (max 500). Headline: 40 chars max. Description: 30 chars max. Use line breaks and conversational tone.',
  google: 'Headline: 30 chars max. Primary text: write 2 descriptions of 90 chars each separated by a newline. No exclamation marks in headlines. Focus on keywords and direct benefit. Do NOT create a GOOGLE_FULL object.',
  tiktok: 'Caption: 150 chars ideal. Very casual, Gen-Z friendly tone. Use hooks like "POV:", "tell me why". Short punchy sentences.',
  youtube: 'Title: 70 chars max. Description first 2 lines visible before fold — make them count. Use "Watch this if..." style hooks.',
  native: 'Headline: 80 chars max (curiosity-gap style). Body: 250 chars max. Must not feel like an ad. Blend with editorial content.',
};

export function buildAdCopyPrompt(inputs: AdCopyInputs): string {
  const platformsRequested = inputs.platforms.map(p =>
    `- ${p.toUpperCase()}: ${platformSpecs[p]}`
  ).join('\n');

  return `You are a world-class direct response copywriter with 15+ years writing high-converting ad copy for performance marketers.

Your task is to write ${inputs.variantCount} ad copy variants for each requested platform.

## PRODUCT BRIEF
- Product Name: ${inputs.productName}
- Description: ${inputs.productDescription}
- Target Audience: ${inputs.targetAudience}
- Main Benefit: ${inputs.mainBenefit}
- Pain Points: ${inputs.painPoints}
- Offer: ${inputs.offer}
- CTA: ${inputs.cta}
- Tone: ${inputs.tone.replace('_', ' ')}

## PLATFORMS & SPECS
${platformsRequested}

## WRITING RULES
1. Lead with the HOOK — the first line must stop the scroll or earn the click
2. Speak to ONE person, not a crowd ("you" not "people like you")
3. Benefit first, feature second — nobody cares what it is, only what it does for them
4. Match the tone specified: ${inputs.tone.replace('_', ' ')}
5. Use different hook types across variants (curiosity, social proof, fear, desire, story)
6. Never start two variants with the same opening word
7. Each variant must feel completely different — not just shuffled words
8. primaryText must NEVER be empty — every variant requires a full body copy

## STRICT PLATFORM RULES
- The "platform" field must ONLY ever be one of these exact lowercase strings: facebook, google, tiktok, youtube, native
- NEVER invent new platform keys like "google_full", "google_rsa", "google_ads", or any variation
- NEVER create a separate GOOGLE_FULL object or any nested ad group objects
- Treat google exactly like every other platform — one flat variant object per variant
- Every single variant must have a non-empty "primaryText" field with real ad copy

## OUTPUT FORMAT
Return ONLY a valid JSON object. No preamble, no explanation, no markdown code blocks. Just raw JSON.

The exact structure must be:
{
  "variants": [
    {
      "platform": "facebook",
      "headline": "...",
      "primaryText": "...",
      "description": "...",
      "cta": "...",
      "hookType": "curiosity|social_proof|fear|desire|story|question"
    }
  ],
  "notes": "2-3 sentences of copywriter notes on the strategy used"
}

Generate exactly ${inputs.variantCount} variants for each of these platforms: ${inputs.platforms.join(', ')}.
Total variants in the array must be exactly ${inputs.variantCount * inputs.platforms.length}.`;
}