import mongoose, { Document, Schema } from 'mongoose';

export interface ITimeline extends Document {
  type: 'education' | 'experience';
  title: string;
  company: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  position: number;
  skills: string[];
  createdAt: Date;
}

const TimelineSchema = new Schema<ITimeline>({
  type: { type: String, enum: ['education', 'experience'], required: true },
  title: { type: String, required: true },
  company: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  position: { type: Number, required: true },
  skills: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

TimelineSchema.index({ position: 1 });

export default mongoose.models.Timeline || mongoose.model<ITimeline>('Timeline', TimelineSchema);