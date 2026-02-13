import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient();
    const { voteFor } = await request.json();

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Insert or update vote
    const { error } = await supabase.from('votes').upsert({
      debate_id: params.id,
      voter_id: user.id,
      vote_for: voteFor,
    });

    if (error) throw error;

    // Get updated vote counts
    const { data: votes } = await supabase
      .from('votes')
      .select('vote_for')
      .eq('debate_id', params.id);

    const humanVotes = votes?.filter((v) => v.vote_for === 'human').length || 0;
    const aiVotes = votes?.filter((v) => v.vote_for === 'ai').length || 0;
    const total = humanVotes + aiVotes;

    return NextResponse.json({
      votes: {
        human: total > 0 ? Math.round((humanVotes / total) * 100) : 50,
        ai: total > 0 ? Math.round((aiVotes / total) * 100) : 50,
      },
      totalVotes: total,
    });
  } catch (error: any) {
    console.error('Vote error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to submit vote' },
      { status: 500 }
    );
  }
}
