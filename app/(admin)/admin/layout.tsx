'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { LayoutDashboard, User, Clock, Code, FolderKanban, FileText, Mail, BarChart2, Settings, LogOut, Menu, X, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

const adminNavItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/profile', label: 'Profile', icon: User },
  { href: '/admin/timeline', label: 'Timeline', icon: Clock },
  { href: '/admin/skills', label: 'Skills', icon: Code },
  { href: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { href: '/admin/blog', label: 'Blog', icon: FileText },
  { href: '/admin/inbox', label: 'Inbox', icon: Mail },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart2 },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-primary flex">
      <aside
        id="admin-sidebar"
        className={cn(
          'fixed lg:static inset-y-0 left-0 z-40 bg-secondary border-r border-default transition-all duration-300 flex flex-col',
          sidebarCollapsed ? 'w-16' : 'w-64',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
        aria-label="Admin navigation"
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-default">
          {!sidebarCollapsed && (
            <Link href="/admin/dashboard" className="flex items-center gap-2 text-xl font-bold text-primary">
              <span className="text-accent">DS</span>
              <span>Admin</span>
            </Link>
          )}
          <button
            className={cn('p-2 rounded-lg text-tertiary hover:text-primary hover:bg-tertiary transition-colors lg:hidden', sidebarCollapsed && 'hidden')}
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto" aria-label="Admin sections">
          {adminNavItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  'whitespace-nowrap overflow-hidden',
                  isActive
                    ? 'bg-accent/10 text-accent'
                    : 'text-secondary hover:text-primary hover:bg-tertiary',
                  sidebarCollapsed && 'justify-center'
                )}
                aria-current={isActive ? 'page' : undefined}
                title={sidebarCollapsed ? item.label : undefined}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-default">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
              <span className="text-accent font-bold text-sm">
                {session?.user?.email?.charAt(0).toUpperCase() || 'D'}
              </span>
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0 overflow-hidden">
                <p className="text-sm font-medium text-primary truncate">{session?.user?.email}</p>
                <p className="text-xs text-tertiary truncate">Administrator</p>
              </div>
            )}
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-secondary hover:text-error hover:bg-error/10 transition-colors',
              sidebarCollapsed && 'justify-center'
            )}
            title={sidebarCollapsed ? 'Logout' : undefined}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
            {!sidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 lg:ml-0">
        <header className="fixed top-0 right-0 left-0 lg:left-64 z-30 h-16 bg-primary/90 backdrop-blur-md border-b border-default flex items-center justify-between px-4 lg:px-8 transition-all duration-300">
          <button
            className="lg:hidden p-2 rounded-lg text-secondary hover:text-primary hover:bg-tertiary transition-colors"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
            aria-expanded={sidebarOpen}
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex items-center gap-4 ml-auto">
            <Link
              href="/"
              target="_blank"
              className="p-2 rounded-lg text-tertiary hover:text-accent hover:bg-tertiary transition-colors"
              aria-label="View portfolio"
            >
              <ExternalLink className="h-5 w-5" />
            </Link>
          </div>
        </header>

        <main className="flex-1 pt-20 lg:pt-20 px-4 lg:px-8 pb-8">
          {children}
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}