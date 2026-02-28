'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import VSLForm from '@/components/vsl/VSLForm';
import VSLOutput from '@/components/vsl/VSLOutput';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import EmptyState from '@/components/shared/EmptyState';
import { FileVideo } from 'lucide-react';
import type { VSLInputs, VSLOutput as TVSLOutput } from '@/types';
import toast from 'react-hot-toast';

export default function VSLBuilderPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState<TVSLOutput | null>(null);

  async function handleGenerate(inputs: VSLInputs) {
    setIsLoading(true);
    setOutput(null);
    try {
      const response = await fetch('/api/generate-vsl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputs),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Generation failed');
      setOutput(data.output);
      toast.success('VSL script generated!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Header title="VSL Script Builder" description="Generate a complete Video Sales Letter script — ready to record" />
      <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-73px)]">
        <div className="overflow-y-auto pr-2">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-base font-semibold text-white mb-5 flex items-center gap-2">
              <FileVideo className="w-4 h-4 text-violet-400" /> Script Brief
            </h2>
            <VSLForm onGenerate={handleGenerate} isLoading={isLoading} />
          </div>
        </div>
        <div className="overflow-y-auto">
          {isLoading ? (
            <div className="h-full flex items-center justify-center">
              <LoadingSpinner size="lg" label="Writing your VSL script... this takes ~30 seconds" />
            </div>
          ) : output ? (
            <VSLOutput output={output} />
          ) : (
            <div className="h-full flex items-center justify-center">
              <EmptyState icon={FileVideo} title="Your VSL script will appear here"
                description="Fill out the brief and hit generate. Claude writes a complete, structured script ready to record." />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}