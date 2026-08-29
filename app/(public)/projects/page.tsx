'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { Card } from '@/components/Common';
import { Modal } from '@/components/Common';
import { Search, Filter, GitFork, ExternalLink, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  status: 'In Development' | 'Released' | 'Archived';
  image?: string;
  links?: {
    github?: string;
    demo?: string;
    playstore?: string;
  };
  features: string[];
  challenges: string[];
  solutions: string[];
  metrics?: {
    downloads?: number;
    rating?: number;
  };
}

const allTechnologies = [
  'Kotlin', 'Firebase', 'WebRTC', 'MVVM', 'Maps', 'XMPP', 'REST APIs',
  'Jetpack Compose', 'Firestore', 'Paytm', 'Room', 'SQLite', 'Coroutines'
];

const projects: Project[] = [
  {
    id: 'taktide',
    title: 'Taktide',
    description: 'Real-time chat and collaboration app with WebRTC voice/video calling and location sharing.',
    longDescription: 'Taktide is a comprehensive real-time communication platform built for teams and communities. It features end-to-end encrypted messaging, high-quality voice and video calls powered by WebRTC, real-time location sharing, and collaborative tools. The app is built with a modern MVVM architecture using Kotlin and Firebase Realtime Database for instant message synchronization.',
    technologies: ['Kotlin', 'Firebase', 'WebRTC', 'MVVM'],
    status: 'In Development',
    links: {
      github: 'https://github.com/dixit/taktide',
    },
    features: [
      'Real-time messaging with delivery/read receipts',
      'WebRTC voice and video calling (1-on-1 and group)',
      'Real-time location sharing on maps',
      'End-to-end encryption for messages',
      'Push notifications with FCM',
      'Offline message queue with auto-sync',
      'Group chats with admin controls',
      'Message reactions and threading',
    ],
    challenges: [
      'Maintaining low latency for real-time communication',
      'Handling network transitions (WiFi to mobile data)',
      'Scaling WebRTC signaling for thousands of users',
      'Battery optimization for background messaging',
    ],
    solutions: [
      'Implemented Firebase Realtime Database with efficient data structure',
      'Used ICE/TURN servers for reliable WebRTC connectivity',
      'Optimized signaling with Firebase Functions',
      'Implemented FCM high-priority messages and Doze mode handling',
    ],
    metrics: {
      downloads: 0,
      rating: 0,
    },
  },
  {
    id: 'konektor',
    title: 'Konektor',
    description: 'Location-based social media with reels-style video discovery, real-time chat, and WebRTC calling.',
    longDescription: 'Konektor connects people based on location and interests. Users discover short-form video content from nearby creators, engage in real-time chat, and make voice/video calls. The app features a TikTok-style feed algorithm, live nearby-user discovery on maps, and seamless real-time communication.',
    technologies: ['Kotlin', 'Maps', 'XMPP', 'REST APIs'],
    status: 'Released',
    links: {
      playstore: 'https://play.google.com/store/apps/details?id=com.konektor',
    },
    features: [
      'Reels-style vertical video feed',
      'Location-based content discovery',
      'Real-time one-to-one chat with XMPP',
      'WebRTC voice/video calling',
      'Live nearby users on interactive maps',
      'Follow/unfollow and content interaction',
      'Profile customization and verification',
      'Content moderation and reporting',
    ],
    challenges: [
      'Real-time location updates at scale',
      'Video streaming optimization for mobile networks',
      'XMPP connection management and reconnection',
      'Map clustering for thousands of users',
    ],
    solutions: [
      'Geohash-based location indexing with Firebase',
      'Adaptive bitrate streaming with ExoPlayer',
      'Smack XMPP library with custom reconnection logic',
      'Google Maps clustering utility with custom rendering',
    ],
    metrics: {
      downloads: 50000,
      rating: 4.3,
    },
  },
  {
    id: 'hookzapp',
    title: 'HookzApp',
    description: 'Swipe-based social platform with short-form video content and real-time chat.',
    longDescription: 'HookzApp brings a Tinder-style swipe mechanism to social content discovery. Users swipe through short-form videos, match with creators, and engage in real-time conversations. Built with Jetpack Compose for a modern, performant UI.',
    technologies: ['Kotlin', 'Firebase', 'Jetpack Compose'],
    status: 'Released',
    links: {
      playstore: 'https://play.google.com/store/apps/details?id=com.hookzapp',
    },
    features: [
      'Tinder-style swipe card interface',
      'Short-form video content (15-60 seconds)',
      'Mutual match real-time chat',
      'Video upload with compression',
      'Interest-based matching algorithm',
      'Profile verification system',
      'In-app notifications',
      'Dark/light theme support',
    ],
    challenges: [
      'Smooth 60fps swipe animations with Compose',
      'Efficient video preloading and caching',
      'Real-time match notifications',
      'Memory management for video-heavy feed',
    ],
    solutions: [
      'Compose Animation APIs with shared element transitions',
      'Coil image loading with video thumbnail generation',
      'Firebase Cloud Messaging for instant notifications',
      'Paging 3 with custom video cache eviction policy',
    ],
    metrics: {
      downloads: 100000,
      rating: 4.5,
    },
  },
  {
    id: 'genome',
    title: 'Genome Homeopathy',
    description: 'Healthcare app for online appointment booking, in-app patient-doctor chat, and medicine ordering.',
    longDescription: 'Genome Homeopathy is a comprehensive healthcare platform connecting patients with homeopathic doctors. Features include appointment scheduling, secure in-app chat for consultations, digital prescription management, medicine ordering with home delivery, and integrated Paytm payments.',
    technologies: ['Kotlin', 'Firebase Firestore', 'Paytm'],
    status: 'Released',
    links: {
      playstore: 'https://play.google.com/store/apps/details?id=com.genome',
    },
    features: [
      'Doctor discovery and profile browsing',
      'Real-time appointment booking system',
      'Secure patient-doctor chat (HIPAA compliant)',
      'Digital prescriptions with medicine details',
      'Medicine ordering with home delivery',
      'Paytm payment integration',
      'Appointment reminders and history',
      'Doctor availability calendar',
    ],
    challenges: [
      'HIPAA-compliant data handling',
      'Real-time appointment conflict resolution',
      'Payment integration with refund handling',
      'Offline prescription access',
    ],
    solutions: [
      'Firebase Security Rules with field-level access control',
      'Firestore transactions for atomic booking operations',
      'Paytm SDK with server-side verification',
      'Room database for offline-first prescription storage',
    ],
    metrics: {
      downloads: 25000,
      rating: 4.7,
    },
  },
  {
    id: 'colossal',
    title: 'Colossal Store',
    description: 'E-commerce platform with product browsing, vendor platform for local businesses, and real-time buyer-seller chat.',
    longDescription: 'Colossal Store empowers local businesses with a digital storefront. Vendors can manage products, orders, and communicate directly with buyers. Features include category browsing, cart management, secure checkout, real-time chat between buyers and sellers, order tracking, and vendor analytics dashboard.',
    technologies: ['Kotlin', 'Firebase', 'REST APIs'],
    status: 'Released',
    links: {
      playstore: 'https://play.google.com/store/apps/details?id=com.colossal',
    },
    features: [
      'Multi-vendor marketplace platform',
      'Product catalog with categories and search',
      'Shopping cart and wishlist',
      'Real-time buyer-seller chat',
      'Order tracking with status updates',
      'Vendor dashboard with analytics',
      'Secure authentication and authorization',
      'Push notifications for orders and messages',
    ],
    challenges: [
      'Multi-tenant data isolation',
      'Real-time order status synchronization',
      'Chat scalability for high message volumes',
      'Vendor onboarding and verification flow',
    ],
    solutions: [
      'Firestore subcollections per vendor with security rules',
      'Firestore listeners for real-time order updates',
      'Firebase Realtime Database for chat with pagination',
      'Custom admin panel for vendor approval workflow',
    ],
    metrics: {
      downloads: 75000,
      rating: 4.4,
    },
  },
];

