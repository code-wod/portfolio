import mongoose, { Document, Schema } from 'mongoose';

export interface IVisitor extends Document {
  ip: string;
  deviceId: string;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  userAgent: string;
  pages: string[];
  pagesCount: number;
  duration: number;
  referrer?: string;
  country?: string;
  city?: string;
  timestamp: Date;
}

const VisitorSchema = new Schema<IVisitor>({
  ip: { type: String, required: true },
  deviceId: { type: String, required: true },
  deviceType: { type: String, enum: ['mobile', 'tablet', 'desktop'], required: true },
  userAgent: { type: String, required: true },
  pages: [{ type: String }],
  pagesCount: { type: Number, default: 0 },
  duration: { type: Number, default: 0 },
  referrer: { type: String },
  country: { type: String },
  city: { type: String },
  timestamp: { type: Date, default: Date.now },
});

VisitorSchema.index({ timestamp: -1 });
VisitorSchema.index({ deviceId: 1 });
VisitorSchema.index({ ip: 1 });

export default mongoose.models.Visitor || mongoose.model<IVisitor>('Visitor', VisitorSchema);