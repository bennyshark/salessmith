'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdCopyVariantCard from './AdCopyVariantCard';
import type { AdCopyOutput as TAdCopyOutput } from '@/types';
import { platformLabels } from '@/lib/utils';
import { Info } from 'lucide-react';

interface AdCopyOutputProps {
  output: TAdCopyOutput;
}

export default function AdCopyOutput({ output }: AdCopyOutputProps) {
  const platforms = [...new Set(output.variants.map(v => v.platform))];

  return (
    <div className="space-y-4">
      {output.notes && (
        <div className="bg-violet-950/30 border border-violet-800/30 rounded-xl p-4 flex gap-3">
          <Info className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-medium text-violet-400 mb-1">Copywriter Notes</p>
            <p className="text-sm text-violet-200/80">{output.notes}</p>
          </div>
        </div>
      )}

      <Tabs defaultValue={platforms[0]}>
        <TabsList className="bg-zinc-900 border border-zinc-800">
          {platforms.map(platform => (
            <TabsTrigger key={platform} value={platform}
              className="data-[state=active]:bg-violet-600/20 data-[state=active]:text-violet-300">
              {platformLabels[platform]}
            </TabsTrigger>
          ))}
        </TabsList>

        {platforms.map(platform => {
          const variants = output.variants.filter(v => v.platform === platform);
          return (
            <TabsContent key={platform} value={platform} className="mt-4 space-y-3">
              {variants.map((variant, i) => (
                <AdCopyVariantCard key={i} variant={variant} index={i} />
              ))}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}