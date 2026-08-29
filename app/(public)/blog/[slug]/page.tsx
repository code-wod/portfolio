'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, ArrowRight, Share2, Bird, Link as LinkIcon, Copy, Clock, Eye, Tag, ChevronDown, Check, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

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

const renderers = {
  code({ children, ...props }: any) {
    const { className, ...rest } = props;
    const language = className?.replace('language-', '') || 'plaintext';
    return (
      <div className="relative group">
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => navigator.clipboard.writeText(children.props.children)}
            className="px-2 py-1 text-xs bg-tertiary text-secondary rounded hover:bg-accent/10 hover:text-accent transition-colors"
          >
            Copy
          </button>
        </div>
        <pre className={cn('overflow-x-auto rounded-lg bg-tertiary p-4', rest.className)}>
          <code className={cn('font-mono text-sm', className)}>{children.props.children}</code>
        </pre>
      </div>
    );
  },
  a({ href, children, ...props }: any) {
    const isExternal = href?.startsWith('http');
    return (
      <a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className="text-accent hover:underline"
        {...props}
      >
        {children}
        {isExternal && <ExternalLink className="inline h-3 w-3 ml-1" />}
      </a>
    );
  },
  h1({ children, ...props }: any) {
    return <h1 className="text-3xl font-bold text-primary mt-8 mb-4">{children}</h1>;
  },
  h2({ children, ...props }: any) {
    return <h2 className="text-2xl font-bold text-primary mt-8 mb-3">{children}</h2>;
  },
  h3({ children, ...props }: any) {
    return <h3 className="text-xl font-bold text-primary mt-6 mb-2">{children}</h3>;
  },
  p({ children, ...props }: any) {
    return <p className="text-secondary leading-relaxed mb-4">{children}</p>;
  },
  ul({ children, ...props }: any) {
    return <ul className="list-disc list-inside space-y-2 mb-4 text-secondary">{children}</ul>;
  },
  ol({ children, ...props }: any) {
    return <ol className="list-decimal list-inside space-y-2 mb-4 text-secondary">{children}</ol>;
  },
  li({ children, ...props }: any) {
    return <li className="leading-relaxed">{children}</li>;
  },
  blockquote({ children, ...props }: any) {
    return (
      <blockquote className="border-l-4 border-accent pl-4 italic text-secondary my-4">
        {children}
      </blockquote>
    );
  },
  hr({ ...props }: any) {
    return <hr className="border-default my-8" {...props} />;
  },
  img({ src, alt, ...props }: any) {
    return (
      <figure className="my-6">
        <img src={src} alt={alt} className="rounded-lg max-w-full h-auto" {...props} />
        {alt && <figcaption className="text-center text-sm text-tertiary mt-2">{alt}</figcaption>}
      </figure>
    );
  },
};

