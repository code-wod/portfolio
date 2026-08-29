import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { connectDB } from '@/lib/db';
import Visitor from '@/lib/models/Visitor';
import Blog from '@/lib/models/Blog';
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
    const days = parseInt(searchParams.get('days') || '30');

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const [visitors, totalVisitors, uniqueVisitors, newVisitors, deviceBreakdown, topReferrers, topPosts, recentMessages] = await Promise.all([
      Visitor.find({ timestamp: { $gte: startDate } }).sort({ timestamp: -1 }).lean(),
      Visitor.countDocuments({ timestamp: { $gte: startDate } }),
      Visitor.distinct('deviceId', { timestamp: { $gte: startDate } }).then(arr => arr.length),
      Visitor.countDocuments({ timestamp: { $gte: startDate } })
        .then(async () => {
          const seenDevices = new Set();
          const visitors = await Visitor.find({ timestamp: { $gte: startDate } }).sort({ timestamp: 1 }).lean();
          let newCount = 0;
          for (const v of visitors) {
            if (!seenDevices.has(v.deviceId)) {
              seenDevices.add(v.deviceId);
              newCount++;
            }
          }
          return newCount;
        }),
      Visitor.aggregate([
        { $match: { timestamp: { $gte: startDate } } },
        { $group: { _id: '$deviceType', count: { $sum: 1 } } },
      ]),
      Visitor.aggregate([
        { $match: { timestamp: { $gte: startDate }, referrer: { $ne: null, $ne: '' } } },
        { $group: { _id: '$referrer', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ]),
      Blog.find({ published: true }).sort({ views: -1 }).limit(5).select('title views slug').lean(),
      Message.find({ archived: false }).sort({ createdAt: -1 }).limit(5).select('name email subject createdAt read').lean(),
    ]);

    const trafficData = [];
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);
      const count = visitors.filter(v => v.timestamp >= date && v.timestamp < nextDate).length;
      trafficData.push({ date: date.toISOString().split('T')[0], count });
    }

    return NextResponse.json({
      overview: {
        totalVisitors,
        uniqueVisitors,
        newVisitors,
      },
      traffic: trafficData,
      deviceBreakdown: deviceBreakdown.reduce((acc: any, item: any) => {
        acc[item._id] = item.count;
        return acc;
      }, {}),
      topReferrers: topReferrers.map((item: any) => ({
        referrer: item._id,
        count: item.count,
      })),
      topPosts,
      recentMessages,
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}