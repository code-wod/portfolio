'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash, Loader2, Save, Search, Filter, ChevronDown } from 'lucide-react';
import { Button } from '@/components/Common/Button';
import { Input } from '@/components/Common/Input';
import { Select } from '@/components/Common/Input';
import { Card } from '@/components/Common/Card';
import { Modal } from '@/components/Common/Modal';
import { cn } from '@/lib/utils';

interface Skill {
  _id: string;
  name: string;
  category: string;
  proficiency: number;
  yearsOfExperience: number;
  description: string;
  icon: string;
  color: string;
  order: number;
}

const categories = [
  'Android & Mobile Development',
  'Networking & Real-Time',
  'Databases & Storage',
  'Architecture & Design',
  'Build & DevOps',
  'Advanced Concepts',
];

const icons = ['⚡', '🎨', '🎯', '📐', '🧭', '📋', '📦', '📄', '🌐', '🔗', '📞', '🔥', '💬', '🔌', '☁️', '🗄️', '💾', '🔄', '🏗️', '🧼', '🧩', '✂️', '🐘', '💉', '🧪', '📝', '🔄', '🚀', '🧵', '🧠'];

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Android & Mobile Development',
    proficiency: 5,
    yearsOfExperience: 3,
    description: '',
    icon: '⚡',
    color: '#7F52FF',
    order: 1,
  });

  useEffect(() => {
    fetch('/api/admin/skills')
      .then(res => res.json())
      .then(data => {
        if (data.skills) setSkills(data.skills);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         skill.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || skill.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const openCreateModal = () => {
    setEditingSkill(null);
    setFormData({ name: '', category: 'Android & Mobile Development', proficiency: 5, yearsOfExperience: 3, description: '', icon: '⚡', color: '#7F52FF', order: skills.length + 1 });
    setShowModal(true);
  };

  const openEditModal = (skill: Skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      category: skill.category,
      proficiency: skill.proficiency,
      yearsOfExperience: skill.yearsOfExperience,
      description: skill.description,
      icon: skill.icon,
      color: skill.color,
      order: skill.order,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const data = {
      ...formData,
      proficiency: parseInt(formData.proficiency as any),
      yearsOfExperience: parseInt(formData.yearsOfExperience as any),
      order: parseInt(formData.order as any),
    };

    try {
      const url = editingSkill ? `/api/admin/skills/${editingSkill._id}` : '/api/admin/skills';
      const method = editingSkill ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setShowModal(false);
        const refreshed = await fetch('/api/admin/skills').then(r => r.json());
        if (refreshed.skills) setSkills(refreshed.skills);
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
    if (!confirm('Delete this skill?')) return;

    try {
      const res = await fetch(`/api/admin/skills/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setSkills(prev => prev.filter(s => s._id !== id));
      } else {
        alert('Failed to delete');
      }
    } catch {
      alert('Failed to delete');
    }
  };

  const renderStars = (rating: number) => (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={i < rating ? 'text-warning' : 'text-tertiary'} aria-hidden="true">★</span>
      ))}
    </div>
  );

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
          <h1 className="text-3xl font-bold text-primary">Skills Manager</h1>
          <p className="text-secondary mt-1">Manage your technical skills and expertise</p>
        </div>
        <Button onClick={openCreateModal}><Plus className="h-5 w-5 mr-2" /> Add Skill</Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-tertiary" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skills..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-default bg-primary text-primary placeholder:text-tertiary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          />
        </div>
        <div className="relative">
          <button
            onClick={() => setShowCategoryFilter(!showCategoryFilter)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-default bg-primary text-primary hover:border-accent/50 transition-colors"
          >
            <Filter className="h-5 w-5" />
            <span>{categoryFilter}</span>
            <ChevronDown className={cn('h-4 w-4 transition-transform', showCategoryFilter && 'rotate-180')} />
          </button>
          {showCategoryFilter && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-secondary border border-default rounded-lg shadow-xl py-2 z-20">
              {['All', ...categories].map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setCategoryFilter(cat); setShowCategoryFilter(false); }}
                  className={cn('w-full px-4 py-2 text-left text-sm transition-colors', categoryFilter === cat ? 'bg-accent/10 text-accent' : 'text-secondary hover:text-primary hover:bg-tertiary')}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        <Card variant="default" padding="none">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-default text-left">
                  <th className="p-4 text-xs font-medium text-tertiary uppercase tracking-wider">Icon</th>
                  <th className="p-4 text-xs font-medium text-tertiary uppercase tracking-wider">Name</th>
                  <th className="p-4 text-xs font-medium text-tertiary uppercase tracking-wider">Category</th>
                  <th className="p-4 text-xs font-medium text-tertiary uppercase tracking-wider">Proficiency</th>
                  <th className="p-4 text-xs font-medium text-tertiary uppercase tracking-wider">Years</th>
                  <th className="p-4 text-xs font-medium text-tertiary uppercase tracking-wider w-40">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSkills.map((skill) => (
                  <tr key={skill._id} className="border-b border-default/50 hover:bg-tertiary/30 transition-colors">
                    <td className="p-4">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl" style={{ backgroundColor: `${skill.color}20`, color: skill.color }}>
                        {skill.icon}
                      </div>
                    </td>
                    <td className="p-4 font-medium text-primary">{skill.name}</td>
                    <td className="p-4 text-secondary text-sm">{skill.category}</td>
                    <td className="p-4">{renderStars(skill.proficiency)}</td>
                    <td className="p-4 text-secondary">{skill.yearsOfExperience}+</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => openEditModal(skill)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(skill._id)}>
                          <Trash className="h-4 w-4 text-error" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredSkills.length === 0 && (
            <div className="p-12 text-center text-tertiary">
              <p>No skills found. Click "Add Skill" to create one.</p>
            </div>
          )}
        </Card>
      </motion.div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingSkill ? 'Edit Skill' : 'Add Skill'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Skill Name"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Kotlin"
            required
          />

          <Select
            label="Category"
            name="category"
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
            options={categories.map(c => ({ value: c, label: c }))}
            required
          />

          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="Proficiency (1-5)"
              name="proficiency"
              type="number"
              value={formData.proficiency}
              onChange={(e) => setFormData(prev => ({ ...prev, proficiency: parseInt(e.target.value) }))}
              min="1"
              max="5"
              required
            />
            <Input
              label="Years of Experience"
              name="yearsOfExperience"
              type="number"
              value={formData.yearsOfExperience}
              onChange={(e) => setFormData(prev => ({ ...prev, yearsOfExperience: parseInt(e.target.value) }))}
              min="0"
              required
            />
          </div>

          <Input
            label="Icon"
            name="icon"
            value={formData.icon}
            onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
            placeholder="⚡"
            required
          />

          <Input
            label="Color (Hex)"
            name="color"
            type="color"
            value={formData.color}
            onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
            required
          />

          <Input
            label="Display Order"
            name="order"
            type="number"
            value={formData.order}
            onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) }))}
            min="1"
            required
          />

          <Textarea
            label="Description"
            name="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Brief description of your expertise with this skill"
            rows={3}
            required
          />

          <div className="flex justify-end gap-3 pt-4 border-t border-default">
            <Button type="button" variant="ghost" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button type="submit" loading={saving}>
              <Save className="h-5 w-5 mr-2" /> {editingSkill ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}