function TableOfContents({ headings }: { headings: Array<{ id: string; text: string; level: number }> }) {
  const [activeId, setActiveId] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -66%' }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observerRef.current?.observe(element);
    });

    return () => observerRef.current?.disconnect();
  }, [headings]);

  return (
    <nav className="sticky top-24 space-y-2 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
      <h4 className="font-semibold text-primary mb-3">Table of Contents</h4>
      <ul className="space-y-1">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={cn(
                'block text-sm transition-colors pl-2 border-l-2',
                activeId === heading.id
                  ? 'text-accent border-accent font-medium'
                  : 'text-tertiary border-transparent hover:text-secondary'
              )}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(heading.id);
                element?.scrollIntoView({ behavior: 'smooth' });
                setActiveId(heading.id);
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [headings, setHeadings] = useState<Array<{ id: string; text: string; level: number }>>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const foundPost = blogPosts.find((p) => p.slug === slug);
    if (foundPost) {
      setPost(foundPost);
      const extractedHeadings: Array<{ id: string; text: string; level: number }> = [];
      const headingRegex = /^(#{1,3})\s+(.+)$/gm;
      let match;
      while ((match = headingRegex.exec(foundPost.content)) !== null) {
        const level = match[1].length;
        const text = match[2].trim();
        const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
        extractedHeadings.push({ id, text, level });
      }
      setHeadings(extractedHeadings);
    }
  }, [slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(post?.title || '');
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  if (!post) {
    return (
      <>
        <Header />
        <main className="flex-1 pt-16 lg:pt-0 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-secondary">Post not found</p>
            <Link href="/blog" className="mt-4 inline-block text-accent hover:underline">
              ← Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug && (p.category === post.category || p.tags.some((t) => post.tags.includes(t))))
    .slice(0, 3);

  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  return (
    <>
      <Header />
      <main className="flex-1 pt-16 lg:pt-0">
        <article className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-secondary hover:text-accent transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            <header className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 text-sm font-medium rounded-full bg-accent/10 text-accent">
                  {post.category}
                </span>
              </div>
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-primary mb-6 leading-tight">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-secondary">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {formatDate(post.publishedAt)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readingTimeMinutes} min read
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {post.views} views
                </span>
              </div>
              <div className="flex items-center gap-4 mt-6">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold">
                  {post.author.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-primary">{post.author.name}</p>
                  <p className="text-sm text-secondary">Android Developer | 3+ years</p>
                </div>
              </div>
            </header>

            {post.coverImage && (
              <div className="mb-12">
                <img src={post.coverImage} alt={post.title} className="w-full h-auto rounded-xl" />
              </div>
            )}

            <div className="grid lg:grid-cols-4 gap-8 lg:gap-12">
              <div className="lg:col-span-3 space-y-8">
                <ReactMarkdown
                  components={renderers}
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                >
                  {post.content}
                </ReactMarkdown>

                <div className="pt-8 border-t border-default">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 text-sm rounded-full bg-tertiary text-tertiary border border-default">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-secondary">Share:</span>
                    <button onClick={shareOnTwitter} className="p-2 rounded-lg text-tertiary hover:text-accent hover:bg-tertiary transition-colors" aria-label="Share on Twitter">
                      <Bird className="h-5 w-5" />
                    </button>
                    <button onClick={shareOnLinkedIn} className="p-2 rounded-lg text-tertiary hover:text-accent hover:bg-tertiary transition-colors" aria-label="Share on LinkedIn">
                      <LinkIcon className="h-5 w-5" />
                    </button>
                    <button onClick={copyLink} className="p-2 rounded-lg text-tertiary hover:text-accent hover:bg-tertiary transition-colors" aria-label="Copy link">
                      {copied ? <Check className="h-5 w-5 text-success" /> : <Copy className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {relatedPosts.length > 0 && (
                  <div className="pt-8 border-t border-default">
                    <h3 className="text-xl font-bold text-primary mb-6">Related Articles</h3>
                    <div className="grid gap-4 md:grid-cols-3">
                      {relatedPosts.map((relatedPost) => (
                        <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`} className="bg-secondary border border-default rounded-xl p-4 hover:border-accent/50 transition-colors">
                          <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-accent/10 text-accent">
                            {relatedPost.category}
                          </span>
                          <h4 className="font-bold text-primary mt-2 mb-1 line-clamp-2">{relatedPost.title}</h4>
                          <p className="text-sm text-secondary line-clamp-2">{relatedPost.excerpt}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-8 border-t border-default">
                  <div className="flex items-center gap-4 p-4 bg-secondary border border-default rounded-xl">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-lg flex-shrink-0">
                      DS
                    </div>
                    <div>
                      <p className="font-bold text-primary">{post.author.name}</p>
                      <p className="text-sm text-secondary">Senior Android Developer with 3+ years of experience building scalable mobile applications.</p>
                    </div>
                  </div>
                </div>
              </div>

              <aside className="hidden lg:block">
                {headings.length > 0 && (
                  <TableOfContents headings={headings} />
                )}
              </aside>
            </div>

            <nav className="mt-12 pt-8 border-t border-default flex items-center justify-between">
              {prevPost && (
                <Link href={`/blog/${prevPost.slug}`} className="flex items-center gap-2 text-accent hover:underline transition-colors">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="text-sm">Previous</span>
                </Link>
              )}
              <Link href="/blog" className="text-secondary hover:text-accent transition-colors">
                All Articles
              </Link>
              {nextPost && (
                <Link href={`/blog/${nextPost.slug}`} className="flex items-center gap-2 text-accent hover:underline transition-colors">
                  <span className="text-sm">Next</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </nav>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}