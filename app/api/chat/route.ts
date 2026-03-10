import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { GoogleGenAI } from '@google/genai';

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Fetch configuration from database
    const { data: config } = await supabase
      .from('chatbot_config')
      .select('*')
      .single();

    // Use config from DB or fallback to env variables
    const apiKey = config?.api_key || process.env.GEMINI_API_KEY;
    const modelName = config?.model || 'gemini-3.1-flash-lite-preview';
    const systemPrompt = config?.system_prompt || 'You are PROMATIC AI assistant. Help customers understand our AI automation services, AI chatbot development, and AI-powered website design. Be professional and guide them to book a demo or consultation.';

    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    // Initialize Google Gemini AI
    const ai = new GoogleGenAI({ apiKey });

    // Generate response - simple text format
    const prompt = `${systemPrompt}\n\nUser: ${message}\nAssistant:`;

    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt
    });

    const botMessage = response.text || 'Sorry, I could not process that request.';

    // Check if bot wants to show contact form
    const shouldShowForm = botMessage.toLowerCase().includes('[show_form]') ||
                          botMessage.toLowerCase().includes('contact') ||
                          botMessage.toLowerCase().includes('book') ||
                          botMessage.toLowerCase().includes('demo');

    return NextResponse.json({
      message: botMessage,
      showForm: shouldShowForm
    });
  } catch (error: any) {
    console.error('Gemini API error:', error);

    // Check if quota exceeded
    if (error?.message?.includes('quota') || error?.message?.includes('RESOURCE_EXHAUSTED')) {
      // Fallback response when quota exceeded
      const fallbackMessage = "Thanks for your interest! Our AI assistant is currently at capacity. Please share your contact details and our team will reach out to you within 24 hours. [show_form]";
      return NextResponse.json({
        message: fallbackMessage,
        showForm: true
      });
    }

    const errorMessage = error?.message || 'Failed to get AI response';
    return NextResponse.json({
      error: errorMessage,
      details: error?.toString()
    }, { status: 500 });
  }
}
