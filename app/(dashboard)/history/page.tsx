'use client';

import { useEffect, useState } from 'react';
import { Zap, FileVideo, Bookmark, Trash2, X, Clock, ArrowLeft, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';
import type { HistoryItem, AdCopyOutput, VSLOutput, AdPlatform } from '@/types';

function formatDate(d: string) {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(d));
}

function timeAgo(d: string) {
  const diff = Date.now() - new Date(d).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

const PLATFORM_LABELS: Record<string, string> = { facebook: 'Facebook', google: 'Google', tiktok: 'TikTok', youtube: 'YouTube', native: 'Native' };

const HOOK_COLORS: Record<string, string> = {
  curiosity: '#a78bfa', social_proof: '#4ade80', fear: '#f87171', desire: '#fbbf24',
  story: '#60a5fa', contrarian: '#fb923c', identity: '#f472b6', question: '#2dd4bf', mixed: 'rgba(255,255,255,0.3)',
};

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button onClick={async () => { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      style={{ color: copied ? '#4ade80' : 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', transition: 'all 0.15s' }}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium hover:text-white">
      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

// ─── Ad Copy Detail ────────────────────────────────────────────────────────
function AdCopyDetail({ output }: { output: AdCopyOutput }) {
  const platforms = [...new Set(output.variants.map(v => v.platform))] as AdPlatform[];
  const [active, setActive] = useState(platforms[0]);
  const [notesOpen, setNotesOpen] = useState(false);

  return (
    <div className="space-y-4">
      {output.notes && (
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12 }}>
          <button onClick={() => setNotesOpen(!notesOpen)} className="w-full flex items-center justify-between px-4 py-3">
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>Strategy Notes</span>
            {notesOpen ? <ChevronUp className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.3)' }} /> : <ChevronDown className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.3)' }} />}
          </button>
          {notesOpen && (
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '12px 16px' }}>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, lineHeight: 1.7 }}>{output.notes}</p>
            </div>
          )}
        </div>
      )}

      {/* Platform tabs */}
      <div className="flex gap-2 flex-wrap">
        {platforms.map(p => (
          <button key={p} onClick={() => setActive(p)}
            style={{ background: active === p ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.04)', border: `1px solid ${active === p ? 'rgba(245,158,11,0.4)' : 'rgba(255,255,255,0.08)'}`, color: active === p ? '#fcd34d' : 'rgba(255,255,255,0.4)', borderRadius: 10, padding: '6px 14px', fontSize: 13, fontWeight: 500, transition: 'all 0.15s' }}>
            {PLATFORM_LABELS[p] ?? p}
          </button>
        ))}
      </div>

      {/* Variants */}
      <div className="space-y-3">
        {output.variants.filter(v => v.platform === active).map((v, i) => {
          const fullText = [`HEADLINE: ${v.headline}`, v.primaryText, v.description && `DESCRIPTION: ${v.description}`, `CTA: ${v.cta}`].filter(Boolean).join('\n\n');
          return (
            <div key={i} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '10px 16px' }} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span style={{ fontFamily: 'monospace', color: 'rgba(255,255,255,0.2)', fontSize: 12 }}>#{String(i + 1).padStart(2, '0')}</span>
                  {v.hookType && (
                    <span style={{ color: HOOK_COLORS[v.hookType] || HOOK_COLORS.mixed, background: `${HOOK_COLORS[v.hookType] || 'rgba(255,255,255,0.15)'}18`, border: `1px solid ${HOOK_COLORS[v.hookType] || 'rgba(255,255,255,0.1)'}33`, fontSize: 11, padding: '2px 8px', borderRadius: 999, fontWeight: 600 }} className="capitalize">
                      {v.hookType.replace(/_/g, ' ')}
                    </span>
                  )}
                </div>
                <CopyBtn text={fullText} />
              </div>
              <div style={{ padding: '14px 16px' }} className="space-y-3">
                <div>
                  <p style={{ color: 'rgba(245,158,11,0.45)', fontSize: 10, letterSpacing: '0.1em', marginBottom: 6 }} className="uppercase font-bold">Headline</p>
                  <p className="text-white font-semibold">{v.headline}</p>
                </div>
                {v.primaryText && (
                  <div>
                    <p style={{ color: 'rgba(245,158,11,0.45)', fontSize: 10, letterSpacing: '0.1em', marginBottom: 6 }} className="uppercase font-bold">Body Copy</p>
                    <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14, lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{v.primaryText}</p>
                  </div>
                )}
                {v.description && (
                  <div>
                    <p style={{ color: 'rgba(245,158,11,0.45)', fontSize: 10, letterSpacing: '0.1em', marginBottom: 6 }} className="uppercase font-bold">Description</p>
                    <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13 }}>{v.description}</p>
                  </div>
                )}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 10 }} className="flex items-center gap-2">
                  <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 11 }} className="uppercase tracking-wider font-bold">CTA</span>
                  <span style={{ background: 'rgba(245,158,11,0.1)', color: '#fcd34d', border: '1px solid rgba(245,158,11,0.2)', fontSize: 12, padding: '3px 10px', borderRadius: 999, fontWeight: 600 }}>{v.cta}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── VSL Detail ─────────────────────────────────────────────────────────────
