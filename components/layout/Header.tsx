'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

interface HeaderProps {
  title: string;
  description?: string;
}

export default function Header({ title, description }: HeaderProps) {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setEmail(user?.email ?? null);
    });
  }, []);

  return (
    <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur px-8 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">{title}</h1>
          {description && <p className="text-sm text-zinc-400 mt-0.5">{description}</p>}
        </div>
        <div className="flex items-center gap-3">
          <div className="text-sm text-zinc-400">{email}</div>
          <div className="w-8 h-8 bg-violet-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
            {email?.[0].toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
}