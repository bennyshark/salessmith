'use client';

import { useState } from 'react';
import VSLSection from './VSLSection';
import type { VSLOutput as TVSLOutput } from '@/types';
import { ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';

interface VSLOutputProps {
  output: TVSLOutput;
}

function CopyFullBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      style={{ background: copied ? 'rgba(74,222,128,0.1)' : 'rgba(255,255,255,0.05)', border: `1px solid ${copied ? 'rgba(74,222,128,0.3)' : 'rgba(255,255,255,0.1)'}`, color: copied ? '#4ade80' : 'rgba(255,255,255,0.5)', padding: '7px 14px', borderRadius: 8, fontSize: 13, fontWeight: 500, transition: 'all 0.15s', cursor: 'pointer' }}
      className="flex items-center gap-2"
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? 'Copied' : 'Copy Full Script'}
    </button>
  );
}

export default function VSLOutput({ output }: VSLOutputProps) {
  const [showObjections, setShowObjections] = useState(false);
  const fullScript = output.sections.map(s => `[${s.label.toUpperCase()}]\n\n${s.content}`).join('\n\n---\n\n');

  return (
    <div className="space-y-4">
      {/* Stats bar */}
      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '14px 20px' }} className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          {[
            { val: output.totalWordCount?.toLocaleString(), label: 'words' },
            { val: `${output.estimatedMinutes} min`, label: 'read time' },
            { val: output.sections.length, label: 'sections' },
          ].map(({ val, label }, i) => (
            <div key={i} style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>
              <span style={{ color: 'white', fontWeight: 600 }}>{val}</span> {label}
            </div>
          ))}
        </div>
        <CopyFullBtn text={fullScript} />
      </div>

      {/* Objections */}
      {output.topObjections?.length > 0 && (
        <div style={{ background: 'rgba(251,191,36,0.04)', border: '1px solid rgba(251,191,36,0.14)', borderRadius: 14, overflow: 'hidden' }}>
          <button onClick={() => setShowObjections(!showObjections)} className="w-full flex items-center justify-between px-5 py-3.5">
            <span style={{ color: 'rgba(251,191,36,0.75)', fontSize: 13, fontWeight: 500 }}>
              {output.topObjections.length} Objections Handled
            </span>
            {showObjections
              ? <ChevronUp style={{ width: 15, height: 15, color: 'rgba(251,191,36,0.4)' }} />
              : <ChevronDown style={{ width: 15, height: 15, color: 'rgba(251,191,36,0.4)' }} />
            }
          </button>
          {showObjections && (
            <div style={{ borderTop: '1px solid rgba(251,191,36,0.1)', padding: '12px 20px' }} className="space-y-2">
              {output.topObjections.map((obj, i) => (
                <p key={i} style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, lineHeight: 1.7, paddingLeft: 12, borderLeft: '2px solid rgba(251,191,36,0.25)' }}>{obj}</p>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Script sections */}
      <div className="space-y-3">
        {output.sections.map((section, i) => (
          <VSLSection key={section.id} section={section} index={i} />
        ))}
      </div>
    </div>
  );
}