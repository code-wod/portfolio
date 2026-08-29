'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Users, Eye, TrendingUp, Monitor, Smartphone, Tablet, Globe, ExternalLink, FileText, Clock, Download } from 'lucide-react';
import { Card } from '@/components/Common/Card';
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

const formatNumber = (num: number) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export default function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/admin/analytics?days=${days}`)
      .then(res => res.json())
      .then(data => {
        if (!data.error) setAnalytics(data);
      })
      .finally(() => setLoading(false));
  }, [days]);

  if (loading) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin text-accent" /></div>;
  }

  const statCards = [
    { label: 'Total Visitors', value: analytics?.overview.totalVisitors || 0, icon: Users, change: '+12%', changeType: 'up' as const },
    { label: 'Unique Visitors', value: analytics?.overview.uniqueVisitors || 0, icon: Eye, change: '+8%', changeType: 'up' as const },
    { label: 'New Visitors', value: analytics?.overview.newVisitors || 0, icon: TrendingUp, change: '+15%', changeType: 'up' as const },
  ];

  const deviceIcons = { desktop: Monitor, mobile: Smartphone, tablet: Tablet };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-primary">Analytics Dashboard</h1>
          <p className="text-secondary mt-1">Track your portfolio performance</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-tertiary">Time Range:</span>
          <select
            value={days}
            onChange={(e) => setDays(parseInt(e.target.value))}
            className="px-3 py-2 rounded-lg border border-default bg-primary text-primary focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value={7}>Last 7 Days</option>
            <option value={30}>Last 30 Days</option>
            <option value={90}>Last 90 Days</option>
          </select>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-6"
      >
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
            whileHover={{ y: -2 }}
          >
            <Card variant="default" padding="lg" hover>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary">{stat.label}</p>
                  <p className="text-3xl font-bold text-primary mt-1">{formatNumber(stat.value)}</p>
                  <p className={cn('text-xs mt-2 flex items-center gap-1', stat.changeType === 'up' ? 'text-success' : 'text-tertiary')}>
                    <TrendingUp className="h-3 w-3" /> {stat.change} vs last period
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-accent" />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card variant="default" padding="lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-primary">Traffic Overview</h2>
            </div>
            {analytics && analytics.traffic.length > 1 ? (
              <div className="h-80 relative">
                <svg viewBox="0 0 100% 100%" className="w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="trafficGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
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
                </svg>
                <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-tertiary px-2">
                  <span>{analytics.traffic[0]?.date}</span>
                  <span>{analytics.traffic[analytics.traffic.length - 1]?.date}</span>
                </div>
              </div>
            ) : (
              <div className="h-80 flex items-center justify-center text-tertiary">Not enough data for chart</div>
            )}
          </Card>
        </motion.section>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
        >
          <Card variant="default" padding="lg">
            <h2 className="text-xl font-bold text-primary mb-6">Device Breakdown</h2>
            {analytics && Object.keys(analytics.deviceBreakdown).length > 0 ? (
              <div className="space-y-4">
                {Object.entries(analytics.deviceBreakdown).map(([device, count]) => {
                  const total = Object.values(analytics.deviceBreakdown).reduce((a, b) => a + b, 0);
                  const percentage = ((count / total) * 100).toFixed(1);
                  const Icon = deviceIcons[device as keyof typeof deviceIcons] || Monitor;
                  return (
                    <div key={device} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className="h-5 w-5 text-accent" />
                          <span className="capitalize font-medium text-primary">{device}</span>
                        </div>
                        <span className="text-secondary">{formatNumber(count)} ({percentage}%)</span>
                      </div>
                      <div className="h-2 bg-tertiary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-tertiary text-center py-8">No device data available</p>
            )}
          </Card>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Card variant="default" padding="lg">
            <h2 className="text-xl font-bold text-primary mb-6">Top Referrers</h2>
            {analytics?.topReferrers.length ? (
              <div className="space-y-3">
                {analytics.topReferrers.slice(0, 10).map((ref, index) => (
                  <div key={ref.referrer} className="flex items-center justify-between p-3 bg-tertiary/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-bold flex items-center justify-center">
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-medium text-primary truncate max-w-xs">{ref.referrer}</p>
                        <p className="text-xs text-tertiary">{formatNumber(ref.count)} visits</p>
                      </div>
                    </div>
                    <a
                      href={ref.referrer.startsWith('http') ? ref.referrer : `https://${ref.referrer}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded text-tertiary hover:text-accent transition-colors"
                      title="Open referrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-tertiary text-center py-8">No referrer data available</p>
            )}
          </Card>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
        >
          <Card variant="default" padding="lg">
            <h2 className="text-xl font-bold text-primary mb-6">Top Blog Posts</h2>
            {analytics?.topPosts.length ? (
              <div className="space-y-3">
                {analytics.topPosts.slice(0, 5).map((post, index) => (
                  <a
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 bg-tertiary/30 rounded-lg hover:bg-tertiary/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-bold flex items-center justify-center">
                        {index + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-primary truncate">{post.title}</p>
                        <p className="text-xs text-tertiary flex items-center gap-1">
                          <Eye className="h-3 w-3" /> {formatNumber(post.views)} views
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-tertiary text-center py-8">No blog posts yet</p>
            )}
          </Card>
        </motion.section>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Card variant="default" padding="lg">
            <h2 className="text-xl font-bold text-primary mb-6">Export Data</h2>
            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start" onClick={() => window.open(`/api/admin/analytics?days=${days}&format=csv`, '_blank')}>
                <Download className="h-5 w-5 mr-2" />
                Export Analytics (CSV)
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => window.open('/api/admin/visitors?days=' + days, '_blank')}>
                <FileText className="h-5 w-5 mr-2" />
                Export Visitor Logs (JSON)
              </Button>
            </div>
          </Card>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.45 }}
        >
          <Card variant="default" padding="lg">
            <h2 className="text-xl font-bold text-primary mb-6">Recent Activity</h2>
            {analytics?.recentMessages.length ? (
              <div className="space-y-3">
                {analytics.recentMessages.slice(0, 5).map((msg) => (
                  <div key={msg.email} className="p-3 bg-tertiary/30 rounded-lg">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-primary truncate">{msg.name}</p>
                        <p className="text-xs text-tertiary truncate">{msg.email}</p>
                        <p className="text-sm text-secondary mt-1 line-clamp-1">{msg.subject}</p>
                      </div>
                      {!msg.read && <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0 mt-1" />}
                    </div>
                    <p className="text-xs text-tertiary mt-2">{formatDate(msg.createdAt)}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-tertiary text-center py-8">No recent messages</p>
            )}
          </Card>
        </motion.section>
      </div>
    </div>
  );
}