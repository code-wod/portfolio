'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash, Loader2, Save, ExternalLink, GitFork, Globe } from 'lucide-react';
import { Button } from '@/components/Common/Button';
import { Input } from '@/components/Common/Input';
import { Textarea } from '@/components/Common/Input';
import { Select } from '@/components/Common/Input';
import { Card } from '@/components/Common/Card';
import { Modal } from '@/components/Common/Modal';
import { cn } from '@/lib/utils';

interface Project {
  _id: string;
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
}

const statusOptions = ['In Development', 'Released', 'Archived'];

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<'basic' | 'details' | 'links' | 'metrics' | 'challenges'>('basic');

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    longDescription: '',
    thumbnailUrl: '',
    imageUrls: '' as string,
    technologies: '' as string,
    github: '',
    demo: '',
    playstore: '',
    featured: false,
    status: 'In Development' as 'In Development' | 'Released' | 'Archived',
    downloads: '',
    rating: '',
    uptime: '',
    latency: '',
    challenges: '' as string,
    solutions: '' as string,
    lessons: '' as string,
    order: 1,
  });

  useEffect(() => {
    fetch('/api/admin/projects')
      .then(res => res.json())
      .then(data => {
        if (data.projects) setProjects(data.projects);
      })
      .finally(() => setLoading(false));
  }, []);

  const openCreateModal = () => {
    setEditingProject(null);
    setFormData({
      title: '', slug: '', description: '', longDescription: '', thumbnailUrl: '', imageUrls: '',
      technologies: '', github: '', demo: '', playstore: '', featured: false,
      status: 'In Development', downloads: '', rating: '', uptime: '', latency: '',
      challenges: '', solutions: '', lessons: '', order: projects.length + 1,
    });
    setActiveTab('basic');
    setShowModal(true);
  };

  const openEditModal = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      slug: project.slug,
      description: project.description,
      longDescription: project.longDescription,
      thumbnailUrl: project.thumbnailUrl || '',
      imageUrls: project.imageUrls.join('\n'),
      technologies: project.technologies.join(', '),
      github: project.links.github || '',
      demo: project.links.demo || '',
      playstore: project.links.playstore || '',
      featured: project.featured,
      status: project.status,
      downloads: project.metrics.downloads?.toString() || '',
      rating: project.metrics.rating?.toString() || '',
      uptime: project.metrics.uptime?.toString() || '',
      latency: project.metrics.latency?.toString() || '',
      challenges: project.challenges.join('\n'),
      solutions: project.solutions.join('\n'),
      lessons: project.lessons.join('\n'),
      order: project.order,
    });
    setActiveTab('basic');
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const data = {
      title: formData.title,
      slug: formData.slug,
      description: formData.description,
      longDescription: formData.longDescription,
      thumbnailUrl: formData.thumbnailUrl || undefined,
      imageUrls: formData.imageUrls.split('\n').map(s => s.trim()).filter(Boolean),
      technologies: formData.technologies.split(',').map(s => s.trim()).filter(Boolean),
      links: {
        github: formData.github || undefined,
        demo: formData.demo || undefined,
        playstore: formData.playstore || undefined,
      },
      featured: formData.featured,
      status: formData.status,
      metrics: {
        downloads: formData.downloads ? parseInt(formData.downloads) : undefined,
        rating: formData.rating ? parseFloat(formData.rating) : undefined,
        uptime: formData.uptime ? parseFloat(formData.uptime) : undefined,
        latency: formData.latency ? parseInt(formData.latency) : undefined,
      },
      challenges: formData.challenges.split('\n').map(s => s.trim()).filter(Boolean),
      solutions: formData.solutions.split('\n').map(s => s.trim()).filter(Boolean),
      lessons: formData.lessons.split('\n').map(s => s.trim()).filter(Boolean),
      order: parseInt(formData.order as any),
    };

    try {
      const url = editingProject ? `/api/admin/projects/${editingProject._id}` : '/api/admin/projects';
      const method = editingProject ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setShowModal(false);
        const refreshed = await fetch('/api/admin/projects').then(r => r.json());
        if (refreshed.projects) setProjects(refreshed.projects);
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
    if (!confirm('Delete this project?')) return;

    try {
      const res = await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProjects(prev => prev.filter(p => p._id !== id));
      } else {
        alert('Failed to delete');
      }
    } catch {
      alert('Failed to delete');
    }
  };

  const statusStyles = {
    'In Development': 'bg-warning/10 text-warning border-warning/20',
    'Released': 'bg-success/10 text-success border-success/20',
    'Archived': 'bg-tertiary text-tertiary border-default',
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin text-accent" /></div>;
  }

  const sortedProjects = [...projects].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-primary">Projects Manager</h1>
          <p className="text-secondary mt-1">Manage your portfolio projects</p>
        </div>
        <Button onClick={openCreateModal}><Plus className="h-5 w-5 mr-2" /> Add Project</Button>
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
                  <th className="p-4 text-xs font-medium text-tertiary uppercase tracking-wider w-10">Order</th>
                  <th className="p-4 text-xs font-medium text-tertiary uppercase tracking-wider w-24">Thumbnail</th>
                  <th className="p-4 text-xs font-medium text-tertiary uppercase tracking-wider">Title</th>
                  <th className="p-4 text-xs font-medium text-tertiary uppercase tracking-wider">Technologies</th>
                  <th className="p-4 text-xs font-medium text-tertiary uppercase tracking-wider">Status</th>
                  <th className="p-4 text-xs font-medium text-tertiary uppercase tracking-wider">Featured</th>
                  <th className="p-4 text-xs font-medium text-tertiary uppercase tracking-wider w-56">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedProjects.map((project) => (
                  <tr key={project._id} className="border-b border-default/50 hover:bg-tertiary/30 transition-colors">
                    <td className="p-4 font-medium text-primary">{project.order}</td>
                    <td className="p-4">
                      {project.thumbnailUrl ? (
                        <img src={project.thumbnailUrl} alt={project.title} className="w-16 h-10 rounded object-cover" />
                      ) : (
                        <div className="w-16 h-10 rounded bg-tertiary flex items-center justify-center text-xs text-tertiary">No Image</div>
                      )}
                    </td>
                    <td className="p-4 font-medium text-primary max-w-xs truncate">{project.title}</td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span key={tech} className="px-2 py-0.5 text-xs bg-tertiary text-tertiary rounded border border-default">
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2 py-0.5 text-xs bg-tertiary text-tertiary rounded border border-default">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={cn('px-2 py-1 text-xs font-medium rounded-full', statusStyles[project.status])}>
                        {project.status}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      {project.featured ? (
                        <span className="text-success">★</span>
                      ) : (
                        <span className="text-tertiary">☆</span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {project.links.github && (
                          <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-tertiary hover:text-accent hover:bg-tertiary transition-colors" title="GitHub">
                            <GitFork className="h-4 w-4" />
                          </a>
                        )}
                        {project.links.demo && (
                          <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-tertiary hover:text-accent hover:bg-tertiary transition-colors" title="Demo">
                            <Globe className="h-4 w-4" />
                          </a>
                        )}
                        <Button variant="ghost" size="sm" onClick={() => openEditModal(project)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(project._id)}>
                          <Trash className="h-4 w-4 text-error" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {projects.length === 0 && (
            <div className="p-12 text-center text-tertiary">
              <p>No projects yet. Click "Add Project" to create one.</p>
            </div>
          )}
        </Card>
      </motion.div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingProject ? 'Edit Project' : 'Add Project'}
        size="xl"
      >
        <div className="space-y-0">
          <div className="flex border-b border-default mb-0">
            {(['basic', 'details', 'links', 'metrics', 'challenges'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'px-4 py-3 text-sm font-medium border-b-2 transition-colors',
                  activeTab === tab
                    ? 'border-accent text-accent'
                    : 'border-transparent text-tertiary hover:text-primary hover:border-default'
                )}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
            {activeTab === 'basic' && (
              <div className="space-y-5">
                <Input
                  label="Title"
                  name="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Taktide"
                  required
                />
                <Input
                  label="Slug (URL-friendly)"
                  name="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="taktide"
                  required
                />
                <Textarea
                  label="Short Description"
                  name="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description for project cards"
                  rows={3}
                  required
                />
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="Display Order"
                    name="order"
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) }))}
                    min="1"
                    required
                  />
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                      className="w-4 h-4 rounded border-default text-accent focus:ring-accent"
                    />
                    <span>Featured Project</span>
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'details' && (
              <div className="space-y-5">
                <Input
                  label="Thumbnail URL"
                  name="thumbnailUrl"
                  value={formData.thumbnailUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, thumbnailUrl: e.target.value }))}
                  placeholder="https://cloudinary.com/.../thumbnail.jpg"
                />
                <Textarea
                  label="Additional Image URLs (one per line)"
                  name="imageUrls"
                  value={formData.imageUrls}
                  onChange={(e) => setFormData(prev => ({ ...prev, imageUrls: e.target.value }))}
                  placeholder="https://...\nhttps://..."
                  rows={3}
                />
                <Textarea
                  label="Long Description (Markdown)"
                  name="longDescription"
                  value={formData.longDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, longDescription: e.target.value }))}
                  placeholder="Full project description with markdown support"
                  rows={8}
                  required
                />
                <Input
                  label="Technologies (comma-separated)"
                  name="technologies"
                  value={formData.technologies}
                  onChange={(e) => setFormData(prev => ({ ...prev, technologies: e.target.value }))}
                  placeholder="Kotlin, Firebase, WebRTC, MVVM"
                  required
                />
              </div>
            )}

            {activeTab === 'links' && (
              <div className="space-y-5">
                <Input
                  label="GitHub URL"
                  name="github"
                  value={formData.github}
                  onChange={(e) => setFormData(prev => ({ ...prev, github: e.target.value }))}
                  placeholder="https://github.com/username/repo"
                />
                <Input
                  label="Demo URL"
                  name="demo"
                  value={formData.demo}
                  onChange={(e) => setFormData(prev => ({ ...prev, demo: e.target.value }))}
                  placeholder="https://demo.example.com"
                />
                <Input
                  label="Play Store URL"
                  name="playstore"
                  value={formData.playstore}
                  onChange={(e) => setFormData(prev => ({ ...prev, playstore: e.target.value }))}
                  placeholder="https://play.google.com/store/apps/details?id=..."
                />
              </div>
            )}

            {activeTab === 'metrics' && (
              <div className="space-y-5">
                <Select
                  label="Status"
                  name="status"
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                  options={statusOptions.map(s => ({ value: s, label: s }))}
                  required
                />
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="Downloads"
                    name="downloads"
                    type="number"
                    value={formData.downloads}
                    onChange={(e) => setFormData(prev => ({ ...prev, downloads: e.target.value }))}
                    min="0"
                  />
                  <Input
                    label="Rating (0-5)"
                    name="rating"
                    type="number"
                    value={formData.rating}
                    onChange={(e) => setFormData(prev => ({ ...prev, rating: e.target.value }))}
                    min="0"
                    max="5"
                    step="0.1"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="Uptime (0-1)"
                    name="uptime"
                    type="number"
                    value={formData.uptime}
                    onChange={(e) => setFormData(prev => ({ ...prev, uptime: e.target.value }))}
                    min="0"
                    max="1"
                    step="0.001"
                  />
                  <Input
                    label="Latency (ms)"
                    name="latency"
                    type="number"
                    value={formData.latency}
                    onChange={(e) => setFormData(prev => ({ ...prev, latency: e.target.value }))}
                    min="0"
                  />
                </div>
              </div>
            )}

            {activeTab === 'challenges' && (
              <div className="space-y-5">
                <Textarea
                  label="Challenges (one per line)"
                  name="challenges"
                  value={formData.challenges}
                  onChange={(e) => setFormData(prev => ({ ...prev, challenges: e.target.value }))}
                  placeholder="Challenge 1\nChallenge 2\nChallenge 3"
                  rows={4}
                />
                <Textarea
                  label="Solutions (one per line, matching challenges)"
                  name="solutions"
                  value={formData.solutions}
                  onChange={(e) => setFormData(prev => ({ ...prev, solutions: e.target.value }))}
                  placeholder="Solution 1\nSolution 2\nSolution 3"
                  rows={4}
                />
                <Textarea
                  label="Lessons Learned (one per line)"
                  name="lessons"
                  value={formData.lessons}
                  onChange={(e) => setFormData(prev => ({ ...prev, lessons: e.target.value }))}
                  placeholder="Lesson 1\nLesson 2"
                  rows={3}
                />
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4 border-t border-default sticky bottom-0 bg-secondary/90 backdrop-blur-sm">
              <Button type="button" variant="ghost" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button type="submit" loading={saving}>
                <Save className="h-5 w-5 mr-2" /> {editingProject ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}