import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { connectDB } from '@/lib/db';
import Message from '@/lib/models/Message';

async function checkAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== 'admin') return null;
  return session;
}

export async function GET(request: NextRequest) {
  const session = await checkAdmin();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const read = searchParams.get('read');
    const archived = searchParams.get('archived');
    const search = searchParams.get('search');

    const query: any = {};
    if (read === 'true') query.read = true;
    else if (read === 'false') query.read = false;
    if (archived === 'true') query.archived = true;
    else if (archived === 'false') query.archived = false;
    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') },
        { subject: new RegExp(search, 'i') },
      ];
    }

    const skip = (page - 1) * limit;
    const [messages, total, unreadCount] = await Promise.all([
      Message.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Message.countDocuments(query),
      Message.countDocuments({ read: false, archived: false }),
    ]);

    return NextResponse.json({
      messages,
      unreadCount,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}