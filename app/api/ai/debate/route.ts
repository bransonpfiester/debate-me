import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { topic, userArgument, round, previousRounds } = await request.json();

    // Build context from previous rounds
    let context = `You are debating against a human on the topic: "${topic}"\n\n`;
    
    if (previousRounds && previousRounds.length > 0) {
      context += "Previous rounds:\n";
      previousRounds.forEach((r: any, i: number) => {
        context += `\nRound ${i + 1}:\n`;
        context += `Human: ${r.user_argument}\n`;
        context += `You: ${r.ai_argument}\n`;
      });
    }

    context += `\nRound ${round}:\nHuman: ${userArgument}\n\nYour task: Provide a compelling counter-argument. Be persuasive, intelligent, and concise (max 150 words). Don't be agreeable - challenge their points directly.`;

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 300,
      messages: [
        {
          role: 'user',
          content: context,
        },
      ],
    });

    const aiArgument = message.content[0].type === 'text' ? message.content[0].text : '';

    return NextResponse.json({ aiArgument });
  } catch (error: any) {
    console.error('AI debate error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate AI response' },
      { status: 500 }
    );
  }
}