const statusStyles = {
  'In Development': 'bg-warning/10 text-warning border-warning/20',
  'Released': 'bg-success/10 text-success border-success/20',
  'Archived': 'bg-tertiary text-tertiary border-default',
};

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showTechFilter, setShowTechFilter] = useState(false);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.technologies.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesTech = selectedTech === 'All' || project.technologies.includes(selectedTech);
      return matchesSearch && matchesTech;
    });
  }, [searchQuery, selectedTech]);

  const activeTechs = useMemo(() => {
    const techs = new Set<string>();
    projects.forEach(p => p.technologies.forEach(t => techs.add(t)));
    return ['All', ...Array.from(techs).sort()];
  }, []);

  return (
    <>
      <Header />
      <main className="flex-1 pt-16 lg:pt-0">
        <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <header className="mb-12">
              <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-4">My Projects</h1>
              <p className="text-secondary text-lg max-w-2xl">
                5+ production apps built with modern Android tech
              </p>
            </header>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-tertiary" aria-hidden="true" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name or tech..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-default bg-primary text-primary placeholder:text-tertiary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  aria-label="Search projects"
                />
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowTechFilter(!showTechFilter)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-default bg-primary text-primary hover:border-accent/50 transition-colors"
                  aria-haspopup="listbox"
                  aria-expanded={showTechFilter}
                >
                  <Filter className="h-5 w-5" aria-hidden="true" />
                  <span>{selectedTech}</span>
                  <ChevronDown className={cn('h-4 w-4 transition-transform', showTechFilter && 'rotate-180')} />
                </button>
                {showTechFilter && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-secondary border border-default rounded-lg shadow-xl py-2 z-20">
                    {activeTechs.map((tech) => (
                      <button
                        key={tech}
                        onClick={() => {
                          setSelectedTech(tech);
                          setShowTechFilter(false);
                        }}
                        className={cn(
                          'w-full px-4 py-2 text-left text-sm transition-colors',
                          selectedTech === tech
                            ? 'bg-accent/10 text-accent'
                            : 'text-secondary hover:text-primary hover:bg-tertiary'
                        )}
                        role="option"
                        aria-selected={selectedTech === tech}
                      >
                        {tech}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {selectedTech !== 'All' || searchQuery && (
              <div className="flex items-center gap-2 mb-6 flex-wrap">
                {searchQuery && (
                  <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm flex items-center gap-1">
                    Search: "{searchQuery}"
                    <button onClick={() => setSearchQuery('')} className="hover:text-primary" aria-label="Clear search">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {selectedTech !== 'All' && (
                  <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm flex items-center gap-1">
                    Tech: {selectedTech}
                    <button onClick={() => setSelectedTech('All')} className="hover:text-primary" aria-label="Clear filter">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Card variant="default" padding="lg" hover className="h-full flex flex-col" onClick={() => setSelectedProject(project)}>
                    <div className="aspect-video bg-tertiary rounded-lg mb-4 overflow-hidden relative cursor-pointer">
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent" aria-hidden="true" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-tertiary font-mono text-sm">{project.title}</span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className={cn(
                          'px-2 py-0.5 text-xs font-medium rounded-full whitespace-nowrap',
                          statusStyles[project.status]
                        )}>
                          {project.status}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-primary mb-2">{project.title}</h3>
                      <p className="text-secondary text-sm leading-relaxed mb-4 flex-1">{project.description}</p>

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
                            onClick={(e) => e.stopPropagation()}
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
                            onClick={(e) => e.stopPropagation()}
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
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 rounded-lg text-tertiary hover:text-accent hover:bg-tertiary transition-colors"
                            aria-label={`${project.title} Play Store`}
                          >
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.article>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <p className="text-secondary">No projects found matching your criteria.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Modal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title}
        size="xl"
        closeOnOverlayClick={true}
      >
        {selectedProject && (
          <div className="space-y-6 max-h-[70vh] overflow-y-auto">
            <div className="aspect-video bg-tertiary rounded-lg overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent" aria-hidden="true" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-tertiary font-mono text-lg">{selectedProject.title}</span>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">About This Project</h3>
                  <p className="text-secondary leading-relaxed">{selectedProject.longDescription}</p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Key Features</h3>
                  <ul className="space-y-2">
                    {selectedProject.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-secondary">
                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent mt-1.5" aria-hidden="true" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-primary mb-3">Challenges & Solutions</h3>
                  <div className="space-y-4">
                    {selectedProject.challenges.map((challenge, index) => (
                      <div key={index} className="bg-tertiary/50 rounded-lg p-4">
                        <h4 className="font-medium text-primary mb-1 flex items-center gap-2">
                          <span className="text-accent">Challenge:</span>
                          {challenge}
                        </h4>
                        <p className="text-secondary text-sm ml-6">{selectedProject.solutions[index]}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedProject.metrics && (selectedProject.metrics.downloads || selectedProject.metrics.rating) && (
                  <div>
                    <h3 className="text-lg font-bold text-primary mb-3">Metrics</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedProject.metrics.downloads && (
                        <div className="bg-tertiary/50 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-accent">{selectedProject.metrics.downloads.toLocaleString()}+</div>
                          <div className="text-secondary text-sm">Downloads</div>
                        </div>
                      )}
                      {selectedProject.metrics.rating && (
                        <div className="bg-tertiary/50 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-accent">{selectedProject.metrics.rating}/5.0</div>
                          <div className="text-secondary text-sm">Rating</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="bg-tertiary/50 rounded-lg p-4">
                  <h4 className="font-medium text-primary mb-3">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1 text-sm rounded-full bg-accent/10 text-accent border border-accent/20">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-tertiary/50 rounded-lg p-4">
                  <h4 className="font-medium text-primary mb-3">Links</h4>
                  <div className="space-y-2">
                    {selectedProject.links?.github && (
                      <a href={selectedProject.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-secondary hover:text-accent transition-colors">
                        <GitFork className="h-4 w-4" /> GitHub
                      </a>
                    )}
                    {selectedProject.links?.demo && (
                      <a href={selectedProject.links.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-secondary hover:text-accent transition-colors">
                        <ExternalLink className="h-4 w-4" /> Live Demo
                      </a>
                    )}
                    {selectedProject.links?.playstore && (
                      <a href={selectedProject.links.playstore} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-secondary hover:text-accent transition-colors">
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                        </svg> Play Store
                      </a>
                    )}
                  </div>
                </div>

                <div className="bg-tertiary/50 rounded-lg p-4">
                  <h4 className="font-medium text-primary mb-3">Status</h4>
                  <span className={cn(
                    'px-3 py-1 text-sm font-medium rounded-full',
                    statusStyles[selectedProject.status]
                  )}>
                    {selectedProject.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <Footer />
    </>
  );
}