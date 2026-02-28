import Header from '@/components/layout/Header';
import Link from 'next/link';
import { Zap, FileVideo, History, ArrowRight } from 'lucide-react';

const tools = [
  {
    href: '/ad-copy', icon: Zap, title: 'Ad Copy Generator',
    description: 'Generate Facebook, Google, TikTok, and native ad copy in seconds. Multiple variants, multiple tones.',
    color: 'bg-blue-600/20 text-blue-400', stat: 'Saves 2–4 hours per campaign',
  },
  {
    href: '/vsl-builder', icon: FileVideo, title: 'VSL Script Builder',
    description: 'Full video sales letter scripts with 14 structured sections, hook options, and objection handling.',
    color: 'bg-violet-600/20 text-violet-400', stat: 'Replaces $500–$3K copywriter cost',
  },
];

export default function DashboardPage() {
  return (
    <div>
      <Header title="Dashboard" description="Welcome to SaleSmith — your AI-powered copy command center" />
      <div className="p-8 space-y-8">
        <div>
          <h2 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-4">Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tools.map(({ href, icon: Icon, title, description, color, stat }) => (
              <Link key={href} href={href}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-600 transition-all group block">
                <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-white text-base mb-1.5 group-hover:text-violet-300 transition-colors">{title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed mb-3">{description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-500 bg-zinc-800 px-2.5 py-1 rounded-full">{stat}</span>
                  <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-violet-400 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <Link href="/history"
          className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4 hover:border-zinc-700 transition-colors group">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-zinc-800 rounded-lg flex items-center justify-center">
              <History className="w-4 h-4 text-zinc-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">View History</p>
              <p className="text-xs text-zinc-500">All your previously generated copy</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
        </Link>

        <div className="bg-gradient-to-br from-violet-950/30 to-zinc-900 border border-violet-800/20 rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-violet-300 mb-3">💡 Pro Tips for Better Output</h3>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li>• <strong className="text-zinc-300">Be specific with your audience</strong> — "women 35-45 with lower back pain" beats "adults"</li>
            <li>• <strong className="text-zinc-300">Name the transformation</strong> — quantify the result when possible ("lose 15 lbs in 6 weeks")</li>
            <li>• <strong className="text-zinc-300">Try multiple tones</strong> — the same offer converts differently across emotional approaches</li>
            <li>• <strong className="text-zinc-300">Regenerate freely</strong> — each generation uses a different creative angle</li>
          </ul>
        </div>
      </div>
    </div>
  );
}