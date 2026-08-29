import mongoose, { Document, Schema } from 'mongoose';

export interface IProfile extends Document {
  bio: string;
  photoUrl?: string;
  email: string;
  phone?: string;
  location?: string;
  socialLinks: Array<{
    platform: string;
    url: string;
  }>;
  resumeUrl?: string;
  availability: string[];
  updatedAt: Date;
}

const ProfileSchema = new Schema<IProfile>({
  bio: { type: String, required: true },
  photoUrl: { type: String },
  email: { type: String, required: true },
  phone: { type: String },
  location: { type: String },
  socialLinks: [{
    platform: { type: String, required: true },
    url: { type: String, required: true },
  }],
  resumeUrl: { type: String },
  availability: [{ type: String }],
  updatedAt: { type: Date, default: Date.now },
});

ProfileSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Profile || mongoose.model<IProfile>('Profile', ProfileSchema);