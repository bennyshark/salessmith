'use client';

import { useState } from 'react';
import AdCopyVariantCard from './AdCopyVariantCard';
import type { AdCopyOutput as TAdCopyOutput, AdPlatform } from '@/types';
import { Info } from 'lucide-react';

const PLATFORM_LABELS: Record<string, string> = {
  facebook: 'Facebook',
  google: 'Google',
  tiktok: 'TikTok',
  youtube: 'YouTube',
  native: 'Native Ads',
};

interface AdCopyOutputProps {
  output: TAdCopyOutput;
}

export default function AdCopyOutput({ output }: AdCopyOutputProps) {
  const platforms = [...new Set(output.variants.map(v => v.platform))] as AdPlatform[];
  const [active, setActive] = useState<AdPlatform>(platforms[0]);

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

      {/* Platform tabs */}
      <div className="flex gap-2 flex-wrap border-b border-zinc-800 pb-3">
        {platforms.map(platform => (
          <button
            key={platform}
            onClick={() => setActive(platform)}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
              active === platform
                ? 'bg-violet-600/20 border-violet-600/50 text-violet-300'
                : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200'
            }`}
          >
            {PLATFORM_LABELS[platform] ?? platform}
          </button>
        ))}
      </div>

      {/* Variants */}
      <div className="space-y-3">
        {output.variants
          .filter(v => v.platform === active)
          .map((variant, i) => (
            <AdCopyVariantCard key={i} variant={variant} index={i} />
          ))}
      </div>
    </div>
  );
}