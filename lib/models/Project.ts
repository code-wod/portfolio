import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  thumbnailUrl?: string;
  imageUrls: string[];
  technologies: string[];
  links: {
    github?: string;
    demo?: string;
    playstore?: string;
  };
  featured: boolean;
  status: 'In Development' | 'Released' | 'Archived';
  metrics: {
    downloads?: number;
    rating?: number;
    uptime?: number;
    latency?: number;
  };
  challenges: string[];
  solutions: string[];
  lessons: string[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  longDescription: { type: String, required: true },
  thumbnailUrl: { type: String },
  imageUrls: [{ type: String }],
  technologies: [{ type: String }],
  links: {
    github: { type: String },
    demo: { type: String },
    playstore: { type: String },
  },
  featured: { type: Boolean, default: false },
  status: { type: String, enum: ['In Development', 'Released', 'Archived'], default: 'In Development' },
  metrics: {
    downloads: { type: Number },
    rating: { type: Number },
    uptime: { type: Number },
    latency: { type: Number },
  },
  challenges: [{ type: String }],
  solutions: [{ type: String }],
  lessons: [{ type: String }],
  order: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

ProjectSchema.index({ order: 1 });
ProjectSchema.index({ featured: 1 });
ProjectSchema.index({ status: 1 });

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);