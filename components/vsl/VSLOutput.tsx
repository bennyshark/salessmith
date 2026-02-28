'use client';

import { useState } from 'react';
import VSLSection from './VSLSection';
import CopyButton from '@/components/shared/CopyButton';
import type { VSLOutput as TVSLOutput } from '@/types';
import { FileText, AlertCircle, Clock, Hash } from 'lucide-react';

interface VSLOutputProps {
  output: TVSLOutput;
}

export default function VSLOutput({ output }: VSLOutputProps) {
  const [showObjections, setShowObjections] = useState(false);
  const fullScript = output.sections.map(s => `[${s.label.toUpperCase()}]\n\n${s.content}`).join('\n\n---\n\n');

  return (
    <div className="space-y-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 text-sm text-zinc-400">
            <Hash className="w-4 h-4" />
            <span className="font-medium text-zinc-200">{output.totalWordCount?.toLocaleString()}</span>
            <span>words</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-zinc-400">
            <Clock className="w-4 h-4" />
            <span className="font-medium text-zinc-200">{output.estimatedMinutes}</span>
            <span>min</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-zinc-400">
            <FileText className="w-4 h-4" />
            <span className="font-medium text-zinc-200">{output.sections.length}</span>
            <span>sections</span>
          </div>
        </div>
        <CopyButton text={fullScript} label="Copy Full Script" size="default" />
      </div>

      {output.topObjections?.length > 0 && (
        <div className="bg-amber-950/20 border border-amber-800/30 rounded-xl p-4">
          <button onClick={() => setShowObjections(!showObjections)}
            className="flex items-center gap-2 text-amber-400 text-sm font-medium w-full">
            <AlertCircle className="w-4 h-4" />
            Top {output.topObjections.length} Objections Handled
            <span className="ml-auto">{showObjections ? '▲' : '▼'}</span>
          </button>
          {showObjections && (
            <ul className="mt-3 space-y-2">
              {output.topObjections.map((obj, i) => (
                <li key={i} className="text-sm text-amber-200/70 pl-4 border-l border-amber-800/50">{obj}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="space-y-3">
        {output.sections.map((section, i) => (
          <VSLSection key={section.id} section={section} index={i} />
        ))}
      </div>
    </div>
  );
}