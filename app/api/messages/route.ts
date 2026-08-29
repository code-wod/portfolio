import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { connectDB } from '@/lib/db';
import Message from '@/lib/models/Message';
import { contactSchema } from '@/lib/validators';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const validatedData = contactSchema.parse(body);
    
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    
    const message = await Message.create({
      ...validatedData,
      ipAddress,
      userAgent,
    });
    
    return NextResponse.json(
      { message: 'Message received! Thanks for reaching out. I\'ll respond within 24 hours.', id: message._id },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors.map(e => e.message).join(', ') },
        { status: 400 }
      );
    }
    
    console.error('Error creating message:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}