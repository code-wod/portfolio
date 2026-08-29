'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash, GripVertical, Loader2, Save, X } from 'lucide-react';
import { Button } from '@/components/Common/Button';
import { Input } from '@/components/Common/Input';
import { Textarea } from '@/components/Common/Input';
import { Select } from '@/components/Common/Input';
import { Card } from '@/components/Common/Card';
import { Modal } from '@/components/Common/Modal';
import { cn } from '@/lib/utils';

interface TimelineEntry {
  _id: string;
  type: 'education' | 'experience';
  title: string;
  company: string;
  description: string;
  startDate: string;
  endDate?: string;
  position: number;
  skills: string[];
}

export default function AdminTimelinePage() {
  const [entries, setEntries] = useState<TimelineEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingEntry, setEditingEntry] = useState<TimelineEntry | null>(null);
  const [formData, setFormData] = useState({
    type: 'experience' as 'education' | 'experience',
    title: '',
    company: '',
    description: '',
    startDate: '',
    endDate: '',
    position: 1,
    skills: '',
  });

  useEffect(() => {
    fetch('/api/admin/timeline')
      .then(res => res.json())
      .then(data => {
        if (data.timeline) setEntries(data.timeline);
      })
      .finally(() => setLoading(false));
  }, []);

  const openCreateModal = () => {
    setEditingEntry(null);
    setFormData({ type: 'experience', title: '', company: '', description: '', startDate: '', endDate: '', position: entries.length + 1, skills: '' });
    setShowModal(true);
  };

  const openEditModal = (entry: TimelineEntry) => {
    setEditingEntry(entry);
    setFormData({
      type: entry.type,
      title: entry.title,
      company: entry.company,
      description: entry.description,
      startDate: entry.startDate.split('T')[0],
      endDate: entry.endDate ? entry.endDate.split('T')[0] : '',
      position: entry.position,
      skills: entry.skills.join(', '),
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const data = {
      ...formData,
      startDate: new Date(formData.startDate).toISOString(),
      endDate: formData.endDate ? new Date(formData.endDate).toISOString() : null,
      position: parseInt(formData.position as any),
      skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
    };

    try {
      const url = editingEntry ? `/api/admin/timeline/${editingEntry._id}` : '/api/admin/timeline';
      const method = editingEntry ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setShowModal(false);
        const refreshed = await fetch('/api/admin/timeline').then(r => r.json());
        if (refreshed.timeline) setEntries(refreshed.timeline);
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
    if (!confirm('Delete this entry?')) return;

    try {
      const res = await fetch(`/api/admin/timeline/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setEntries(prev => prev.filter(e => e._id !== id));
      } else {
        alert('Failed to delete');
      }
    } catch {
      alert('Failed to delete');
    }
  };

  const handleReorder = async (id: string, newPosition: number) => {
    const entry = entries.find(e => e._id === id);
    if (!entry) return;

    const updated = { ...entry, position: newPosition };
    try {
      const res = await fetch(`/api/admin/timeline/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: updated.type,
          title: updated.title,
          company: updated.company,
          description: updated.description,
          startDate: updated.startDate,
          endDate: updated.endDate,
          position: newPosition,
          skills: updated.skills,
        }),
      });
      if (res.ok) {
        const refreshed = await fetch('/api/admin/timeline').then(r => r.json());
        if (refreshed.timeline) setEntries(refreshed.timeline);
      }
    } catch {
      alert('Failed to reorder');
    }
  };

  const moveUp = (id: string) => {
    const index = entries.findIndex(e => e._id === id);
    if (index > 0) handleReorder(id, entries[index - 1].position);
  };

  const moveDown = (id: string) => {
    const index = entries.findIndex(e => e._id === id);
    if (index < entries.length - 1) handleReorder(id, entries[index + 1].position);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin text-accent" /></div>;
  }

  const sortedEntries = [...entries].sort((a, b) => a.position - b.position);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-primary">Timeline Manager</h1>
          <p className="text-secondary mt-1">Manage your education and work experience</p>
        </div>
        <Button onClick={openCreateModal}><Plus className="h-5 w-5 mr-2" /> Add Entry</Button>
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
                  <th className="p-4 text-xs font-medium text-tertiary uppercase tracking-wider">Type</th>
                  <th className="p-4 text-xs font-medium text-tertiary uppercase tracking-wider">Title</th>
                  <th className="p-4 text-xs font-medium text-tertiary uppercase tracking-wider">Company</th>
                  <th className="p-4 text-xs font-medium text-tertiary uppercase tracking-wider">Period</th>
                  <th className="p-4 text-xs font-medium text-tertiary uppercase tracking-wider w-60">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedEntries.map((entry, index) => (
                  <tr key={entry._id} className="border-b border-default/50 hover:bg-tertiary/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <GripVertical className="h-5 w-5 text-tertiary cursor-grab" />
                        <span className="font-medium text-primary">{entry.position}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={cn(
                        'px-2 py-1 text-xs font-medium rounded-full',
                        entry.type === 'education' ? 'bg-accent/10 text-accent' : 'bg-success/10 text-success'
                      )}>
                        {entry.type === 'education' ? 'Education' : 'Work'}
                      </span>
                    </td>
                    <td className="p-4 font-medium text-primary">{entry.title}</td>
                    <td className="p-4 text-secondary">{entry.company}</td>
                    <td className="p-4 text-secondary text-sm">
                      {new Date(entry.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      {' — '}
                      {entry.endDate ? new Date(entry.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => openEditModal(entry)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => moveUp(entry._id)} disabled={index === 0}>
                          <GripVertical className="h-4 w-4 rotate-90" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => moveDown(entry._id)} disabled={index === sortedEntries.length - 1}>
                          <GripVertical className="h-4 w-4 -rotate-90" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(entry._id)}>
                          <Trash className="h-4 w-4 text-error" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {entries.length === 0 && (
            <div className="p-12 text-center text-tertiary">
              <p>No timeline entries yet. Click "Add Entry" to create one.</p>
            </div>
          )}
        </Card>
      </motion.div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingEntry ? 'Edit Timeline Entry' : 'Add Timeline Entry'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <Select
            label="Type"
            name="type"
            value={formData.type}
            onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
            options={[
              { value: 'experience', label: 'Work Experience' },
              { value: 'education', label: 'Education' },
            ]}
            required
          />

          <Input
            label="Title"
            name="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Senior Developer"
            required
          />

          <Input
            label="Company / Institution"
            name="company"
            value={formData.company}
            onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
            placeholder="Scramble Apps"
            required
          />

          <Textarea
            label="Description"
            name="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe your role, achievements, technologies used..."
            rows={4}
            required
          />

          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="Start Date"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
              required
            />
            <Input
              label="End Date (optional)"
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="Position Order"
              name="position"
              type="number"
              value={formData.position}
              onChange={(e) => setFormData(prev => ({ ...prev, position: parseInt(e.target.value) }))}
              min="1"
              required
            />
            <Input
              label="Skills (comma-separated)"
              name="skills"
              value={formData.skills}
              onChange={(e) => setFormData(prev => ({ ...prev, skills: e.target.value }))}
              placeholder="Kotlin, Firebase, WebRTC"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-default">
            <Button type="button" variant="ghost" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button type="submit" loading={saving}>
              <Save className="h-5 w-5 mr-2" /> {editingEntry ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}