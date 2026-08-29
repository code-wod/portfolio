import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Blog from '@/lib/models/Blog';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const published = searchParams.get('published');
    
    if (slug) {
      const post = await Blog.findOne({ slug }).lean();
      if (!post) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }
      await Blog.findByIdAndUpdate(post._id, { $inc: { views: 1 } });
      return NextResponse.json({ post });
    }
    
    const query: any = {};
    if (published !== 'false') query.published = true;
    if (category && category !== 'All') query.category = category;
    if (tag) query.tags = tag;
    
    const skip = (page - 1) * limit;
    const [posts, total] = await Promise.all([
      Blog.find(query)
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Blog.countDocuments(query),
    ]);
    
    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}