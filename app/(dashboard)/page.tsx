'use client'; 
import Link from 'next/link';
import { Zap, FileVideo, History, ArrowRight, Clock } from 'lucide-react';

const tools = [
  {
    href: '/ad-copy',
    icon: Zap,
    label: 'AD COPY',
    title: 'Ad Copy Generator',
    description: 'Multi-platform ad variants engineered to stop the scroll and convert. Facebook, Google, TikTok, YouTube, Native.',
    accent: '#3b82f6',
    accentMuted: 'rgba(59,130,246,0.12)',
    accentBorder: 'rgba(59,130,246,0.25)',
    stat: '2–4 hrs saved per campaign',
  },
  {
    href: '/vsl-builder',
    icon: FileVideo,
    label: 'VSL',
    title: 'VSL Script Builder',
    description: '14-section video sales letter scripts written to hold attention, build desire, and close. Ready to record.',
    accent: '#f59e0b',
    accentMuted: 'rgba(245,158,11,0.12)',
    accentBorder: 'rgba(245,158,11,0.25)',
    stat: 'Full script in ~30 seconds',
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen" style={{ background: '#08080f' }}>
      {/* Top bar */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }} className="px-10 py-6">
        <div className="flex items-end justify-between max-w-5xl">
          <div>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, letterSpacing: '0.15em' }} className="uppercase font-semibold mb-1">SaleSmith</p>
            <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 28, letterSpacing: '-0.03em', lineHeight: 1 }} className="text-white font-bold">
              Command Center
            </h1>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 13 }}>What are you building today?</p>
        </div>
      </div>

      <div className="px-10 py-10 max-w-5xl space-y-10">

        {/* Tools */}
        <div>
          <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 11, letterSpacing: '0.15em' }} className="uppercase font-semibold mb-5">Tools</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {tools.map(({ href, icon: Icon, label, title, description, accent, accentMuted, accentBorder, stat }) => (
              <Link
                key={href}
                href={href}
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  transition: 'all 0.2s ease',
                }}
                className="rounded-2xl p-7 block group relative overflow-hidden"
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = accentMuted;
                  (e.currentTarget as HTMLElement).style.borderColor = accentBorder;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
                }}
              >
                {/* Glow */}
                <div style={{ position: 'absolute', top: -40, right: -40, width: 120, height: 120, background: accent, borderRadius: '50%', opacity: 0.04, filter: 'blur(30px)', pointerEvents: 'none' }} />

                <div className="flex items-start justify-between mb-6">
                  <div style={{ background: accentMuted, border: `1px solid ${accentBorder}` }} className="w-11 h-11 rounded-xl flex items-center justify-center">
                    <Icon style={{ color: accent, width: 20, height: 20 }} />
                  </div>
                  <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: 11, letterSpacing: '0.1em' }} className="uppercase font-bold">{label}</span>
                </div>

                <h3 style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.02em' }} className="text-white text-xl font-bold mb-2">{title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, lineHeight: 1.6 }} className="mb-6">{description}</p>

                <div className="flex items-center justify-between">
                  <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full">
                    <Clock style={{ width: 11, height: 11, color: 'rgba(255,255,255,0.3)' }} />
                    <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>{stat}</span>
                  </div>
                  <ArrowRight style={{ width: 16, height: 16, color: 'rgba(255,255,255,0.2)', transition: 'all 0.2s' }} className="group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* History */}
        <div>
          <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 11, letterSpacing: '0.15em' }} className="uppercase font-semibold mb-5">Recent</p>
          <Link
            href="/history"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', transition: 'all 0.2s' }}
            className="flex items-center justify-between rounded-2xl px-7 py-5 group"
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
            }}
          >
            <div className="flex items-center gap-4">
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }} className="w-10 h-10 rounded-xl flex items-center justify-center">
                <History style={{ width: 16, height: 16, color: 'rgba(255,255,255,0.3)' }} />
              </div>
              <div>
                <p className="text-white text-sm font-medium">Generation History</p>
                <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>Browse and revisit all previous outputs</p>
              </div>
            </div>
            <ArrowRight style={{ width: 15, height: 15, color: 'rgba(255,255,255,0.2)', transition: 'all 0.2s' }} className="group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Tips */}
        <div style={{ border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: '24px 28px' }}>
          <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 11, letterSpacing: '0.15em' }} className="uppercase font-semibold mb-4">Tips for better output</p>
          <div className="space-y-3">
            {[
              ['Be specific with your audience', '"Women 35–45 with knee pain" converts better than "adults with pain"'],
              ['Quantify the transformation', '"Lose 15 lbs in 6 weeks" beats "lose weight fast" every time'],
              ['Test multiple tones', 'The same offer can perform very differently as curiosity vs. fear vs. aspiration'],
              ['Regenerate freely', 'Each generation uses a different hook formula — run it 3–5 times and pick the best'],
            ].map(([title, desc], i) => (
              <div key={i} className="flex gap-3">
                <div style={{ width: 5, height: 5, background: 'rgba(255,255,255,0.15)', borderRadius: '50%', marginTop: 7, flexShrink: 0 }} />
                <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13, lineHeight: 1.6 }}>
                  <span style={{ color: 'rgba(255,255,255,0.6)' }}>{title} — </span>{desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}