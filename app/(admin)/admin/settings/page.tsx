'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Save, Key, Shield, Bell, Palette, Database, Globe, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/Common/Button';
import { Input } from '@/components/Common/Input';
import { Card } from '@/components/Common/Card';
import { cn } from '@/lib/utils';

interface SettingsData {
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  adminEmail: string;
  notifications: boolean;
  maintenanceMode: boolean;
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
}

const defaultSettings: SettingsData = {
  siteName: 'Dixit Saini Portfolio',
  siteDescription: 'Senior Android Developer with 3+ years of experience',
  siteUrl: 'https://dixitsaini.dev',
  adminEmail: 'dixit.appinnovator@gmail.com',
  notifications: true,
  maintenanceMode: false,
  theme: 'system',
  language: 'en',
  timezone: 'Asia/Kolkata',
};

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'appearance' | 'notifications' | 'security' | 'advanced'>('general');
  const [settings, setSettings] = useState<SettingsData>(defaultSettings);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setSettings(prev => ({ ...prev, [name]: newValue }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'advanced', label: 'Advanced', icon: Database },
  ];

  return (
    <div className="space-y-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold text-primary">Settings</h1>
        <p className="text-secondary mt-1">Manage your portfolio configuration</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="flex border-b border-default mb-6" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                'px-4 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2',
                activeTab === tab.id
                  ? 'border-accent text-accent'
                  : 'border-transparent text-tertiary hover:text-primary hover:border-default'
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {activeTab === 'general' && (
            <div className="space-y-6 animate-fade-in">
              <Card variant="default" padding="lg">
                <h2 className="text-xl font-bold text-primary mb-6">Site Information</h2>
                <div className="space-y-5">
                  <Input
                    label="Site Name"
                    name="siteName"
                    value={settings.siteName}
                    onChange={handleChange}
                    placeholder="Dixit Saini Portfolio"
                    required
                  />
                  <Textarea
                    label="Site Description"
                    name="siteDescription"
                    value={settings.siteDescription}
                    onChange={handleChange}
                    placeholder="Brief description for SEO and social sharing"
                    rows={3}
                  />
                  <Input
                    label="Site URL"
                    name="siteUrl"
                    type="url"
                    value={settings.siteUrl}
                    onChange={handleChange}
                    placeholder="https://dixitsaini.dev"
                    required
                  />
                  <Input
                    label="Admin Email"
                    name="adminEmail"
                    type="email"
                    value={settings.adminEmail}
                    onChange={handleChange}
                    placeholder="dixit.appinnovator@gmail.com"
                    required
                  />
                </div>
              </Card>

              <Card variant="default" padding="lg">
                <h2 className="text-xl font-bold text-primary mb-6">Site Status</h2>
                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="maintenanceMode"
                      checked={settings.maintenanceMode}
                      onChange={handleChange}
                      className="w-5 h-5 rounded border-default text-accent focus:ring-accent"
                    />
                    <div>
                      <p className="font-medium text-primary">Maintenance Mode</p>
                      <p className="text-sm text-tertiary">Show maintenance page to visitors (admins still have access)</p>
                    </div>
                  </label>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-6 animate-fade-in">
              <Card variant="default" padding="lg">
                <h2 className="text-xl font-bold text-primary mb-6">Theme Settings</h2>
                <div className="space-y-5">
                  <Select
                    label="Default Theme"
                    name="theme"
                    value={settings.theme}
                    onChange={handleChange}
                    options={[
                      { value: 'system', label: 'System Preference' },
                      { value: 'light', label: 'Light Only' },
                      { value: 'dark', label: 'Dark Only' },
                    ]}
                  />
                </div>
              </Card>

              <Card variant="default" padding="lg">
                <h2 className="text-xl font-bold text-primary mb-6">Language & Localization</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Select
                    label="Language"
                    name="language"
                    value={settings.language}
                    onChange={handleChange}
                    options={[
                      { value: 'en', label: 'English' },
                      { value: 'hi', label: 'Hindi' },
                      { value: 'es', label: 'Spanish' },
                    ]}
                  />
                  <Select
                    label="Timezone"
                    name="timezone"
                    value={settings.timezone}
                    onChange={handleChange}
                    options={[
                      { value: 'Asia/Kolkata', label: 'IST (UTC+5:30)' },
                      { value: 'UTC', label: 'UTC' },
                      { value: 'America/New_York', label: 'EST (UTC-5)' },
                      { value: 'Europe/London', label: 'GMT (UTC+0)' },
                    ]}
                  />
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6 animate-fade-in">
              <Card variant="default" padding="lg">
                <h2 className="text-xl font-bold text-primary mb-6">Email Notifications</h2>
                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="notifications"
                      checked={settings.notifications}
                      onChange={handleChange}
                      className="w-5 h-5 rounded border-default text-accent focus:ring-accent"
                    />
                    <div>
                      <p className="font-medium text-primary">Enable Email Notifications</p>
                      <p className="text-sm text-tertiary">Receive emails for new contact form submissions, comments, etc.</p>
                    </div>
                  </label>
                  <p className="text-sm text-tertiary ml-8">
                    Additional notification options will be available after email service integration.
                  </p>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6 animate-fade-in">
              <Card variant="default" padding="lg">
                <h2 className="text-xl font-bold text-primary mb-6">Change Password</h2>
                <div className="space-y-5">
                  <Input
                    label="Current Password"
                    name="currentPassword"
                    type="password"
                    placeholder="Enter current password"
                    required
                  />
                  <Input
                    label="New Password"
                    name="newPassword"
                    type="password"
                    placeholder="Enter new password (min 8 characters)"
                    required
                  />
                  <Input
                    label="Confirm New Password"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm new password"
                    required
                  />
                </div>
              </Card>

              <Card variant="default" padding="lg" className="border-warning/30">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-6 w-6 text-warning flex-shrink-0" />
                  <div>
                    <p className="font-medium text-primary">Two-Factor Authentication</p>
                    <p className="text-sm text-tertiary">2FA is not yet configured. Enable it for enhanced security.</p>
                  </div>
                </div>
              </Card>

              <Card variant="default" padding="lg">
                <h2 className="text-xl font-bold text-primary mb-6">API Keys</h2>
                <div className="space-y-4">
                  <p className="text-sm text-tertiary">Manage your third-party service API keys.</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      label="Cloudinary Cloud Name"
                      name="cloudinaryCloudName"
                      type="password"
                      placeholder="••••••••"
                    />
                    <Input
                      label="Cloudinary API Key"
                      name="cloudinaryApiKey"
                      type="password"
                      placeholder="••••••••"
                    />
                    <Input
                      label="Cloudinary API Secret"
                      name="cloudinaryApiSecret"
                      type="password"
                      placeholder="••••••••"
                    />
                    <Input
                      label="MongoDB URI"
                      name="mongodbUri"
                      type="password"
                      placeholder="••••••••"
                    />
                  </div>
                  <p className="text-xs text-tertiary">Keys are masked for security. Enter new values to update.</p>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'advanced' && (
            <div className="space-y-6 animate-fade-in">
              <Card variant="default" padding="lg" className="border-error/30">
                <h2 className="text-xl font-bold text-primary mb-6">Danger Zone</h2>
                <div className="space-y-6">
                  <div className="p-4 bg-error/5 border border-error/20 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-error">Clear All Analytics Data</p>
                        <p className="text-sm text-tertiary">Permanently delete all visitor analytics and tracking data.</p>
                      </div>
                      <Button variant="outline" className="text-error border-error hover:bg-error/10">
                        Clear Data
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 bg-error/5 border border-error/20 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-error">Reset to Defaults</p>
                        <p className="text-sm text-tertiary">Reset all settings to their default values.</p>
                      </div>
                      <Button variant="outline" className="text-error border-error hover:bg-error/10">
                        Reset Settings
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 bg-error/5 border border-error/20 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-error">Delete Account</p>
                        <p className="text-sm text-tertiary">Permanently delete your admin account and all data. This action cannot be undone.</p>
                      </div>
                      <Button variant="outline" className="text-error border-error hover:bg-error/10">
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              <Card variant="default" padding="lg">
                <h2 className="text-xl font-bold text-primary mb-6">System Information</h2>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-tertiary/30 rounded-lg">
                    <p className="text-tertiary">Next.js Version</p>
                    <p className="font-mono text-primary">16.3.3</p>
                  </div>
                  <div className="p-3 bg-tertiary/30 rounded-lg">
                    <p className="text-tertiary">React Version</p>
                    <p className="font-mono text-primary">19.2.8</p>
                  </div>
                  <div className="p-3 bg-tertiary/30 rounded-lg">
                    <p className="text-tertiary">Node.js Version</p>
                    <p className="font-mono text-primary">18+</p>
                  </div>
                  <div className="p-3 bg-tertiary/30 rounded-lg">
                    <p className="text-tertiary">Database</p>
                    <p className="font-mono text-primary">MongoDB Atlas</p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-end gap-3 pt-6 border-t border-default"
          >
            <Button type="button" variant="ghost" onClick={() => window.location.reload()}>
              Discard Changes
            </Button>
            <Button type="submit" loading={saving}>
              {saved ? (
                <>
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Saved
                </>
              ) : (
                <>
                  <Save className="h-5 w-5 mr-2" />
                  Save Settings
                </>
              )}
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { label, error, hint, className, ...rest } = props;
  const id = `textarea-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-primary mb-1.5">
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={cn(
          'w-full rounded-md border bg-primary text-primary placeholder:text-tertiary',
          'transition-colors duration-200 resize-none',
          'focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'p-4 text-base min-h-[100px]',
          error ? 'border-error focus:ring-error' : 'border-default hover:border-text-tertiary',
          className
        )}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? errorId : hint ? hintId : undefined}
        {...rest}
      />
      {error && <p id={errorId} className="mt-1.5 text-sm text-error" role="alert">{error}</p>}
      {hint && !error && <p id={hintId} className="mt-1.5 text-sm text-tertiary">{hint}</p>}
    </div>
  );
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement> & { options: { value: string; label: string }[] }) {
  const { label, options, error, className, ...rest } = props;
  const id = `select-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = `${id}-error`;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-primary mb-1.5">
          {label}
        </label>
      )}
      <select
        id={id}
        className={cn(
          'w-full rounded-md border bg-primary text-primary',
          'transition-colors duration-200',
          'focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'pl-4 pr-10 py-2.5 text-base appearance-none',
          'bg-[url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3E%3Cpath stroke=\'%23666666\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3E%3C/svg%3E")] bg-right-3 bg-center bg-no-repeat',
          error ? 'border-error focus:ring-error' : 'border-default hover:border-text-tertiary',
          className
        )}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? errorId : undefined}
        {...rest}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      {error && <p id={errorId} className="mt-1.5 text-sm text-error" role="alert">{error}</p>}
    </div>
  );
}