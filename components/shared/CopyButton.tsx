'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CopyButtonProps {
  text: string;
  className?: string;
  label?: string;
  size?: 'sm' | 'default';
}

export default function CopyButton({ text, className, label, size = 'sm' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Button variant="ghost" size={size} onClick={handleCopy}
      className={cn('gap-1.5 text-zinc-400 hover:text-zinc-100', className)}>
      {copied
        ? <><Check className="w-3.5 h-3.5 text-green-400" /> Copied</>
        : <><Copy className="w-3.5 h-3.5" /> {label || 'Copy'}</>
      }
    </Button>
  );
}