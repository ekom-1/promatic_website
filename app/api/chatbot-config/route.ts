import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('chatbot_config')
      .select('*')
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching config:', error);
      return NextResponse.json({ error: 'Failed to fetch configuration' }, { status: 500 });
    }

    // Return default config if none exists
    const config = data || {
      api_key: process.env.OPENROUTER_API_KEY || '',
      model: 'google/gemini-flash-1.5',
      system_prompt: 'You are PROMATIC AI assistant. Help customers understand our AI automation services, AI chatbot development, and AI-powered website design. Be professional and guide them to book a demo or consultation.'
    };

    return NextResponse.json(config);
  } catch (error) {
    console.error('Config API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { api_key, model, system_prompt, enabled } = body;

    const { data, error } = await supabase
      .from('chatbot_config')
      .upsert({
        id: 1,
        api_key,
        model,
        system_prompt,
        enabled: enabled !== undefined ? enabled : true,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving config:', error);
      return NextResponse.json({ error: 'Failed to save configuration' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Config API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
