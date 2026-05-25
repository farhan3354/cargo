import { NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    const zai = await ZAI.create();

    const result = await zai.functions.invoke('page_reader', {
      url: url
    });

    return NextResponse.json({
      success: true,
      data: {
        title: result.data.title,
        url: result.data.url,
        html: result.data.html,
        publishedTime: result.data.publishedTime
      }
    });
  } catch (error) {
    console.error('Website analysis failed:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to analyze website' },
      { status: 500 }
    );
  }
}
