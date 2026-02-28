'use client';

import { useState } from 'react';
import AdCopyVariantCard from './AdCopyVariantCard';
import type { AdCopyOutput as TAdCopyOutput, AdPlatform } from '@/types';
import { Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';

const PLATFORM_LABELS: Record<string, string> = {
  facebook: 'Facebook',
  google: 'Google',
  tiktok: 'TikTok',
  youtube: 'YouTube',
  native: 'Native Ads',
};

const PLATFORM_COLORS: Record<string, { bg: string; border: string; text: string; activeBg: string; activeBorder: string; activeText: string }> = {
  facebook: {
    bg: 'rgba(59,130,246,0.06)', border: 'rgba(59,130,246,0.2)', text: 'rgba(147,197,253,0.6)',
    activeBg: 'rgba(59,130,246,0.15)', activeBorder: 'rgba(59,130,246,0.5)', activeText: '#93c5fd',
  },
  google: {
    bg: 'rgba(234,179,8,0.06)', border: 'rgba(234,179,8,0.2)', text: 'rgba(253,224,71,0.6)',
    activeBg: 'rgba(234,179,8,0.15)', activeBorder: 'rgba(234,179,8,0.5)', activeText: '#fde047',
  },
  tiktok: {
    bg: 'rgba(236,72,153,0.06)', border: 'rgba(236,72,153,0.2)', text: 'rgba(249,168,212,0.6)',
    activeBg: 'rgba(236,72,153,0.15)', activeBorder: 'rgba(236,72,153,0.5)', activeText: '#f9a8d4',
  },
  youtube: {
    bg: 'rgba(239,68,68,0.06)', border: 'rgba(239,68,68,0.2)', text: 'rgba(252,165,165,0.6)',
    activeBg: 'rgba(239,68,68,0.15)', activeBorder: 'rgba(239,68,68,0.5)', activeText: '#fca5a5',
  },
  native: {
    bg: 'rgba(34,197,94,0.06)', border: 'rgba(34,197,94,0.2)', text: 'rgba(134,239,172,0.6)',
    activeBg: 'rgba(34,197,94,0.15)', activeBorder: 'rgba(34,197,94,0.5)', activeText: '#86efac',
  },
};

interface AdCopyOutputProps {
  output: TAdCopyOutput;
}

export default function AdCopyOutput({ output }: AdCopyOutputProps) {
  const platforms = [...new Set(output.variants.map(v => v.platform))] as AdPlatform[];
  const [active, setActive] = useState<AdPlatform>(platforms[0]);
  const [notesOpen, setNotesOpen] = useState(false);

  const activeVariants = output.variants.filter(v => v.platform === active);

  return (
    <div className="space-y-4">
      {/* Copywriter Notes */}
      {output.notes && (
        <div style={{ background: 'rgba(15,15,26,0.9)', border: '1px solid rgba(251,191,36,0.12)', boxShadow: '0 0 40px rgba(0,0,0,0.4)' }} className="rounded-2xl overflow-hidden">
          <button
            onClick={() => setNotesOpen(!notesOpen)}
            className="w-full flex items-center justify-between px-5 py-4 text-left"
          >
            <div className="flex items-center gap-2.5">
              <div style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }} className="w-7 h-7 rounded-lg flex items-center justify-center">
                <Lightbulb className="w-3.5 h-3.5" style={{ color: '#f59e0b' }} />
              </div>
              <span className="text-sm font-semibold text-white">Strategy Notes</span>
              <span style={{ background: 'rgba(245,158,11,0.1)', color: 'rgba(245,158,11,0.8)', border: '1px solid rgba(245,158,11,0.15)' }} className="text-xs px-2 py-0.5 rounded-full">
                {platforms.length} platforms
              </span>
            </div>
            {notesOpen
              ? <ChevronUp className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.3)' }} />
              : <ChevronDown className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.3)' }} />
            }
          </button>
          {notesOpen && (
            <div style={{ borderTop: '1px solid rgba(251,191,36,0.08)', background: 'rgba(245,158,11,0.03)' }} className="px-5 py-4">
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>{output.notes}</p>
            </div>
          )}
        </div>
      )}

      {/* Platform Tabs */}
      <div style={{ background: 'rgba(15,15,26,0.9)', border: '1px solid rgba(251,191,36,0.12)', boxShadow: '0 0 40px rgba(0,0,0,0.4)' }} className="rounded-2xl overflow-hidden">
        {/* Tab bar */}
        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.2)' }} className="flex gap-1 p-2">
          {platforms.map(platform => {
            const colors = PLATFORM_COLORS[platform] || PLATFORM_COLORS.facebook;
            const isActive = active === platform;
            const count = output.variants.filter(v => v.platform === platform).length;
            return (
              <button
                key={platform}
                onClick={() => setActive(platform)}
                style={{
                  background: isActive ? colors.activeBg : colors.bg,
                  border: `1px solid ${isActive ? colors.activeBorder : colors.border}`,
                  color: isActive ? colors.activeText : colors.text,
                  transition: 'all 0.15s ease',
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium flex-1 justify-center"
              >
                {PLATFORM_LABELS[platform] ?? platform}
                <span style={{
                  background: isActive ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)',
                  fontSize: 11,
                  padding: '1px 6px',
                  borderRadius: 999,
                }}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Variants */}
        <div className="p-4 space-y-3">
          {activeVariants.map((variant, i) => (
            <AdCopyVariantCard key={i} variant={variant} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}