import { NextRequest, NextResponse } from 'next/server';
import { insforge } from '@/lib/insforge';

export async function GET() {
  try {
    const { data, error } = await insforge.database
      .from('chatbot_config')
      .select('*')
      .single();

    if (error) {
      console.warn('Config fetch warning:', error);
      // Return default config with environment variables if there's an error
      return NextResponse.json({
        api_key: process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY || '',
        model: process.env.NEXT_PUBLIC_GEMINI_MODEL || 'gemini-3.1-flash-lite-preview',
        system_prompt: process.env.NEXT_PUBLIC_GEMINI_PROMPT || 'You are PROMATIC AI assistant. Help customers understand our AI automation services, AI chatbot development, and AI-powered website design. Be professional and guide them to book a demo or consultation.',
        enabled: true
      });
    }

    // Return config from database if it exists
    return NextResponse.json(data);
  } catch (error) {
    console.error('Config API error:', error);
    return NextResponse.json({
      error: 'Internal server error',
      api_key: process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY || '',
      model: process.env.NEXT_PUBLIC_GEMINI_MODEL || 'gemini-3.1-flash-lite-preview',
      system_prompt: process.env.NEXT_PUBLIC_GEMINI_PROMPT || 'You are PROMATIC AI assistant. Help customers understand our AI automation services, AI chatbot development, and AI-powered website design. Be professional and guide them to book a demo or consultation.',
      enabled: true
    }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { api_key, model, system_prompt, enabled } = body;

    const { data, error } = await insforge.database
      .from('chatbot_config')
      .upsert([{
        id: 1,
        api_key,
        model,
        system_prompt,
        enabled: enabled !== undefined ? enabled : true,
        updated_at: new Date().toISOString()
      }])
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
