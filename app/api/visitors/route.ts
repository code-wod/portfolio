import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Visitor from '@/lib/models/Visitor';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { deviceId, deviceType, userAgent, pages, pagesCount, duration, referrer, country, city } = body;
    
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    
    const visitor = await Visitor.create({
      ip: ipAddress,
      deviceId,
      deviceType,
      userAgent,
      pages: pages || [],
      pagesCount: pagesCount || 0,
      duration: duration || 0,
      referrer,
      country,
      city,
    });
    
    return NextResponse.json({ success: true, id: visitor._id }, { status: 200 });
  } catch (error) {
    console.error('Error tracking visitor:', error);
    return NextResponse.json(
      { error: 'Failed to track visitor' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30');
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    const visitors = await Visitor.find({
      timestamp: { $gte: startDate }
    }).sort({ timestamp: -1 }).lean();
    
    return NextResponse.json({ visitors });
  } catch (error) {
    console.error('Error fetching visitors:', error);
    return NextResponse.json(
      { error: 'Failed to fetch visitors' },
      { status: 500 }
    );
  }
}