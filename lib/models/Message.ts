import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  company?: string;
  read: boolean;
  archived: boolean;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}

const MessageSchema = new Schema<IMessage>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  phone: { type: String },
  company: { type: String },
  read: { type: Boolean, default: false },
  archived: { type: Boolean, default: false },
  ipAddress: { type: String },
  userAgent: { type: String },
  createdAt: { type: Date, default: Date.now },
});

MessageSchema.index({ createdAt: -1 });
MessageSchema.index({ read: 1 });
MessageSchema.index({ archived: 1 });

export default mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema);