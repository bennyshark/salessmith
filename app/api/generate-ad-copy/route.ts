import { NextResponse } from 'next/server';
import { anthropic, MODEL, MAX_TOKENS } from '@/lib/anthropic';
import { createClient } from '@/lib/supabase/server';
import { buildAdCopyPrompt } from '@/lib/prompts/adCopyPrompt';
import type { AdCopyInputs, AdCopyOutput } from '@/types';

export async function POST(request: Request) {
  try {
    const supabase = await createClient(); // ← await, inside the function
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const inputs: AdCopyInputs = await request.json();

    if (!inputs.productName || !inputs.targetAudience || inputs.platforms.length === 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const message = await anthropic.messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      messages: [{ role: 'user', content: buildAdCopyPrompt(inputs) }],
    });

    const rawContent = message.content[0];
    if (rawContent.type !== 'text') throw new Error('Unexpected response type');

    let text = rawContent.text.trim()
      .replace(/^```json\n?/, '').replace(/\n?```$/, '')
      .replace(/^```\n?/, '').replace(/\n?```$/, '');

    const output: AdCopyOutput = JSON.parse(text);

    await supabase.from('history').insert({
      user_id: user.id,
      type: 'ad_copy',
      title: `${inputs.productName} — ${inputs.platforms.join(', ')}`,
      inputs,
      output,
      is_saved: false,
    });

    return NextResponse.json({ output, success: true });
  } catch (error) {
    console.error('Ad copy error:', error);
    return NextResponse.json({ error: 'Failed to generate ad copy. Please try again.' }, { status: 500 });
  }
}