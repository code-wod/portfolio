import mongoose, { Document, Schema } from 'mongoose';

export interface ISkill extends Document {
  name: string;
  category: string;
  proficiency: number;
  yearsOfExperience: number;
  description: string;
  icon: string;
  color: string;
  order: number;
  createdAt: Date;
}

const SkillSchema = new Schema<ISkill>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  proficiency: { type: Number, min: 1, max: 5, required: true },
  yearsOfExperience: { type: Number, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  color: { type: String, required: true },
  order: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

SkillSchema.index({ category: 1, order: 1 });

export default mongoose.models.Skill || mongoose.model<ISkill>('Skill', SkillSchema);