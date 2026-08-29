'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { Button } from '@/components/Common/Button';
import { Input } from '@/components/Common/Input';
import { Textarea } from '@/components/Common/Input';
import { Mail, Phone, MapPin, Link as LinkIcon, GitFork, Bird, Send, CheckCircle, AlertCircle, Loader2, Download } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone: string;
  company: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const validateForm = (data: FormData): FormErrors => {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = 'Name is required';
  if (!data.email.trim()) errors.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Invalid email format';
  if (!data.subject.trim()) errors.subject = 'Subject is required';
  if (!data.message.trim()) errors.message = 'Message is required';
  else if (data.message.trim().length < 10) errors.message = 'Message must be at least 10 characters';
  return errors;
};

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    phone: '',
    company: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage(data.message || 'Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '', phone: '', company: '' });
      } else {
        setSubmitStatus('error');
        setSubmitMessage(data.error || 'Failed to send message. Please try again.');
      }
    } catch {
      setSubmitStatus('error');
      setSubmitMessage('Network error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'dixit.appinnovator@gmail.com', href: 'mailto:dixit.appinnovator@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+91 9728643374', href: 'tel:+919728643374' },
    { icon: MapPin, label: 'Location', value: 'Mohali, Punjab, India', href: '#' },
  ];

  const socialLinks = [
    { icon: LinkIcon, label: 'LinkedIn', href: 'https://linkedin.com/in/dixitsaini2' },
    { icon: GitFork, label: 'GitHub', href: 'https://github.com/dixit' },
    { icon: Bird, label: 'Twitter', href: 'https://twitter.com/dixitsaini' },
    { icon: Mail, label: 'Email', href: 'mailto:dixit.appinnovator@gmail.com' },
  ];

  const availability = [
    { label: 'Available for Freelance' },
    { label: 'Available for Full-time' },
    { label: 'Available for Consulting' },
  ];

  return (
    <>
      <Header />
      <main className="flex-1 pt-16 lg:pt-0">
        <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <header className="text-center mb-12">
              <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-4">Get In Touch</h1>
              <p className="text-secondary text-lg max-w-2xl mx-auto">
                Have a project or opportunity? Let&apos;s talk!
              </p>
            </header>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              <div>
                <motion.form
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  noValidate
                >
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-success/10 border border-success/30 text-success rounded-lg p-4 flex items-start gap-3"
                      role="alert"
                    >
                      <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Message Received!</p>
                        <p className="text-sm mt-1">Thanks for reaching out. I&apos;ll respond within 24 hours.</p>
                      </div>
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-error/10 border border-error/30 text-error rounded-lg p-4 flex items-start gap-3"
                      role="alert"
                    >
                      <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Failed to Send</p>
                        <p className="text-sm mt-1">{submitMessage}</p>
                      </div>
                    </motion.div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-6">
                    <Input
                      label="Name *"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      error={errors.name}
                      required
                      disabled={isSubmitting || submitStatus === 'success'}
                    />
                    <Input
                      label="Email *"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      error={errors.email}
                      required
                      disabled={isSubmitting || submitStatus === 'success'}
                    />
                  </div>

                  <Input
                    label="Subject *"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What&apos;s this about?"
                    error={errors.subject}
                    required
                    disabled={isSubmitting || submitStatus === 'success'}
                  />

                  <Textarea
                    label="Message *"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message here..."
                    error={errors.message}
                    required
                    minLength={10}
                    rows={5}
                    disabled={isSubmitting || submitStatus === 'success'}
                  />

                  <div className="grid sm:grid-cols-2 gap-6">
                    <Input
                      label="Phone (optional)"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXXXXXXX"
                      disabled={isSubmitting || submitStatus === 'success'}
                    />
                    <Input
                      label="Company (optional)"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your company"
                      disabled={isSubmitting || submitStatus === 'success'}
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    loading={isSubmitting}
                    className="w-full sm:w-auto group"
                    disabled={submitStatus === 'success'}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Sending...
                      </>
                    ) : submitStatus === 'success' ? (
                      <>
                        <CheckCircle className="h-5 w-5" />
                        Sent Successfully
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                </motion.form>
              </div>

              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h3 className="text-xl font-bold text-primary mb-6">Contact Information</h3>
                  <div className="space-y-4">
                    {contactInfo.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        className="flex items-start gap-4 p-4 bg-secondary border border-default rounded-xl hover:border-accent/50 transition-colors"
                      >
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                          <item.icon className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-secondary">{item.label}</p>
                          <p className="text-primary mt-0.5">{item.value}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <h3 className="text-xl font-bold text-primary mb-4">Availability</h3>
                  <ul className="space-y-3">
                    {availability.map((item, index) => (
                      <li key={index} className="flex items-center gap-3 text-secondary">
                        <span className="h-2 w-2 rounded-full bg-success flex-shrink-0" />
                        {item.label}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <h3 className="text-xl font-bold text-primary mb-4">Connect</h3>
                  <div className="flex flex-wrap gap-3">
                    {socialLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <a
                          key={link.label}
                          href={link.href}
                          target={link.href.startsWith('http') ? '_blank' : undefined}
                          rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary border border-default text-secondary hover:border-accent/50 hover:text-accent transition-colors"
                        >
                          <Icon className="h-4 w-4" />
                          <span className="text-sm">{link.label}</span>
                        </a>
                      );
                    })}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="bg-tertiary/50 border border-default rounded-xl p-6"
                >
                  <h3 className="text-xl font-bold text-primary mb-3">Response Time</h3>
                  <div className="space-y-2 text-secondary">
                    <p>Typically respond within 24 hours</p>
                    <p>Usually faster on weekdays</p>
                  </div>
                  <Button variant="outline" className="mt-4" onClick={() => window.open('/resume.pdf', '_blank')}>
                    <Download className="h-4 w-4 mr-2" />
                    Download Resume (PDF)
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}