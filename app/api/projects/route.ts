import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Project from '@/lib/models/Project';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const featured = searchParams.get('featured');
    const status = searchParams.get('status');
    
    if (id) {
      const project = await Project.findOne({ slug: id }).lean();
      if (!project) {
        return NextResponse.json({ error: 'Project not found' }, { status: 404 });
      }
      return NextResponse.json({ project });
    }
    
    const query: any = {};
    if (featured === 'true') query.featured = true;
    if (status) query.status = status;
    
    const projects = await Project.find(query).sort({ order: 1 }).lean();
    return NextResponse.json({ projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}