'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, GitFork, ExternalLink } from 'lucide-react';
import { Card } from '@/components/Common';
import { cn } from '@/lib/utils';

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  status: 'In Development' | 'Released' | 'Archived';
  image?: string;
  links?: {
    github?: string;
    demo?: string;
    playstore?: string;
  };
}

const featuredProjects: Project[] = [
  {
    id: 'taktide',
    title: 'Taktide',
    description: 'Real-time chat and collaboration app with WebRTC voice/video calling and location sharing.',
    technologies: ['Kotlin', 'Firebase', 'WebRTC', 'MVVM'],
    status: 'In Development',
    links: {
      github: 'https://github.com/dixit/taktide',
    },
  },
  {
    id: 'konektor',
    title: 'Konektor',
    description: 'Location-based social media with reels-style video discovery, real-time chat, and WebRTC calling.',
    technologies: ['Kotlin', 'Maps', 'XMPP', 'REST APIs'],
    status: 'Released',
    links: {
      playstore: 'https://play.google.com/store/apps/details?id=com.konektor',
    },
  },
  {
    id: 'hookzapp',
    title: 'HookzApp',
    description: 'Swipe-based social platform with short-form video content and real-time chat.',
    technologies: ['Kotlin', 'Firebase', 'Jetpack Compose'],
    status: 'Released',
    links: {
      playstore: 'https://play.google.com/store/apps/details?id=com.hookzapp',
    },
  },
];

const statusStyles = {
  'In Development': 'bg-warning/10 text-warning border-warning/20',
  'Released': 'bg-success/10 text-success border-success/20',
  'Archived': 'bg-tertiary text-tertiary border-default',
};

export function FeaturedProjects() {
  return (
    <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-2">
              Featured Projects
            </h2>
            <p className="text-secondary">
              Latest 3 projects showcasing real-time communication expertise
            </p>
          </div>
          <Link
            href="/projects"
            className="hidden sm:inline-flex items-center gap-2 text-accent font-medium hover:underline transition-colors"
          >
            View All Projects
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card variant="default" padding="lg" hover className="h-full flex flex-col">
                <div className="aspect-video bg-tertiary rounded-lg mb-4 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent" aria-hidden="true" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-tertiary font-mono text-sm">{project.title}</span>
                  </div>
                </div>

                <div className="flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-xl font-bold text-primary">{project.title}</h3>
                    <span className={cn(
                      'px-2 py-0.5 text-xs font-medium rounded-full whitespace-nowrap',
                      statusStyles[project.status]
                    )}>
                      {project.status}
                    </span>
                  </div>

                  <p className="text-secondary text-sm leading-relaxed mb-4 flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs font-medium rounded bg-tertiary text-secondary border border-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 pt-4 border-t border-default">
                    {project.links?.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg text-tertiary hover:text-accent hover:bg-tertiary transition-colors"
                        aria-label={`${project.title} GitHub`}
                      >
                        <GitFork className="h-4 w-4" />
                      </a>
                    )}
                    {project.links?.demo && (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg text-tertiary hover:text-accent hover:bg-tertiary transition-colors"
                        aria-label={`${project.title} Demo`}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                    {project.links?.playstore && (
                      <a
                        href={project.links.playstore}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg text-tertiary hover:text-accent hover:bg-tertiary transition-colors"
                        aria-label={`${project.title} Play Store`}
                      >
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                        </svg>
                      </a>
                    )}
                    <Link
                      href={`/projects/${project.id}`}
                      className="ml-auto inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline transition-colors"
                    >
                      View Details
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.article>
          ))}
        </div>

        <div className="text-center mt-12 lg:hidden">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-accent font-medium hover:underline transition-colors"
          >
            View All Projects
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}