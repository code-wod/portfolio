import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email format'),
  subject: z.string().min(1, 'Subject is required').max(200),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
  phone: z.string().optional(),
  company: z.string().optional(),
});

export const profileSchema = z.object({
  bio: z.string().min(10, 'Bio must be at least 10 characters').max(5000),
  email: z.string().email('Invalid email format'),
  phone: z.string().optional(),
  location: z.string().optional(),
  socialLinks: z.array(z.object({
    platform: z.string(),
    url: z.string().url('Invalid URL'),
  })).optional(),
  availability: z.array(z.string()).optional(),
});

export const timelineSchema = z.object({
  type: z.enum(['education', 'experience']),
  title: z.string().min(1, 'Title is required').max(100),
  company: z.string().min(1, 'Company/Institution is required').max(100),
  description: z.string().min(10, 'Description must be at least 10 characters').max(2000),
  startDate: z.string().datetime('Invalid start date'),
  endDate: z.string().datetime('Invalid end date').optional().nullable(),
  position: z.number().int().min(1),
  skills: z.array(z.string()).optional(),
});

export const skillSchema = z.object({
  name: z.string().min(1, 'Skill name is required').max(50),
  category: z.string().min(1, 'Category is required'),
  proficiency: z.number().int().min(1).max(5),
  yearsOfExperience: z.number().int().min(0),
  description: z.string().min(10, 'Description must be at least 10 characters').max(1000),
  icon: z.string().min(1, 'Icon is required'),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid color format'),
  order: z.number().int().min(1),
});

export const projectSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(500),
  longDescription: z.string().min(50, 'Long description must be at least 50 characters').max(10000),
  thumbnailUrl: z.string().url('Invalid URL').optional().nullable(),
  imageUrls: z.array(z.string().url('Invalid URL')).optional(),
  technologies: z.array(z.string()).min(1, 'At least one technology is required'),
  links: z.object({
    github: z.string().url('Invalid GitHub URL').optional().nullable(),
    demo: z.string().url('Invalid demo URL').optional().nullable(),
    playstore: z.string().url('Invalid Play Store URL').optional().nullable(),
  }).optional(),
  featured: z.boolean().default(false),
  status: z.enum(['In Development', 'Released', 'Archived']).default('In Development'),
  metrics: z.object({
    downloads: z.number().int().min(0).optional(),
    rating: z.number().min(0).max(5).optional(),
    uptime: z.number().min(0).max(1).optional(),
    latency: z.number().int().min(0).optional(),
  }).optional(),
  challenges: z.array(z.string()).optional(),
  solutions: z.array(z.string()).optional(),
  lessons: z.array(z.string()).optional(),
  order: z.number().int().min(1),
});

export const blogSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  content: z.string().min(100, 'Content must be at least 100 characters').max(50000),
  excerpt: z.string().min(50, 'Excerpt must be at least 50 characters').max(500),
  coverImageUrl: z.string().url('Invalid URL').optional().nullable(),
  tags: z.array(z.string()).optional(),
  category: z.string().min(1, 'Category is required'),
  author: z.string().min(1, 'Author is required'),
  published: z.boolean().default(false),
  scheduledFor: z.string().datetime('Invalid date').optional().nullable(),
  readingTimeMinutes: z.number().int().min(1),
  seo: z.object({
    metaTitle: z.string().max(60).optional(),
    metaDescription: z.string().max(160).optional(),
    keywords: z.array(z.string()).optional(),
  }).optional(),
});

export const visitorSchema = z.object({
  ip: z.string(),
  deviceId: z.string(),
  deviceType: z.enum(['mobile', 'tablet', 'desktop']),
  userAgent: z.string(),
  pages: z.array(z.string()).optional(),
  pagesCount: z.number().int().min(0).default(0),
  duration: z.number().int().min(0).default(0),
  referrer: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
});