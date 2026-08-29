'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  User,
  GitBranch,
  Code,
  FolderKanban,
  FileText,
  Mail,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Button } from '@/components/Common';

const adminNavItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/profile', label: 'Profile', icon: User },
  { href: '/admin/timeline', label: 'Timeline', icon: GitBranch },
  { href: '/admin/skills', label: 'Skills', icon: Code },
  { href: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { href: '/admin/blog', label: 'Blog', icon: FileText },
  { href: '/admin/inbox', label: 'Inbox', icon: Mail },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-full bg-secondary border-r border-default transition-all duration-300',
        collapsed ? 'w-20' : 'w-64'
      )}
      aria-label="Admin sidebar"
    >
      <div className="flex flex-col h-full">
        <div className={cn('flex items-center justify-between h-16 px-4 border-b border-default', collapsed && 'justify-center')}>
          {!collapsed && (
            <Link href="/admin/dashboard" className="flex items-center gap-2 text-xl font-bold text-primary">
              <span className="text-accent">DS</span>
              <span>Admin</span>
            </Link>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="h-8 w-8 p-0"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1" aria-label="Admin navigation">
          {adminNavItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  'relative overflow-hidden',
                  isActive
                    ? 'bg-accent/10 text-accent'
                    : 'text-secondary hover:text-primary hover:bg-tertiary',
                  collapsed && 'justify-center px-2'
                )}
                aria-current={isActive ? 'page' : undefined}
                title={collapsed ? item.label : undefined}
              >
                <item.icon className={cn('h-5 w-5 flex-shrink-0', isActive && 'text-accent')} aria-hidden="true" />
                {!collapsed && <span>{item.label}</span>}
                {isActive && !collapsed && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-0.5 bg-accent rounded-r-full" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-default">
          <Link
            href="/"
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-secondary hover:text-primary hover:bg-tertiary transition-colors',
              collapsed && 'justify-center px-2'
            )}
            title={collapsed ? 'View Portfolio' : undefined}
          >
            <LayoutDashboard className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
            {!collapsed && <span>View Portfolio</span>}
          </Link>
        </div>

        <div className="p-4 border-t border-default">
          <form action="/api/auth/logout" method="POST">
            <button
              type="submit"
              className={cn(
                'flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-secondary hover:text-error hover:bg-error/10 transition-colors',
                collapsed && 'justify-center px-2'
              )}
              title={collapsed ? 'Logout' : undefined}
            >
              <LogOut className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              {!collapsed && <span>Logout</span>}
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}