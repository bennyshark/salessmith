'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import HistoryCard from '@/components/history/HistoryCard';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import EmptyState from '@/components/shared/EmptyState';
import { Button } from '@/components/ui/button';
import { History } from 'lucide-react';
import type { HistoryItem } from '@/types';

type FilterType = 'all' | 'ad_copy' | 'vsl' | 'saved';

export default function HistoryPage() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>('all');

  async function fetchHistory() {
    setIsLoading(true);
    const params = new URLSearchParams();
    if (filter === 'saved') params.set('saved', 'true');
    else if (filter !== 'all') params.set('type', filter);
    const res = await fetch(`/api/history?${params}`);
    const data = await res.json();
    setItems(data.items || []);
    setIsLoading(false);
  }

  useEffect(() => { fetchHistory(); }, [filter]);

  const filters: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'ad_copy', label: 'Ad Copy' },
    { value: 'vsl', label: 'VSL Scripts' },
    { value: 'saved', label: 'Saved' },
  ];

  return (
    <div>
      <Header title="History" description="All your previously generated content" />
      <div className="p-8">
        <div className="flex items-center gap-2 mb-6">
          {filters.map(({ value, label }) => (
            <Button key={value} variant={filter === value ? 'default' : 'ghost'} size="sm"
              onClick={() => setFilter(value)}
              className={filter === value ? 'bg-violet-600 hover:bg-violet-500 text-white' : 'text-zinc-400 hover:text-zinc-100'}>
              {label}
            </Button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20"><LoadingSpinner label="Loading history..." /></div>
        ) : items.length === 0 ? (
          <EmptyState icon={History} title="No history yet"
            description="Generated content will appear here automatically after each generation." />
        ) : (
          <div className="grid gap-3 max-w-3xl">
            {items.map(item => (
              <HistoryCard key={item.id} item={item}
                onDelete={id => setItems(prev => prev.filter(i => i.id !== id))}
                onToggleSave={(id, saved) => setItems(prev => prev.map(i => i.id === id ? { ...i, is_saved: saved } : i))} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}