'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Loader2, Save, Image, X, CheckCircle } from 'lucide-react';
import { Button } from '@/components/Common/Button';
import { Input } from '@/components/Common/Input';
import { Textarea } from '@/components/Common/Input';
import { Card } from '@/components/Common/Card';
import { cn } from '@/lib/utils';

interface SocialLink {
  platform: string;
  url: string;
}

interface ProfileData {
  bio: string;
  email: string;
  phone: string;
  location: string;
  socialLinks: SocialLink[];
  availability: string[];
}

const platforms = ['linkedin', 'github', 'twitter', 'email', 'website'];

export default function AdminProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    bio: '',
    email: '',
    phone: '',
    location: '',
    socialLinks: [],
    availability: ['freelance', 'full-time', 'consulting'],
  });
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  useEffect(() => {
    fetch('/api/admin/profile')
      .then(res => res.json())
      .then(data => {
        if (data.profile) {
          setProfile(data.profile);
          if (data.profile.photoUrl) setPhotoPreview(data.profile.photoUrl);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'availability') {
      const select = e.target as HTMLSelectElement;
      const values = Array.from(select.selectedOptions).map(opt => opt.value);
      setProfile(prev => ({ ...prev, availability: values }));
    } else {
      setProfile(prev => ({ ...prev, [name]: value }));
    }
  };

  const addSocialLink = () => {
    setProfile(prev => ({ ...prev, socialLinks: [...prev.socialLinks, { platform: '', url: '' }] }));
  };

  const removeSocialLink = (index: number) => {
    setProfile(prev => ({ ...prev, socialLinks: prev.socialLinks.filter((_, i) => i !== index) }));
  };

  const updateSocialLink = (index: number, field: 'platform' | 'url', value: string) => {
    setProfile(prev => {
      const newLinks = [...prev.socialLinks];
      newLinks[index] = { ...newLinks[index], [field]: value };
      return { ...prev, socialLinks: newLinks };
    });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    try {
      const formData = new FormData();
      formData.append('bio', profile.bio);
      formData.append('email', profile.email);
      formData.append('phone', profile.phone);
      formData.append('location', profile.location);
      formData.append('socialLinks', JSON.stringify(profile.socialLinks));
      formData.append('availability', JSON.stringify(profile.availability));
      if (photoFile) formData.append('photo', photoFile);

      const res = await fetch('/api/admin/profile', {
        method: 'PUT',
        body: formData,
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to save');
      }
    } catch {
      alert('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold text-primary">Profile Settings</h1>
        <p className="text-secondary mt-1">Manage your public profile information</p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card variant="default" padding="lg">
            <h2 className="text-xl font-bold text-primary mb-6">Profile Photo</h2>
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-tertiary border border-default overflow-hidden flex items-center justify-center">
                  {photoPreview ? (
                    <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl font-bold text-accent">
                      {profile.email?.charAt(0).toUpperCase() || 'D'}
                    </span>
                  )}
                  {photoPreview && (
                    <button
                      type="button"
                      onClick={() => { setPhotoPreview(null); setPhotoFile(null); }}
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-error text-white flex items-center justify-center text-xs hover:bg-error/90"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
              <div className="flex-1">
                <label className="btn-secondary">
                  <Input className="h-10" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    aria-label="Upload profile photo"
                  />
                  <Image className="h-5 w-5" />
                  Upload Photo
                </label>
                <p className="text-sm text-tertiary mt-2">Recommended: 400x400px, max 2MB</p>
              </div>
            </div>
          </Card>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <Card variant="default" padding="lg">
            <h2 className="text-xl font-bold text-primary mb-6">Bio</h2>
            <Textarea
              label="Professional Bio"
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              placeholder="Tell visitors about yourself, your experience, and what you do..."
              rows={6}
              hint="Markdown supported"
            />
          </Card>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card variant="default" padding="lg">
            <h2 className="text-xl font-bold text-primary mb-6">Contact Information</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <Input
                label="Email"
                name="email"
                type="email"
                value={profile.email}
                onChange={handleChange}
                placeholder="dixit.appinnovator@gmail.com"
                required
              />
              <Input
                label="Phone"
                name="phone"
                type="tel"
                value={profile.phone}
                onChange={handleChange}
                placeholder="+91 9728643374"
              />
              <Input
                label="Location"
                name="location"
                value={profile.location}
                onChange={handleChange}
                placeholder="Mohali, Punjab, India"
              />
            </div>
          </Card>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
        >
          <Card variant="default" padding="lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-primary">Social Links</h2>
              <button type="button" onClick={addSocialLink} className="btn-secondary text-sm">
                <Plus className="h-4 w-4 mr-1" /> Add Link
              </button>
            </div>
            <div className="space-y-4">
              {profile.socialLinks.map((link, index) => (
                <div key={index} className="flex gap-3 items-start">
                  <select
                    name={`socialLinks[${index}].platform`}
                    value={link.platform}
                    onChange={(e) => updateSocialLink(index, 'platform', e.target.value)}
                    className="w-36 px-3 py-2 rounded-lg border border-default bg-primary text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="">Select Platform</option>
                    {platforms.map(p => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
                  </select>
                  <Input
                    name={`socialLinks[${index}].url`}
                    value={link.url}
                    onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                    placeholder="https://..."
                    className="flex-1"
                  />
                  <button
                    type="button"
                    onClick={() => removeSocialLink(index)}
                    className="p-2 rounded-lg text-tertiary hover:text-error hover:bg-error/10 transition-colors"
                    aria-label="Remove link"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
              {profile.socialLinks.length === 0 && (
                <p className="text-tertiary text-center py-4">No social links added yet</p>
              )}
            </div>
          </Card>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Card variant="default" padding="lg">
            <h2 className="text-xl font-bold text-primary mb-6">Availability</h2>
            <div className="flex flex-wrap gap-3">
              {['freelance', 'full-time', 'consulting'].map(opt => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="availability"
                    value={opt}
                    checked={profile.availability.includes(opt)}
                    onChange={handleChange as any}
                    className="w-4 h-4 rounded border-default text-accent focus:ring-accent"
                  />
                  <span className="capitalize">{opt}</span>
                </label>
              ))}
            </div>
          </Card>
        </motion.section>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="flex items-center justify-end gap-4"
        >
          <Button type="button" variant="ghost" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" loading={saving}>
            {saved ? (
              <>
                <CheckCircle className="h-5 w-5" />
                Saved
              </>
            ) : (
              <>
                <Save className="h-5 w-5" />
                Save Changes
              </>
            )}
          </Button>
        </motion.div>
      </form>
    </div>
  );
}