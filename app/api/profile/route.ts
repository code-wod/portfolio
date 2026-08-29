import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Profile from '@/lib/models/Profile';

export async function GET() {
  try {
    await connectDB();
    const profile = await Profile.findOne().lean();
    
    if (!profile) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ profile });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}