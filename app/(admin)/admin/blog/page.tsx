'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash, Loader2, Save, Eye, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/Common/Button';
import { Input } from '@/components/Common/Input';
import { Textarea } from '@/components/Common/Input';
import { Select } from '@/components/Common/Input';
import { Card } from '@/components/Common/Card';
import { Modal } from '@/components/Common/Modal';
import { cn } from '@/lib/utils';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImageUrl?: string;
  tags: string[];
  category: string;
  author: string;
  published: boolean;
  publishedAt?: string;
  scheduledFor?: string;
  views: number;
  readingTimeMinutes: number;
}

const categories = ['Android', 'Architecture', 'WebRTC', 'Firebase', 'Kotlin', 'Performance'];

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    coverImageUrl: '',
    tags: '',
    category: 'Architecture',
    author: 'Dixit Saini',
    published: false,
    scheduledFor: '',
    readingTimeMinutes: 10,
  });

  useEffect(() => {
    fetch(`/api/admin/blog?status=${statusFilter === 'all' ? '' : statusFilter}`)
      .then(res => res.json())
      .then(data => {
        if (data.posts) setPosts(data.posts);
      })
      .finally(() => setLoading(false));
  }, [statusFilter]);

  const openCreateModal = () => {
    setEditingPost(null);
    setFormData({
      title: '', slug: '', content: '', excerpt: '', coverImageUrl: '', tags: '',
      category: 'Architecture', author: 'Dixit Saini', published: false, scheduledFor: '', readingTimeMinutes: 10,
    });
    setShowModal(true);
  };

  const openEditModal = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt,
      coverImageUrl: post.coverImageUrl || '',
      tags: post.tags.join(', '),
      category: post.category,
      author: post.author,
      published: post.published,
      scheduledFor: post.scheduledFor ? post.scheduledFor.split('T')[0] : '',
      readingTimeMinutes: post.readingTimeMinutes,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const data = {
      ...formData,
      tags: formData.tags.split(',').map(s => s.trim()).filter(Boolean),
      readingTimeMinutes: parseInt(formData.readingTimeMinutes as any),
      scheduledFor: formData.scheduledFor ? new Date(formData.scheduledFor).toISOString() : null,
    };

    try {
      const url = editingPost ? `/api/admin/blog/${editingPost._id}` : '/api/admin/blog';
      const method = editingPost ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setShowModal(false);
        const refreshed = await fetch(`/api/admin/blog?status=${statusFilter === 'all' ? '' : statusFilter}`).then(r => r.json());
        if (refreshed.posts) setPosts(refreshed.posts);
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to save');
      }
    } catch {
      alert('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this blog post?')) return;

    try {
      const res = await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setPosts(prev => prev.filter(p => p._id !== id));
      } else {
        alert('Failed to delete');
      }
    } catch {
      alert('Failed to delete');
    }
  };

  const handlePublish = async (id: string, published: boolean) => {
    try {
      const post = posts.find(p => p._id === id);
      if (!post) return;

      const res = await fetch(`/api/admin/blog/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...post, published, publishedAt: published ? new Date().toISOString() : post.publishedAt }),
      });

      if (res.ok) {
        setPosts(prev => prev.map(p => p._id === id ? { ...p, published } : p));
      }
    } catch {
      alert('Failed to update');
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin text-accent" /></div>;
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-primary">Blog Manager</h1>
          <p className="text-secondary mt-1">Manage your technical blog posts</p>
        </div>
        <div className="flex gap-3">
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            options={[
              { value: 'all', label: 'All Posts' },
              { value: 'published', label: 'Published' },
              { value: 'draft', label: 'Drafts' },
            ]}
            className="w-40"
          />
          <Button onClick={openCreateModal}><Plus className="h-5 w-5 mr-2" /> New Post</Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Card variant="default" padding="none">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-default text-left">
                  <th className="p-4 text-xs font-medium text-tertiary uppercase tracking-wider">Status</th>
                  <th className="p-4 text-xs font-medium text-tertiary uppercase tracking-wider">Title</th>
                  <th className="p-4 text-xs font-medium text-tertiary uppercase tracking-wider">Category</th>
                  <th className="p-4 text-xs font-medium text-tertiary uppercase tracking-wider">Published</th>
                  <th className="p-4 text-xs font-medium text-tertiary uppercase tracking-wider">Views</th>
                  <th className="p-4 text-xs font-medium text-tertiary uppercase tracking-wider">Reading Time</th>
                  <th className="p-4 text-xs font-medium text-tertiary uppercase tracking-wider w-56">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post._id} className="border-b border-default/50 hover:bg-tertiary/30 transition-colors">
                    <td className="p-4">
                      <span className={cn(
                        'px-2 py-1 text-xs font-medium rounded-full',
                        post.published ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                      )}>
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="p-4 font-medium text-primary max-w-xs truncate">{post.title}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-accent/10 text-accent">
                        {post.category}
                      </span>
                    </td>
                    <td className="p-4 text-secondary">
                      {post.published ? formatDate(post.publishedAt) : (post.scheduledFor ? `Scheduled: ${formatDate(post.scheduledFor)}` : '—')}
                    </td>
                    <td className="p-4 text-secondary flex items-center gap-1">
                      <Eye className="h-4 w-4" /> {post.views}
                    </td>
                    <td className="p-4 text-secondary flex items-center gap-1">
                      <Clock className="h-4 w-4" /> {post.readingTimeMinutes} min
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => openEditModal(post)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        {post.published && (
                          <Button variant="ghost" size="sm" onClick={() => handlePublish(post._id, false)}>
                            <Calendar className="h-4 w-4" />
                          </Button>
                        )}
                        {!post.published && (
                          <Button variant="ghost" size="sm" onClick={() => handlePublish(post._id, true)}>
                            <Calendar className="h-4 w-4 text-success" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(post._id)}>
                          <Trash className="h-4 w-4 text-error" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {posts.length === 0 && (
            <div className="p-12 text-center text-tertiary">
              <p>No blog posts yet. Click "New Post" to create one.</p>
            </div>
          )}
        </Card>
      </motion.div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingPost ? 'Edit Blog Post' : 'New Blog Post'}
        size="xl"
      >
        <form onSubmit={handleSubmit} className="space-y-5 max-h-[70vh] overflow-y-auto p-6">
          <Input
            label="Title"
            name="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="MVVM Architecture Deep Dive"
            required
          />

          <Input
            label="Slug (URL-friendly)"
            name="slug"
            value={formData.slug}
            onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
            placeholder="mvvm-architecture-deep-dive"
            required
          />

          <div className="grid sm:grid-cols-2 gap-4">
            <Select
              label="Category"
              name="category"
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              options={categories.map(c => ({ value: c, label: c }))}
              required
            />
            <Input
              label="Reading Time (minutes)"
              name="readingTimeMinutes"
              type="number"
              value={formData.readingTimeMinutes}
              onChange={(e) => setFormData(prev => ({ ...prev, readingTimeMinutes: parseInt(e.target.value) }))}
              min="1"
              required
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                className="w-4 h-4 rounded border-default text-accent focus:ring-accent"
              />
              <span>Published</span>
            </label>
            <Input
              label="Scheduled Date (optional)"
              name="scheduledFor"
              type="date"
              value={formData.scheduledFor}
              onChange={(e) => setFormData(prev => ({ ...prev, scheduledFor: e.target.value }))}
            />
          </div>

          <Input
            label="Cover Image URL"
            name="coverImageUrl"
            value={formData.coverImageUrl}
            onChange={(e) => setFormData(prev => ({ ...prev, coverImageUrl: e.target.value }))}
            placeholder="https://cloudinary.com/.../cover.jpg"
          />

          <Input
            label="Tags (comma-separated)"
            name="tags"
            value={formData.tags}
            onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
            placeholder="android, architecture, mvvm, kotlin"
          />

          <Textarea
            label="Excerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
            placeholder="Brief summary for blog listing (150-300 chars)"
            rows={3}
            required
          />

          <Textarea
            label="Content (Markdown)"
            name="content"
            value={formData.content}
            onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
            placeholder="# Introduction\n\nYour markdown content here..."
            rows={15}
            required
          />

          <div className="flex justify-end gap-3 pt-4 border-t border-default sticky bottom-0 bg-secondary/90 backdrop-blur-sm">
            <Button type="button" variant="ghost" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button type="submit" loading={saving}>
              <Save className="h-5 w-5 mr-2" /> {editingPost ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}