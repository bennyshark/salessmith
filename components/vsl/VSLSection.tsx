import CopyButton from '@/components/shared/CopyButton';
import type { VSLSection as TVSLSection } from '@/types';
import { Clock } from 'lucide-react';

interface VSLSectionProps {
  section: TVSLSection;
  index: number;
}

const sectionColors: Record<string, string> = {
  HOOK: 'text-red-400 bg-red-900/20 border-red-800/30',
  OPEN_LOOP: 'text-orange-400 bg-orange-900/20 border-orange-800/30',
  STORY: 'text-yellow-400 bg-yellow-900/20 border-yellow-800/30',
  PROBLEM: 'text-pink-400 bg-pink-900/20 border-pink-800/30',
  AGITATE: 'text-rose-400 bg-rose-900/20 border-rose-800/30',
  SOLUTION: 'text-emerald-400 bg-emerald-900/20 border-emerald-800/30',
  HOW_IT_WORKS: 'text-cyan-400 bg-cyan-900/20 border-cyan-800/30',
  PROOF: 'text-blue-400 bg-blue-900/20 border-blue-800/30',
  OFFER_STACK: 'text-violet-400 bg-violet-900/20 border-violet-800/30',
  PRICE_REVEAL: 'text-purple-400 bg-purple-900/20 border-purple-800/30',
  GUARANTEE: 'text-teal-400 bg-teal-900/20 border-teal-800/30',
  URGENCY: 'text-amber-400 bg-amber-900/20 border-amber-800/30',
  CTA: 'text-green-400 bg-green-900/20 border-green-800/30',
  CLOSE: 'text-indigo-400 bg-indigo-900/20 border-indigo-800/30',
};

export default function VSLSection({ section, index }: VSLSectionProps) {
  const colorClass = sectionColors[section.id.toUpperCase()] || 'text-zinc-400 bg-zinc-800/50 border-zinc-700/30';
  const minutes = Math.floor(section.estimatedSeconds / 60);
  const seconds = section.estimatedSeconds % 60;
  const timeLabel = minutes > 0 ? `${minutes}:${String(seconds).padStart(2, '0')} min` : `${seconds}s`;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-colors">
      <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-zinc-600">{String(index + 1).padStart(2, '0')}</span>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${colorClass}`}>
            {section.label}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs text-zinc-500">
            <Clock className="w-3 h-3" /> {timeLabel}
          </div>
          <CopyButton text={section.content} />
        </div>
      </div>
      <div className="px-5 py-4">
        <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">{section.content}</p>
      </div>
    </div>
  );
}