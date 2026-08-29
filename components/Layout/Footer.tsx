'use client';

import Link from 'next/link';
import { GitFork, Link as LinkIcon, Bird, Mail, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

const footerLinks = {
  quick: [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/skills', label: 'Skills' },
    { href: '/projects', label: 'Projects' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ],
  social: [
    { href: 'https://linkedin.com/in/dixitsaini2', label: 'LinkedIn', icon: LinkIcon, external: true },
    { href: 'https://github.com/dixit', label: 'GitHub', icon: GitFork, external: true },
    { href: 'https://twitter.com/dixitsaini', label: 'Twitter', icon: Bird, external: true },
    { href: 'mailto:dixit.appinnovator@gmail.com', label: 'Email', icon: Mail, external: true },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary border-t border-default" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary mb-4">
              <span className="text-accent">DS</span>
              <span>Dixit Saini</span>
            </Link>
            <p className="text-secondary text-sm leading-relaxed mb-6">
              Senior Android Developer with 3+ years of experience building
              scalable mobile applications. Passionate about clean architecture,
              real-time systems, and great user experiences.
            </p>
            <div className="flex items-center gap-1 text-sm text-tertiary">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span>Mohali, Punjab, India</span>
            </div>
          </div>

          <nav aria-label="Quick links">
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {footerLinks.quick.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-secondary hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Social links">
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
              Connect
            </h3>
            <ul className="space-y-3">
              {footerLinks.social.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-2 text-sm text-secondary hover:text-accent transition-colors"
                      aria-label={link.label}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div>
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
              Availability
            </h3>
            <ul className="space-y-3 text-sm text-secondary">
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-success" aria-hidden="true" />
                Available for Freelance
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-success" aria-hidden="true" />
                Available for Full-time
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-success" aria-hidden="true" />
                Available for Consulting
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-default">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-tertiary text-center md:text-left">
              © {currentYear} Dixit Saini. All rights reserved.
            </p>
            <p className="text-sm text-tertiary text-center md:text-right">
              Built with Next.js, TypeScript & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}