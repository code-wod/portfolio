'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { Card } from '@/components/Common';
import { Search, Filter, ChevronDown, Clock, Eye, Tag, ArrowRight, Mail, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readingTimeMinutes: number;
  views: number;
  author: {
    name: string;
    avatar?: string;
  };
}

const allCategories = ['All', 'Android', 'Architecture', 'WebRTC', 'Firebase', 'Kotlin', 'Performance'];

const blogPosts: BlogPost[] = [
  {
    slug: 'mvvm-architecture-deep-dive',
    title: 'MVVM Architecture Deep Dive',
    excerpt: 'Understanding the Model-View-ViewModel pattern in Android development. When to use it, implementation examples, best practices, and common mistakes to avoid.',
    content: `# MVVM Architecture Deep Dive

## Introduction

The Model-View-ViewModel (MVVM) pattern has become the de facto standard for Android app architecture. It provides a clean separation of concerns, making code more testable, maintainable, and scalable.

## What is MVVM?

MVVM separates your application into three main components:

- **Model**: Data layer - repositories, data sources, business logic
- **View**: UI layer - Activities, Fragments, Compose functions
- **ViewModel**: Presentation logic - holds UI state, handles business logic

## Components Breakdown

### Model
The Model represents your data layer. It includes:
- Repository classes
- Data sources (API, Database, Preferences)
- Business logic and use cases

### View
The View observes state from the ViewModel and renders UI. It should be as dumb as possible.

### ViewModel
The ViewModel survives configuration changes and holds UI state. It exposes state via StateFlow/LiveData.

## Implementation Example

\`\`\`kotlin
@HiltViewModel
class UserViewModel @Inject constructor(
    private val userRepository: UserRepository
) : ViewModel() {

    private val _uiState = MutableStateFlow<UserUiState.Loading>
    val uiState: StateFlow<UserUiState> = _uiState

    fun loadUser(userId: String) {
        viewModelScope.launch {
            _uiState.value = UserUiState.Loading
            try {
                val user = userRepository.getUser(userId)
                _uiState.value = UserUiState.Success(user)
            } catch (e: Exception) {
                _uiState.value = UserUiState.Error(e.message)
            }
        }
    }
}
\`\`\`

## Best Practices

1. **Keep ViewModels lifecycle-aware** - Don't reference Views or Context
2. **Use StateFlow/LiveData** - For observable state
3. **Single responsibility** - One ViewModel per screen/feature
4. **Expose immutable state** - Use sealed classes for UI states
5. **Handle errors gracefully** - Include error states in UI model

## Common Mistakes

- Putting Android framework code in ViewModels
- Exposing mutable state
- Doing heavy computation on main thread
- Not handling configuration changes properly

## Conclusion

MVVM provides a robust foundation for Android apps. When combined with modern tooling like Hilt, Coroutines, and Flow, it enables building scalable, maintainable applications.`,
    coverImage: '',
    category: 'Architecture',
    tags: ['android', 'architecture', 'mvvm', 'kotlin'],
    publishedAt: '2024-01-15',
    readingTimeMinutes: 12,
    views: 234,
    author: { name: 'Dixit Saini' },
  },
  {
    slug: 'webrtc-implementation-guide',
    title: 'WebRTC Implementation Guide',
    excerpt: 'Complete guide to implementing WebRTC in Android apps. Covers signaling, ICE candidates, media streams, and production considerations.',
    content: `# WebRTC Implementation Guide

## WebRTC Basics

WebRTC (Web Real-Time Communication) enables peer-to-peer audio, video, and data sharing between browsers and mobile apps.

## Signaling Server Setup

WebRTC requires a signaling server to exchange session descriptions (SDP) and ICE candidates between peers.

## Audio/Video Stream Handling

\`\`\`kotlin
val peerConnectionFactory = PeerConnectionFactory.builder()
    .setOptions(PeerConnectionFactory.Options().apply {
        networkIgnoreMask = 0
    })
    .createPeerConnectionFactory()
\`\`\`

## Production Considerations

- TURN/STUN server configuration
- Bandwidth adaptation
- Network change handling
- Battery optimization`,
    coverImage: '',
    category: 'WebRTC',
    tags: ['android', 'webrtc', 'real-time', 'kotlin'],
    publishedAt: '2024-02-20',
    readingTimeMinutes: 15,
    views: 189,
    author: { name: 'Dixit Saini' },
  },
  {
    slug: 'firebase-realtime-database-best-practices',
    title: 'Firebase Real-time Database Best Practices',
    excerpt: 'Learn data structure design, security rules, performance optimization, and cost management for Firebase Realtime Database.',
    content: `# Firebase Real-time Database Best Practices

## Data Structure Design

Keep your data flat and denormalized for efficient querying.

## Security Rules

\`\`\`javascript
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    }
  }
}
\`\`\`

## Performance Optimization

- Use indexing for queries
- Limit data with limitToFirst/Last
- Implement pagination
- Use transactions for atomic operations

## Cost Management

Monitor bandwidth usage and optimize listener attachments.`,
    coverImage: '',
    category: 'Firebase',
    tags: ['firebase', 'database', 'realtime', 'android'],
    publishedAt: '2024-03-10',
    readingTimeMinutes: 10,
    views: 156,
    author: { name: 'Dixit Saini' },
  },
  {
    slug: 'android-performance-optimization',
    title: 'Android Performance Optimization',
    excerpt: 'Techniques for memory leak detection, battery optimization, app startup time improvement, and smooth animations.',
    content: `# Android Performance Optimization

## Memory Leaks Detection

Use LeakCanary and Android Studio Profiler to identify memory leaks.

## Battery Optimization

- Use WorkManager for background tasks
- Batch network requests
- Optimize wake locks

## App Startup Time

- Enable baseline profiles
- Defer non-critical initialization
- Use App Startup library

## Smooth Animations

- Target 60fps (16ms per frame)
- Use Jetpack Compose for performant animations
- Profile with Perfetto`,
    coverImage: '',
    category: 'Performance',
    tags: ['android', 'performance', 'optimization', 'kotlin'],
    publishedAt: '2024-04-05',
    readingTimeMinutes: 14,
    views: 134,
    author: { name: 'Dixit Saini' },
  },
  {
    slug: 'building-realtime-chat-applications',
    title: 'Building Real-time Chat Applications',
    excerpt: 'Architecture design for scalable chat apps. Message synchronization, user presence, offline support, and more.',
    content: `# Building Real-time Chat Applications

## Architecture Design

Separate concerns: messaging, presence, media, notifications.

## Message Synchronization

Use Firebase Realtime Database or Firestore with proper data modeling.

## User Presence

Track online/offline status with heartbeat mechanisms.

## Offline Support

Implement local caching with Room and sync on reconnect.`,
    coverImage: '',
    category: 'Architecture',
    tags: ['android', 'chat', 'realtime', 'firebase', 'architecture'],
    publishedAt: '2024-05-12',
    readingTimeMinutes: 18,
    views: 112,
    author: { name: 'Dixit Saini' },
  },
  {
    slug: 'kotlin-coroutines-mastery',
    title: 'Kotlin Coroutines Mastery',
    excerpt: 'Deep dive into Kotlin Coroutines. Structured concurrency, flows, channels, and advanced patterns for Android development.',
    content: `# Kotlin Coroutines Mastery

## Structured Concurrency

Coroutines follow structured concurrency - child coroutines are tied to parent scope.

## Flows

Cold asynchronous streams for reactive programming.

## Channels

Hot streams for communication between coroutines.

## Advanced Patterns

- SupervisorJob for error isolation
- select expression for multiple channels
- Actor pattern for state management`,
    coverImage: '',
    category: 'Kotlin',
    tags: ['kotlin', 'coroutines', 'concurrency', 'android'],
    publishedAt: '2024-06-18',
    readingTimeMinutes: 20,
    views: 98,
    author: { name: 'Dixit Saini' },
  },
];

