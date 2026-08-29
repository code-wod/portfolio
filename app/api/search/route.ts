import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Project from '@/lib/models/Project';
import Blog from '@/lib/models/Blog';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');
    
    if (!q || q.trim().length < 2) {
      return NextResponse.json({ projects: [], posts: [] });
    }
    
    const searchRegex = new RegExp(q, 'i');
    
    const [projects, posts] = await Promise.all([
      Project.find({
        $or: [
          { title: searchRegex },
          { description: searchRegex },
          { technologies: { $in: [searchRegex] } },
        ],
      }).limit(5).lean(),
      Blog.find({
        published: true,
        $or: [
          { title: searchRegex },
          { excerpt: searchRegex },
          { tags: { $in: [searchRegex] } },
        ],
      }).limit(5).lean(),
    ]);
    
    return NextResponse.json({ projects, posts });
  } catch (error) {
    console.error('Error searching:', error);
    return NextResponse.json(
      { error: 'Failed to search' },
      { status: 500 }
    );
  }
}