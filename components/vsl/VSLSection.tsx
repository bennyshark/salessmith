'use client';

import { useState } from 'react';
import type { VSLSection as TVSLSection } from '@/types';
import { Copy, Check } from 'lucide-react';

interface VSLSectionProps {
  section: TVSLSection;
  index: number;
}

const SECTION_COLORS: Record<string, { label: string; border: string; bg: string }> = {
  hook:         { label: '#f87171', border: 'rgba(248,113,113,0.2)', bg: 'rgba(248,113,113,0.06)' },
  open_loop:    { label: '#fb923c', border: 'rgba(251,146,60,0.2)',  bg: 'rgba(251,146,60,0.06)' },
  story:        { label: '#fbbf24', border: 'rgba(251,191,36,0.2)',  bg: 'rgba(251,191,36,0.06)' },
  problem:      { label: '#f472b6', border: 'rgba(244,114,182,0.2)', bg: 'rgba(244,114,182,0.06)' },
  agitate:      { label: '#c084fc', border: 'rgba(192,132,252,0.2)', bg: 'rgba(192,132,252,0.06)' },
  solution:     { label: '#4ade80', border: 'rgba(74,222,128,0.2)',  bg: 'rgba(74,222,128,0.06)' },
  how_it_works: { label: '#34d399', border: 'rgba(52,211,153,0.2)',  bg: 'rgba(52,211,153,0.06)' },
  proof:        { label: '#60a5fa', border: 'rgba(96,165,250,0.2)',  bg: 'rgba(96,165,250,0.06)' },
  offer_stack:  { label: '#818cf8', border: 'rgba(129,140,248,0.2)', bg: 'rgba(129,140,248,0.06)' },
  price_reveal: { label: '#a78bfa', border: 'rgba(167,139,250,0.2)', bg: 'rgba(167,139,250,0.06)' },
  guarantee:    { label: '#2dd4bf', border: 'rgba(45,212,191,0.2)',  bg: 'rgba(45,212,191,0.06)' },
  urgency:      { label: '#facc15', border: 'rgba(250,204,21,0.2)',  bg: 'rgba(250,204,21,0.06)' },
  cta:          { label: '#4ade80', border: 'rgba(74,222,128,0.2)',  bg: 'rgba(74,222,128,0.06)' },
  close:        { label: '#c084fc', border: 'rgba(192,132,252,0.2)', bg: 'rgba(192,132,252,0.06)' },
};

const FALLBACK = { label: 'rgba(255,255,255,0.4)', border: 'rgba(255,255,255,0.1)', bg: 'rgba(255,255,255,0.03)' };

export default function VSLSection({ section, index }: VSLSectionProps) {
  const [copied, setCopied] = useState(false);
  const colors = SECTION_COLORS[section.id?.toLowerCase()] || FALLBACK;

  const mins = Math.floor(section.estimatedSeconds / 60);
  const secs = section.estimatedSeconds % 60;
  const timeLabel = mins > 0 ? `${mins}:${String(secs).padStart(2, '0')}` : `${secs}s`;

  async function handleCopy() {
    await navigator.clipboard.writeText(section.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, overflow: 'hidden', transition: 'border-color 0.15s' }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}
    >
      {/* Section header */}
      <div style={{ background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '10px 16px' }} className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span style={{ fontFamily: 'monospace', color: 'rgba(255,255,255,0.18)', fontSize: 11 }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span style={{ color: colors.label, background: colors.bg, border: `1px solid ${colors.border}`, fontSize: 11, padding: '2px 9px', borderRadius: 999, fontWeight: 600, letterSpacing: '0.01em' }}>
            {section.label}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span style={{ color: 'rgba(255,255,255,0.18)', fontSize: 12 }}>{timeLabel}</span>
          <button
            onClick={handleCopy}
            style={{ color: copied ? '#4ade80' : 'rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', padding: '5px 10px', borderRadius: 7, fontSize: 12, transition: 'all 0.15s', cursor: 'pointer' }}
            className="flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '16px 18px' }}>
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14, lineHeight: 1.85, whiteSpace: 'pre-wrap' }}>
          {section.content}
        </p>
      </div>
    </div>
  );
}