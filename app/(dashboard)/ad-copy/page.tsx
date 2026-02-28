'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import AdCopyForm from '@/components/ad-copy/AdCopyForm';
import AdCopyOutput from '@/components/ad-copy/AdCopyOutput';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import EmptyState from '@/components/shared/EmptyState';
import { Zap } from 'lucide-react';
import type { AdCopyInputs, AdCopyOutput as TAdCopyOutput } from '@/types';
import toast from 'react-hot-toast';

export default function AdCopyPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState<TAdCopyOutput | null>(null);

  async function handleGenerate(inputs: AdCopyInputs) {
    setIsLoading(true);
    setOutput(null);
    try {
      const response = await fetch('/api/generate-ad-copy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputs),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Generation failed');
      setOutput(data.output);
      toast.success('Ad copy generated!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Header title="Ad Copy Generator" description="Generate high-converting ad copy for any platform in seconds" />
      <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-73px)]">
        <div className="overflow-y-auto pr-2">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-base font-semibold text-white mb-5 flex items-center gap-2">
              <Zap className="w-4 h-4 text-violet-400" /> Brief
            </h2>
            <AdCopyForm onGenerate={handleGenerate} isLoading={isLoading} />
          </div>
        </div>
        <div className="overflow-y-auto">
          {isLoading ? (
            <div className="h-full flex items-center justify-center">
              <LoadingSpinner size="lg" label="Claude is writing your ads..." />
            </div>
          ) : output ? (
            <AdCopyOutput output={output} />
          ) : (
            <div className="h-full flex items-center justify-center">
              <EmptyState icon={Zap} title="Your ad copy will appear here"
                description="Fill out the brief on the left and hit generate." />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}