'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Mail, Eye, Archive, Trash2, Reply, Search, Filter, ChevronDown, Check, X } from 'lucide-react';
import { Button } from '@/components/Common/Button';
import { Card } from '@/components/Common/Card';
import { Modal } from '@/components/Common/Modal';
import { cn } from '@/lib/utils';

interface Message {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  company?: string;
  read: boolean;
  archived: boolean;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

export default function AdminInboxPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [readFilter, setReadFilter] = useState<'all' | 'read' | 'unread'>('all');
  const [archivedFilter, setArchivedFilter] = useState<'all' | 'archived' | 'active'>('active');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showModal, setShowModal] = useState(false);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        ...(readFilter !== 'all' && { read: readFilter }),
        ...(archivedFilter !== 'all' && { archived: archivedFilter === 'archived' ? 'true' : 'false' }),
        ...(searchQuery && { search: searchQuery }),
      });
      const res = await fetch(`/api/admin/messages?${params}`);
      const data = await res.json();
      if (data.messages) setMessages(data.messages);
      if (data.unreadCount !== undefined) setUnreadCount(data.unreadCount);
      if (data.pagination) setTotalPages(data.pagination.totalPages);
    } catch {
      console.error('Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [page, readFilter, archivedFilter, searchQuery]);

  const handleAction = async (id: string, action: 'read' | 'unread' | 'archive' | 'unarchive' | 'delete') => {
    try {
      let updates: any = {};
      if (action === 'read') updates = { read: true };
      else if (action === 'unread') updates = { read: false };
      else if (action === 'archive') updates = { archived: true };
      else if (action === 'unarchive') updates = { archived: false };
      else if (action === 'delete') {
        if (!confirm('Delete this message permanently?')) return;
        const res = await fetch(`/api/admin/messages/${id}`, { method: 'DELETE' });
        if (res.ok) {
          setMessages(prev => prev.filter(m => m._id !== id));
          fetchMessages();
        }
        return;
      }

      const res = await fetch(`/api/admin/messages/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      if (res.ok) {
        setMessages(prev => prev.map(m => m._id === id ? { ...m, ...updates } : m));
        fetchMessages();
      }
    } catch {
      alert('Failed to update');
    }
  };

  const openMessage = (message: Message) => {
    if (!message.read) handleAction(message._id, 'read');
    setSelectedMessage(message);
    setShowModal(true);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
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
          <h1 className="text-3xl font-bold text-primary">Inbox</h1>
          <p className="text-secondary mt-1">
            {messages.length} messages {unreadCount > 0 && <span className="text-accent">({unreadCount} unread)</span>}
          </p>
        </div>
        <div className="flex gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-tertiary" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
              placeholder="Search messages..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-default bg-primary text-primary placeholder:text-tertiary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-default bg-primary text-primary hover:border-accent/50 transition-colors"
          >
            <Filter className="h-5 w-5" />
            Filters
            <ChevronDown className={cn('h-4 w-4 transition-transform', showFilters && 'rotate-180')} />
          </button>
        </div>
      </motion.div>

      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="p-4 bg-secondary border border-default rounded-xl space-y-4"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <Select
              label="Read Status"
              value={readFilter}
              onChange={(e) => { setReadFilter(e.target.value as any); setPage(1); }}
              options={[
                { value: 'all', label: 'All' },
                { value: 'unread', label: 'Unread' },
                { value: 'read', label: 'Read' },
              ]}
            />
            <Select
              label="Archive Status"
              value={archivedFilter}
              onChange={(e) => { setArchivedFilter(e.target.value as any); setPage(1); }}
              options={[
                { value: 'active', label: 'Active' },
                { value: 'archived', label: 'Archived' },
                { value: 'all', label: 'All' },
              ]}
            />
          </div>
        </motion.div>
      )}

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
                  <th className="p-4 text-xs font-medium text-tertiary uppercase tracking-wider w-10"></th>
                  <th className="p-4 text-xs font-medium text-tertiary uppercase tracking-wider">From</th>
                  <th className="p-4 text-xs font-medium text-tertiary uppercase tracking-wider">Subject</th>
                  <th className="p-4 text-xs font-medium text-tertiary uppercase tracking-wider">Date</th>
                  <th className="p-4 text-xs font-medium text-tertiary uppercase tracking-wider w-48">Actions</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((message) => (
                  <tr
                    key={message._id}
                    className={cn(
                      'border-b border-default/50 transition-colors cursor-pointer',
                      !message.read ? 'bg-accent/5' : 'hover:bg-tertiary/30'
                    )}
                    onClick={() => openMessage(message)}
                  >
                    <td className="p-4">
                      {!message.read && (
                        <span className="w-2 h-2 rounded-full bg-accent" />
                      )}
                    </td>
                    <td className="p-4">
                      <p className={cn('font-medium', !message.read ? 'text-primary' : 'text-secondary')}>
                        {message.name}
                      </p>
                      <p className="text-sm text-tertiary truncate max-w-xs">{message.email}</p>
                    </td>
                    <td className="p-4">
                      <p className={cn('truncate max-w-md', !message.read ? 'font-medium text-primary' : 'text-secondary')}>
                        {message.subject}
                      </p>
                    </td>
                    <td className="p-4 text-secondary text-sm whitespace-nowrap">
                      {formatDate(message.createdAt)}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); handleAction(message._id, message.read ? 'unread' : 'read'); }}>
                          {message.read ? <X className="h-4 w-4" /> : <Check className="h-4 w-4 text-success" />}
                        </Button>
                        <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); handleAction(message._id, message.archived ? 'unarchive' : 'archive'); }}>
                          {message.archived ? <X className="h-4 w-4" /> : <Archive className="h-4 w-4" />}
                        </Button>
                        <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); handleAction(message._id, 'delete'); }}>
                          <Trash2 className="h-4 w-4 text-error" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {messages.length === 0 && (
            <div className="p-12 text-center text-tertiary">
              <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No messages found</p>
            </div>
          )}
        </Card>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <Button variant="ghost" size="sm" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
              <ChevronDown className="h-4 w-4 rotate-180" />
            </Button>
            <span className="text-secondary">Page {page} of {totalPages}</span>
            <Button variant="ghost" size="sm" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        )}
      </motion.div>

      <Modal
        isOpen={showModal}
        onClose={() => { setShowModal(false); setSelectedMessage(null); }}
        title={selectedMessage?.subject}
        size="lg"
      >
        {selectedMessage && (
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-tertiary">From</p>
                <p className="font-medium text-primary">{selectedMessage.name}</p>
              </div>
              <div>
                <p className="text-tertiary">Email</p>
                <p className="text-secondary">{selectedMessage.email}</p>
              </div>
              {selectedMessage.phone && (
                <div>
                  <p className="text-tertiary">Phone</p>
                  <p className="text-secondary">{selectedMessage.phone}</p>
                </div>
              )}
              {selectedMessage.company && (
                <div>
                  <p className="text-tertiary">Company</p>
                  <p className="text-secondary">{selectedMessage.company}</p>
                </div>
              )}
              <div>
                <p className="text-tertiary">Date</p>
                <p className="text-secondary">{formatDate(selectedMessage.createdAt)}</p>
              </div>
              <div>
                <p className="text-tertiary">Status</p>
                <p className={cn('font-medium', selectedMessage.read ? 'text-success' : 'text-warning')}>
                  {selectedMessage.read ? 'Read' : 'Unread'}
                </p>
              </div>
              {selectedMessage.archived && (
                <div className="sm:col-span-2">
                  <p className="text-tertiary">Archived</p>
                  <p className="text-warning font-medium">Yes</p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-default">
              <p className="text-tertiary mb-2">Message</p>
              <div className="bg-tertiary/30 p-4 rounded-lg whitespace-pre-wrap text-secondary">
                {selectedMessage.message}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-default">
              <Button variant="ghost" size="sm" onClick={() => handleAction(selectedMessage._id, selectedMessage.read ? 'unread' : 'read')}>
                {selectedMessage.read ? 'Mark Unread' : 'Mark Read'}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleAction(selectedMessage._id, selectedMessage.archived ? 'unarchive' : 'archive')}>
                {selectedMessage.archived ? 'Unarchive' : 'Archive'}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleAction(selectedMessage._id, 'delete')}>
                <Trash2 className="h-4 w-4 mr-2" /> Delete
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}