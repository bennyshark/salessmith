'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Zap, FileVideo, History, LayoutDashboard, LogOut, Hammer } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

const navItems = [
  { href: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/ad-copy', icon: Zap, label: 'Ad Copy Generator' },
  { href: '/vsl-builder', icon: FileVideo, label: 'VSL Builder' },
  { href: '/history', icon: History, label: 'History' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push('/login');
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col">
      <div className="flex items-center gap-2 px-6 py-5 border-b border-zinc-800">
        <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
          <Hammer className="w-4 h-4 text-white" />
        </div>
        <span className="font-bold text-lg text-white">SaleSmith</span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ href, icon: Icon, label }) => (
          <Link key={href} href={href}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
              pathname === href
                ? 'bg-violet-600/20 text-violet-400 border border-violet-600/30'
                : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800'
            )}>
            <Icon className="w-4 h-4 flex-shrink-0" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-zinc-800">
        <button onClick={handleSignOut}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 w-full transition-all">
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}