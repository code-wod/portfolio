'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Clock, Eye, Mail, Users, TrendingUp, ArrowUpRight, ArrowDownRight, Minus, FileText, FolderKanban, MessageSquare, Plus, ExternalLink } from 'lucide-react';
import { Card } from '@/components/Common/Card';
import { Button } from '@/components/Common/Button';
import { cn } from '@/lib/utils';

interface AnalyticsData {
  overview: {
    totalVisitors: number;
    uniqueVisitors: number;
    newVisitors: number;
  };
  traffic: Array<{ date: string; count: number }>;
  deviceBreakdown: Record<string, number>;
  topReferrers: Array<{ referrer: string; count: number }>;
  topPosts: Array<{ title: string; views: number; slug: string }>;
  recentMessages: Array<{ name: string; email: string; subject: string; createdAt: string; read: boolean }>;
}

const statCards = [
  { label: 'Total Visitors', value: 0, icon: Users, change: '+12%', changeType: 'up' as const, href: '/admin/analytics' },
  { label: 'Unique Visitors', value: 0, icon: Eye, change: '+8%', changeType: 'up' as const, href: '/admin/analytics' },
  { label: 'Messages', value: 0, icon: Mail, change: '3 unread', changeType: 'neutral' as const, href: '/admin/inbox' },
  { label: 'Blog Posts', value: 0, icon: FileText, change: '5 published', changeType: 'neutral' as const, href: '/admin/blog' },
];

const quickActions = [
  { label: 'New Blog Post', href: '/admin/blog', icon: FileText, description: 'Write and publish article' },
  { label: 'Add Project', href: '/admin/projects', icon: FolderKanban, description: 'Showcase new work' },
  { label: 'Update Skills', href: '/admin/skills', icon: MessageSquare, description: 'Manage skill categories' },
  { label: 'View Analytics', href: '/admin/analytics', icon: TrendingUp, description: 'Check site performance' },
];

export default function AdminDashboardPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/analytics?days=30')
      .then(res => res.json())
      .then(data => {
        if (!data.error) setAnalytics(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
          <p className="text-secondary mt-1">Welcome back! Here's an overview of your portfolio.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="primary" asChild>
            <Link href="/admin/blog"><FileText className="h-5 w-5" /> New Post</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/projects"><FolderKanban className="h-5 w-5" /> Add Project</Link>
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
            whileHover={{ y: -2 }}
          >
            <Link href={stat.href} className="block">
              <Card variant="default" padding="lg" hover className="h-full">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-secondary">{stat.label}</p>
                    <p className="text-3xl font-bold text-primary mt-1">{analytics ? formatNumber(
                      stat.label === 'Total Visitors' ? analytics.overview.totalVisitors :
                      stat.label === 'Unique Visitors' ? analytics.overview.uniqueVisitors :
                      stat.label === 'Messages' ? analytics.recentMessages.filter(m => !m.read).length :
                      0
                    ) : (loading ? '—' : '0')}</p>
                    <p className={cn(
                      'text-xs mt-2 flex items-center gap-1',
                      stat.changeType === 'up' ? 'text-success' :
                      stat.changeType === 'down' ? 'text-error' : 'text-tertiary'
                    )}>
                      {stat.changeType === 'up' && <ArrowUpRight className="h-3 w-3" />}
                      {stat.changeType === 'down' && <ArrowDownRight className="h-3 w-3" />}
                      {stat.changeType === 'neutral' && <Minus className="h-3 w-3" />}
                      {stat.change}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-accent" />
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card variant="default" padding="lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-primary">Traffic Overview (Last 30 Days)</h2>
              <Link href="/admin/analytics" className="text-sm text-accent hover:underline">View Details</Link>
            </div>
            {loading ? (
              <div className="h-64 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-3 border-accent border-t-transparent" />
              </div>
            ) : analytics ? (
              <div className="h-64 relative">
                <svg viewBox="0 0 100% 100%" className="w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="trafficGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {analytics.traffic.length > 1 && (
                    <>
                      <path
                        d={analytics.traffic.map((point, i) => {
                          const x = (i / (analytics.traffic.length - 1)) * 100;
                          const maxCount = Math.max(...analytics.traffic.map(p => p.count), 1);
                          const y = 100 - (point.count / maxCount) * 80;
                          return `${i === 0 ? 'M' : 'L'} ${x}% ${y}%`;
                        }).join(' ')}
                        stroke="var(--accent)"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d={`${analytics.traffic.map((point, i) => {
                          const x = (i / (analytics.traffic.length - 1)) * 100;
                          const maxCount = Math.max(...analytics.traffic.map(p => p.count), 1);
                          const y = 100 - (point.count / maxCount) * 80;
                          return `${i === 0 ? 'M' : 'L'} ${x}% ${y}%`;
                        }).join(' ')} L 100% 100% L 0% 100% Z`}
                        fill="url(#trafficGradient)"
                      />
                    </>
                  )}
                </svg>
                <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-tertiary px-2">
                  <span>{analytics.traffic[0]?.date}</span>
                  <span>{analytics.traffic[analytics.traffic.length - 1]?.date}</span>
                </div>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-tertiary">No data available</div>
            )}
          </Card>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
        >
          <Card variant="default" padding="lg">
            <h2 className="text-xl font-bold text-primary mb-4">Quick Actions</h2>
            <div className="space-y-3">
              {quickActions.map((action) => (
                <Link key={action.label} href={action.href} className="block">
                  <div className="p-4 bg-tertiary/30 rounded-lg hover:bg-tertiary/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                        <action.icon className="h-5 w-5 text-accent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-primary">{action.label}</p>
                        <p className="text-xs text-tertiary truncate">{action.description}</p>
                      </div>
                    </div>
                  </div>
                </Link>
                ))}
              </div>
          </Card>
        </motion.section>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Card variant="default" padding="lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-primary">Top Blog Posts</h2>
              <Link href="/admin/blog" className="text-sm text-accent hover:underline">View All</Link>
            </div>
            {analytics?.topPosts.length ? (
              <div className="space-y-4">
                {analytics.topPosts.map((post, index) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} target="_blank" className="block">
                    <div className="flex items-center gap-3 p-3 bg-tertiary/30 rounded-lg hover:bg-tertiary/50 transition-colors">
                      <span className="w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-bold flex items-center justify-center flex-shrink-0">
                        {index + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-primary truncate">{post.title}</p>
                        <p className="text-xs text-tertiary flex items-center gap-1">
                          <Eye className="h-3 w-3" /> {post.views} views
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-tertiary text-center py-8">No blog posts yet</p>
            )}
          </Card>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
        >
          <Card variant="default" padding="lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-primary">Recent Messages</h2>
              <Link href="/admin/inbox" className="text-sm text-accent hover:underline">View All</Link>
            </div>
            {analytics?.recentMessages.length ? (
              <div className="space-y-3">
                {analytics.recentMessages.map((msg) => (
                  <div key={msg.email} className={cn(
                    'p-3 rounded-lg border transition-colors',
                    msg.read ? 'border-default' : 'border-accent/30 bg-accent/5'
                  )}>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-primary truncate">{msg.name}</p>
                        <p className="text-xs text-tertiary truncate">{msg.email}</p>
                        <p className="text-sm text-secondary mt-1 line-clamp-1">{msg.subject}</p>
                      </div>
                      {!msg.read && (
                        <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0 mt-1" />
                      )}
                    </div>
                    <p className="text-xs text-tertiary mt-2">{new Date(msg.createdAt).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-tertiary text-center py-8">No messages yet</p>
            )}
          </Card>
        </motion.section>
      </div>
    </div>
  );
}