const SECTION_COLORS: Record<string, string> = {
  hook: '#f87171', open_loop: '#fb923c', story: '#fbbf24', problem: '#f472b6',
  agitate: '#c084fc', solution: '#4ade80', how_it_works: '#34d399',
  proof: '#60a5fa', offer_stack: '#818cf8', price_reveal: '#a78bfa',
  guarantee: '#2dd4bf', urgency: '#facc15', cta: '#4ade80', close: '#c084fc',
};

function VSLDetail({ output }: { output: VSLOutput }) {
  const [openObjections, setOpenObjections] = useState(false);
  const fullScript = output.sections.map(s => `[${s.label.toUpperCase()}]\n\n${s.content}`).join('\n\n---\n\n');

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '14px 20px' }} className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
            <span className="text-white font-semibold">{output.totalWordCount?.toLocaleString()}</span> words
          </div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
            <span className="text-white font-semibold">{output.estimatedMinutes}</span> min
          </div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
            <span className="text-white font-semibold">{output.sections.length}</span> sections
          </div>
        </div>
        <CopyBtn text={fullScript} />
      </div>

      {/* Objections */}
      {output.topObjections?.length > 0 && (
        <div style={{ background: 'rgba(251,191,36,0.04)', border: '1px solid rgba(251,191,36,0.15)', borderRadius: 12 }}>
          <button onClick={() => setOpenObjections(!openObjections)} className="w-full flex items-center justify-between px-4 py-3">
            <span style={{ color: 'rgba(251,191,36,0.8)', fontSize: 13 }}>Objections Handled ({output.topObjections.length})</span>
            {openObjections ? <ChevronUp className="w-4 h-4" style={{ color: 'rgba(251,191,36,0.5)' }} /> : <ChevronDown className="w-4 h-4" style={{ color: 'rgba(251,191,36,0.5)' }} />}
          </button>
          {openObjections && (
            <div style={{ borderTop: '1px solid rgba(251,191,36,0.1)', padding: '12px 16px' }} className="space-y-2">
              {output.topObjections.map((obj, i) => (
                <p key={i} style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, lineHeight: 1.6, paddingLeft: 12, borderLeft: '2px solid rgba(251,191,36,0.3)' }}>{obj}</p>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Sections */}
      <div className="space-y-3">
        {output.sections.map((section, i) => {
          const color = SECTION_COLORS[section.id?.toLowerCase()] || 'rgba(255,255,255,0.4)';
          const mins = Math.floor(section.estimatedSeconds / 60);
          const secs = section.estimatedSeconds % 60;
          const timeLabel = mins > 0 ? `${mins}:${String(secs).padStart(2, '0')}` : `${secs}s`;
          return (
            <div key={section.id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '10px 16px' }} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span style={{ fontFamily: 'monospace', color: 'rgba(255,255,255,0.2)', fontSize: 11 }}>{String(i + 1).padStart(2, '0')}</span>
                  <span style={{ color, background: `${color}15`, border: `1px solid ${color}35`, fontSize: 11, padding: '2px 8px', borderRadius: 999, fontWeight: 600 }}>{section.label}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12 }}>{timeLabel}</span>
                  <CopyBtn text={section.content} />
                </div>
              </div>
              <div style={{ padding: '14px 16px' }}>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14, lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{section.content}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── History Detail Modal ────────────────────────────────────────────────────
function HistoryModal({ item, onClose }: { item: HistoryItem; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex' }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      {/* Backdrop */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }} />

      {/* Panel */}
      <div style={{ position: 'relative', marginLeft: 'auto', width: '100%', maxWidth: 680, height: '100vh', background: '#0d0d18', borderLeft: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column' }}>
        {/* Modal header */}
        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '16px 24px', flexShrink: 0 }} className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {item.type === 'ad_copy'
                ? <Zap style={{ width: 14, height: 14, color: '#60a5fa' }} />
                : <FileVideo style={{ width: 14, height: 14, color: '#f59e0b' }} />
              }
              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, letterSpacing: '0.1em' }} className="uppercase font-semibold">
                {item.type === 'ad_copy' ? 'Ad Copy' : 'VSL Script'}
              </span>
            </div>
            <h2 style={{ color: 'white', fontSize: 16, fontWeight: 600, lineHeight: 1.3 }}>{item.title}</h2>
            <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 12, marginTop: 4 }}>{formatDate(item.created_at)}</p>
          </div>
          <button onClick={onClose} style={{ color: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: 8, transition: 'all 0.15s' }} className="hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
          {item.type === 'ad_copy'
            ? <AdCopyDetail output={item.output as AdCopyOutput} />
            : <VSLDetail output={item.output as VSLOutput} />
          }
        </div>
      </div>
    </div>
  );
}

// ─── History Page ────────────────────────────────────────────────────────────
type FilterType = 'all' | 'ad_copy' | 'vsl' | 'saved';

export default function HistoryPage() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>('all');
  const [selected, setSelected] = useState<HistoryItem | null>(null);

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

  async function handleDelete(e: React.MouseEvent, id: string) {
    e.stopPropagation();
    await fetch(`/api/history/${id}`, { method: 'DELETE' });
    setItems(prev => prev.filter(i => i.id !== id));
    if (selected?.id === id) setSelected(null);
  }

  async function handleToggleSave(e: React.MouseEvent, item: HistoryItem) {
    e.stopPropagation();
    await fetch(`/api/history/${item.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_saved: !item.is_saved }),
    });
    setItems(prev => prev.map(i => i.id === item.id ? { ...i, is_saved: !i.is_saved } : i));
  }

  const filters: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'ad_copy', label: 'Ad Copy' },
    { value: 'vsl', label: 'VSL' },
    { value: 'saved', label: 'Saved' },
  ];

  return (
    <div className="min-h-screen" style={{ background: '#08080f' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '24px 40px' }}>
        <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 11, letterSpacing: '0.15em' }} className="uppercase font-semibold mb-1">SaleSmith</p>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 26, letterSpacing: '-0.03em' }} className="text-white font-bold">History</h1>
      </div>

      <div style={{ padding: '32px 40px' }}>
        {/* Filter bar */}
        <div className="flex items-center gap-2 mb-8">
          {filters.map(({ value, label }) => (
            <button key={value} onClick={() => setFilter(value)}
              style={{
                background: filter === value ? 'rgba(255,255,255,0.08)' : 'transparent',
                border: `1px solid ${filter === value ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)'}`,
                color: filter === value ? 'white' : 'rgba(255,255,255,0.35)',
                padding: '6px 16px', borderRadius: 8, fontSize: 13, fontWeight: 500, transition: 'all 0.15s',
              }}>
              {label}
            </button>
          ))}
          {items.length > 0 && (
            <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 13, marginLeft: 8 }}>
              {items.length} {items.length === 1 ? 'result' : 'results'}
            </span>
          )}
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <div style={{ width: 32, height: 32, border: '2px solid rgba(255,255,255,0.08)', borderTop: '2px solid rgba(255,255,255,0.4)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div style={{ width: 52, height: 52, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14 }} className="flex items-center justify-center mb-4">
              <Clock style={{ width: 22, height: 22, color: 'rgba(255,255,255,0.15)' }} />
            </div>
            <p style={{ color: 'rgba(255,255,255,0.4)' }} className="font-medium">No history yet</p>
            <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 13, marginTop: 4 }}>Generated content will appear here automatically</p>
          </div>
        ) : (
          <div className="space-y-2 max-w-2xl">
            {items.map(item => (
              <div
                key={item.id}
                onClick={() => setSelected(item)}
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '14px 18px', cursor: 'pointer', transition: 'all 0.15s' }}
                className="flex items-center justify-between group"
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)'; }}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div style={{ width: 36, height: 36, background: item.type === 'ad_copy' ? 'rgba(59,130,246,0.1)' : 'rgba(245,158,11,0.1)', border: `1px solid ${item.type === 'ad_copy' ? 'rgba(59,130,246,0.2)' : 'rgba(245,158,11,0.2)'}`, borderRadius: 10, flexShrink: 0 }} className="flex items-center justify-center">
                    {item.type === 'ad_copy'
                      ? <Zap style={{ width: 15, height: 15, color: '#60a5fa' }} />
                      : <FileVideo style={{ width: 15, height: 15, color: '#f59e0b' }} />
                    }
                  </div>
                  <div className="min-w-0">
                    <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 14, fontWeight: 500 }} className="truncate">{item.title}</p>
                    <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 12, marginTop: 2 }}>{timeAgo(item.created_at)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0 ml-4">
                  <button onClick={e => handleToggleSave(e, item)}
                    style={{ color: item.is_saved ? '#fbbf24' : 'rgba(255,255,255,0.2)', background: 'transparent', border: 'none', padding: 8, borderRadius: 8, transition: 'all 0.15s', cursor: 'pointer' }}
                    className="hover:bg-white/5">
                    <Bookmark style={{ width: 15, height: 15, fill: item.is_saved ? '#fbbf24' : 'none' }} />
                  </button>
                  <button onClick={e => handleDelete(e, item.id)}
                    style={{ color: 'rgba(255,255,255,0.2)', background: 'transparent', border: 'none', padding: 8, borderRadius: 8, transition: 'all 0.15s', cursor: 'pointer' }}
                    className="hover:text-red-400 hover:bg-red-400/5">
                    <Trash2 style={{ width: 15, height: 15 }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail modal */}
      {selected && <HistoryModal item={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}