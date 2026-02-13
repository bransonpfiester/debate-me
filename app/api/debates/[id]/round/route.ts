import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { userArgument, roundNumber } = await request.json();

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get debate details
    const { data: debate } = await supabase
      .from('debates')
      .select('*')
      .eq('id', id)
      .single();

    if (!debate) {
      return NextResponse.json({ error: 'Debate not found' }, { status: 404 });
    }

    // Get previous rounds
    const { data: previousRounds } = await supabase
      .from('rounds')
      .select('*')
      .eq('debate_id', id)
      .order('round_number', { ascending: true });

    // Generate AI response
    let context = `You are debating against a human on the topic: "${debate.topic}"\n\n`;
    
    if (previousRounds && previousRounds.length > 0) {
      context += "Previous rounds:\n";
      previousRounds.forEach((r, i) => {
        context += `\nRound ${i + 1}:\n`;
        context += `Human: ${r.user_argument}\n`;
        context += `You: ${r.ai_argument}\n`;
      });
    }

    context += `\nRound ${roundNumber}:\nHuman: ${userArgument}\n\nYour task: Provide a compelling counter-argument. Be persuasive, intelligent, and concise (max 150 words). Don't be agreeable - challenge their points directly.`;

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 300,
      messages: [{ role: 'user', content: context }],
    });

    const aiArgument = message.content[0].type === 'text' ? message.content[0].text : '';

    // Save round
    const { data: round, error } = await supabase
      .from('rounds')
      .insert({
        debate_id: id,
        round_number: roundNumber,
        user_argument: userArgument,
        ai_argument: aiArgument,
      })
      .select()
      .single();

    if (error) throw error;

    // If this was round 3, mark debate as completed
    if (roundNumber === 3) {
      await supabase
        .from('debates')
        .update({ status: 'completed' })
        .eq('id', id);
    }

    return NextResponse.json({ round });
  } catch (error: any) {
    console.error('Round submission error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to submit round' },
      { status: 500 }
    );
  }
}
