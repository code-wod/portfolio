import mongoose, { Document, Schema } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImageUrl?: string;
  tags: string[];
  category: string;
  author: string;
  published: boolean;
  publishedAt?: Date;
  scheduledFor?: Date;
  views: number;
  readingTimeMinutes: number;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  excerpt: { type: String, required: true },
  coverImageUrl: { type: String },
  tags: [{ type: String }],
  category: { type: String, required: true },
  author: { type: String, required: true },
  published: { type: Boolean, default: false },
  publishedAt: { type: Date },
  scheduledFor: { type: Date },
  views: { type: Number, default: 0 },
  readingTimeMinutes: { type: Number, required: true },
  seo: {
    metaTitle: { type: String },
    metaDescription: { type: String },
    keywords: [{ type: String }],
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

BlogSchema.index({ slug: 1 });
BlogSchema.index({ published: 1, publishedAt: -1 });
BlogSchema.index({ category: 1 });
BlogSchema.index({ tags: 1 });

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);