import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Timeline from '@/lib/models/Timeline';

export async function GET() {
  try {
    await connectDB();
    const timeline = await Timeline.find().sort({ position: 1 }).lean();
    return NextResponse.json({ timeline });
  } catch (error) {
    console.error('Error fetching timeline:', error);
    return NextResponse.json(
      { error: 'Failed to fetch timeline' },
      { status: 500 }
    );
  }
}