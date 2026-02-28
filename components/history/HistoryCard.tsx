'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bookmark, Trash2, Zap, FileVideo } from 'lucide-react';
import type { HistoryItem } from '@/types';
import { formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface HistoryCardProps {
  item: HistoryItem;
  onDelete: (id: string) => void;
  onToggleSave: (id: string, saved: boolean) => void;
}

export default function HistoryCard({ item, onDelete, onToggleSave }: HistoryCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const Icon = item.type === 'ad_copy' ? Zap : FileVideo;

  async function handleDelete() {
    setIsDeleting(true);
    await fetch(`/api/history/${item.id}`, { method: 'DELETE' });
    onDelete(item.id);
  }

  async function handleToggleSave() {
    await fetch(`/api/history/${item.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_saved: !item.is_saved }),
    });
    onToggleSave(item.id, !item.is_saved);
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="w-9 h-9 bg-violet-600/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
            <Icon className="w-4 h-4 text-violet-400" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-medium text-white text-sm truncate">{item.title}</p>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs text-zinc-500 border-zinc-700">
                {item.type === 'ad_copy' ? 'Ad Copy' : 'VSL Script'}
              </Badge>
              <span className="text-xs text-zinc-600">{formatDate(item.created_at)}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <Button variant="ghost" size="sm" onClick={handleToggleSave}
            className={cn('h-8 w-8 p-0', item.is_saved ? 'text-amber-400' : 'text-zinc-500 hover:text-zinc-300')}>
            <Bookmark className={cn('w-4 h-4', item.is_saved && 'fill-current')} />
          </Button>
          <Button variant="ghost" size="sm" onClick={handleDelete} disabled={isDeleting}
            className="h-8 w-8 p-0 text-zinc-500 hover:text-red-400">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}