import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { topic, category } = await request.json();

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Create debate
    const { data: debate, error } = await supabase
      .from('debates')
      .insert({
        user_id: user.id,
        topic,
        category,
        status: 'active',
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ debate });
  } catch (error: any) {
    console.error('Create debate error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create debate' },
      { status: 500 }
    );
  }
}