const popularPosts = [
  { slug: 'mvvm-architecture-deep-dive', title: 'MVVM Architecture Deep Dive', views: 234 },
  { slug: 'webrtc-implementation-guide', title: 'WebRTC Implementation Guide', views: 189 },
  { slug: 'firebase-realtime-database-best-practices', title: 'Firebase Real-time Database Best Practices', views: 156 },
];

const allTags = [
  { name: 'android', count: 20 },
  { name: 'architecture', count: 15 },
  { name: 'webrtc', count: 8 },
  { name: 'firebase', count: 12 },
  { name: 'kotlin', count: 18 },
  { name: 'performance', count: 6 },
];

const postsPerPage = 6;

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * postsPerPage;
    return filteredPosts.slice(start, start + postsPerPage);
  }, [filteredPosts, currentPage]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      <Header />
      <main className="flex-1 pt-16 lg:pt-0">
        <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <header className="mb-12">
              <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-4">Technical Blog</h1>
              <p className="text-secondary text-lg max-w-2xl">
                Articles on Android, Architecture, and Web Technologies
              </p>
            </header>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-tertiary" aria-hidden="true" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  placeholder="Search posts..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-default bg-primary text-primary placeholder:text-tertiary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  aria-label="Search blog posts"
                />
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowCategoryFilter(!showCategoryFilter)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-default bg-primary text-primary hover:border-accent/50 transition-colors"
                  aria-haspopup="listbox"
                  aria-expanded={showCategoryFilter}
                >
                  <Filter className="h-5 w-5" aria-hidden="true" />
                  <span>{selectedCategory}</span>
                  <ChevronDown className={cn('h-4 w-4 transition-transform', showCategoryFilter && 'rotate-180')} />
                </button>
                {showCategoryFilter && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-secondary border border-default rounded-lg shadow-xl py-2 z-20">
                    {allCategories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => { setSelectedCategory(cat); setShowCategoryFilter(false); setCurrentPage(1); }}
                        className={cn(
                          'w-full px-4 py-2 text-left text-sm transition-colors',
                          selectedCategory === cat
                            ? 'bg-accent/10 text-accent'
                            : 'text-secondary hover:text-primary hover:bg-tertiary'
                        )}
                        role="option"
                        aria-selected={selectedCategory === cat}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {selectedCategory !== 'All' || searchQuery && (
              <div className="flex items-center gap-2 mb-6 flex-wrap">
                {searchQuery && (
                  <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm flex items-center gap-1">
                    Search: "{searchQuery}"
                    <button onClick={() => { setSearchQuery(''); setCurrentPage(1); }} className="hover:text-primary" aria-label="Clear search">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {selectedCategory !== 'All' && (
                  <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm flex items-center gap-1">
                    Category: {selectedCategory}
                    <button onClick={() => { setSelectedCategory('All'); setCurrentPage(1); }} className="hover:text-primary" aria-label="Clear filter">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
              </div>
            )}

            <div className="grid lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3">
                {paginatedPosts.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-secondary">No posts found matching your criteria.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {paginatedPosts.map((post, index) => (
                      <motion.article
                        key={post.slug}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                      >
                        <Card variant="default" padding="lg" hover className="flex flex-col sm:flex-row gap-6">
                          <div className="relative w-full sm:w-64 h-40 sm:h-auto min-h-[160px] flex-shrink-0 rounded-lg overflow-hidden bg-tertiary">
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent" aria-hidden="true" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-tertiary font-mono text-sm">{post.category}</span>
                            </div>
                            <div className="absolute top-3 left-3">
                              <span className="px-2 py-1 text-xs font-medium rounded-full bg-accent/20 text-accent">
                                {post.category}
                              </span>
                            </div>
                          </div>
                          <div className="flex-1 flex flex-col">
                            <div className="flex items-center gap-4 text-sm text-tertiary mb-2">
                              <span>{formatDate(post.publishedAt)}</span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                                {post.readingTimeMinutes} min read
                              </span>
                              <span className="flex items-center gap-1">
                                <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                                {post.views}
                              </span>
                            </div>
                            <h2 className="text-xl font-bold text-primary mb-2 line-clamp-2">
                              <Link href={`/blog/${post.slug}`} className="hover:text-accent transition-colors">
                                {post.title}
                              </Link>
                            </h2>
                            <p className="text-secondary text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                              {post.excerpt}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {post.tags.slice(0, 4).map((tag) => (
                                <span key={tag} className="px-2 py-0.5 text-xs rounded bg-tertiary text-tertiary border border-default">
                                  #{tag}
                                </span>
                              ))}
                              {post.tags.length > 4 && (
                                <span className="px-2 py-0.5 text-xs rounded bg-tertiary text-tertiary border border-default">
                                  +{post.tags.length - 4} more
                                </span>
                              )}
                            </div>
                            <Link
                              href={`/blog/${post.slug}`}
                              className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline transition-colors self-start"
                            >
                              Read Article
                              <ArrowRight className="h-4 w-4" aria-hidden="true" />
                            </Link>
                          </div>
                        </Card>
                      </motion.article>
                    ))}
                  </div>
                )}

                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-8">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg border border-default bg-primary text-secondary hover:text-primary hover:border-accent/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={cn(
                            'w-10 h-10 rounded-lg font-medium transition-colors',
                            currentPage === pageNum
                              ? 'bg-accent text-white'
                              : 'text-secondary hover:text-primary hover:bg-tertiary'
                          )}
                          aria-label={`Page ${pageNum}`}
                          aria-current={currentPage === pageNum ? 'page' : undefined}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-lg border border-default bg-primary text-secondary hover:text-primary hover:border-accent/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      aria-label="Next page"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>

              <aside className="lg:col-span-1 space-y-8">
                <Card variant="default" padding="lg">
                  <h3 className="text-lg font-bold text-primary mb-4">Popular Posts</h3>
                  <ul className="space-y-4">
                    {popularPosts.map((post, index) => (
                      <li key={post.slug} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-bold flex items-center justify-center">
                          {index + 1}
                        </span>
                        <Link href={`/blog/${post.slug}`} className="flex-1 min-w-0 text-sm font-medium text-primary hover:text-accent transition-colors line-clamp-2">
                          {post.title}
                        </Link>
                        <span className="flex-shrink-0 text-tertiary text-xs flex items-center gap-1">
                          <Eye className="h-3 w-3" aria-hidden="true" />
                          {post.views}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card variant="default" padding="lg">
                  <h3 className="text-lg font-bold text-primary mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map((tag) => (
                      <Link
                        key={tag.name}
                        href={`/blog?tag=${tag.name}`}
                        className="px-3 py-1 text-sm rounded-full bg-tertiary text-tertiary border border-default hover:bg-accent/10 hover:text-accent hover:border-accent/50 transition-colors"
                      >
                        #{tag.name} ({tag.count})
                      </Link>
                    ))}
                  </div>
                </Card>

                <Card variant="default" padding="lg">
                  <h3 className="text-lg font-bold text-primary mb-4">Newsletter</h3>
                  <p className="text-secondary text-sm mb-4">
                    Get the latest articles delivered to your inbox.
                  </p>
                  <form className="space-y-3">
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full px-4 py-2.5 rounded-lg border border-default bg-primary text-primary placeholder:text-tertiary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                      aria-label="Email address"
                    />
                    <button type="submit" className="w-full bg-accent text-white py-2.5 rounded-lg font-medium hover:bg-accent-hover transition-colors">
                      Subscribe
                    </button>
                  </form>
                </Card>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}