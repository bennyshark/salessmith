import { NextResponse } from 'next/server';
import { anthropic, MODEL } from '@/lib/anthropic';
import { createClient } from '@/lib/supabase/server';
import { buildVSLPrompt } from '@/lib/prompts/vslPrompt';
import type { VSLInputs, VSLOutput } from '@/types';
const supabase = await createClient();

export async function POST(request: Request) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const inputs: VSLInputs = await request.json();

    if (!inputs.productName || !inputs.mainProblem || !inputs.transformation) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // VSL scripts are long — bump token limit
    const message = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 8000,
      messages: [{ role: 'user', content: buildVSLPrompt(inputs) }],
    });

    const rawContent = message.content[0];
    if (rawContent.type !== 'text') throw new Error('Unexpected response type');

    let text = rawContent.text.trim()
      .replace(/^```json\n?/, '').replace(/\n?```$/, '')
      .replace(/^```\n?/, '').replace(/\n?```$/, '');

    const output: VSLOutput = JSON.parse(text);

    await supabase.from('history').insert({
      user_id: user.id,
      type: 'vsl',
      title: `${inputs.productName} VSL — ${inputs.hookStyle} hook`,
      inputs,
      output,
      is_saved: false,
    });

    return NextResponse.json({ output, success: true });
  } catch (error) {
    console.error('VSL error:', error);
    return NextResponse.json({ error: 'Failed to generate VSL script. Please try again.' }, { status: 500 });
  }
}