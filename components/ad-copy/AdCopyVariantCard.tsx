'use client'; 
import CopyButton from '@/components/shared/CopyButton';
import type { AdVariant } from '@/types';

const HOOK_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  curiosity:     { bg: 'rgba(139,92,246,0.1)',  text: '#c4b5fd', border: 'rgba(139,92,246,0.25)' },
  social_proof:  { bg: 'rgba(34,197,94,0.1)',   text: '#86efac', border: 'rgba(34,197,94,0.25)' },
  fear:          { bg: 'rgba(239,68,68,0.1)',   text: '#fca5a5', border: 'rgba(239,68,68,0.25)' },
  desire:        { bg: 'rgba(245,158,11,0.1)',  text: '#fcd34d', border: 'rgba(245,158,11,0.25)' },
  story:         { bg: 'rgba(59,130,246,0.1)',  text: '#93c5fd', border: 'rgba(59,130,246,0.25)' },
  question:      { bg: 'rgba(20,184,166,0.1)',  text: '#5eead4', border: 'rgba(20,184,166,0.25)' },
  contrarian:    { bg: 'rgba(249,115,22,0.1)',  text: '#fdba74', border: 'rgba(249,115,22,0.25)' },
  identity:      { bg: 'rgba(236,72,153,0.1)',  text: '#f9a8d4', border: 'rgba(236,72,153,0.25)' },
  mixed:         { bg: 'rgba(255,255,255,0.05)', text: 'rgba(255,255,255,0.4)', border: 'rgba(255,255,255,0.1)' },
};

interface AdCopyVariantCardProps {
  variant: AdVariant;
  index: number;
}

export default function AdCopyVariantCard({ variant, index }: AdCopyVariantCardProps) {
  const fullText = [
    `HEADLINE: ${variant.headline}`,
    variant.primaryText,
    variant.description ? `DESCRIPTION: ${variant.description}` : '',
    `CTA: ${variant.cta}`,
  ].filter(Boolean).join('\n\n');

  const hookKey = variant.hookType?.toLowerCase().replace(/[^a-z_]/g, '') || 'mixed';
  const hookColor = HOOK_COLORS[hookKey] || HOOK_COLORS.mixed;

  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.07)',
        transition: 'border-color 0.15s ease, background 0.15s ease',
      }}
      className="rounded-xl overflow-hidden group hover:bg-white/[0.03]"
      onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}
    >
      {/* Card header */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.15)' }} className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <span style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }} className="text-xs px-2 py-0.5 rounded">
            #{String(index + 1).padStart(2, '0')}
          </span>
          <span style={{ background: hookColor.bg, color: hookColor.text, border: `1px solid ${hookColor.border}` }} className="text-xs font-medium px-2.5 py-0.5 rounded-full capitalize">
            {(variant.hookType || 'mixed').replace(/_/g, ' ')}
          </span>
        </div>
        <CopyButton text={fullText} />
      </div>

      {/* Card body */}
      <div className="px-4 py-4 space-y-4">
        {/* Headline */}
        <div>
          <p style={{ color: 'rgba(245,158,11,0.5)', fontSize: 10, letterSpacing: '0.1em' }} className="uppercase font-bold mb-1.5">Headline</p>
          <p className="text-white font-semibold text-base leading-snug">{variant.headline}</p>
        </div>

        {/* Primary Text */}
        {variant.primaryText && (
          <div>
            <p style={{ color: 'rgba(245,158,11,0.5)', fontSize: 10, letterSpacing: '0.1em' }} className="uppercase font-bold mb-1.5">Body Copy</p>
            <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: 'rgba(255,255,255,0.7)' }}>{variant.primaryText}</p>
          </div>
        )}

        {/* Description */}
        {variant.description && (
          <div>
            <p style={{ color: 'rgba(245,158,11,0.5)', fontSize: 10, letterSpacing: '0.1em' }} className="uppercase font-bold mb-1.5">Description</p>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{variant.description}</p>
          </div>
        )}

        {/* CTA */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }} className="pt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11 }} className="uppercase tracking-wider font-bold">CTA</span>
            <span style={{ background: 'rgba(245,158,11,0.1)', color: '#fcd34d', border: '1px solid rgba(245,158,11,0.2)' }} className="text-xs font-semibold px-3 py-1 rounded-full">
              {variant.cta}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}