import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Skill from '@/lib/models/Skill';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    const query = category && category !== 'All' ? { category } : {};
    const skills = await Skill.find(query).sort({ category: 1, order: 1 }).lean();
    
    return NextResponse.json({ skills });
  } catch (error) {
    console.error('Error fetching skills:', error);
    return NextResponse.json(
      { error: 'Failed to fetch skills' },
      { status: 500 }
    );
  }
}