'use client';

import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GenerateButtonProps {
  onClick?: () => void;
  isLoading: boolean;
  disabled?: boolean;
  className?: string;
  label?: string;
}

export default function GenerateButton({ onClick, isLoading, disabled, className, label = 'Generate' }: GenerateButtonProps) {
  return (
    <Button onClick={onClick} disabled={disabled || isLoading} type="submit"
      className={cn('bg-violet-600 hover:bg-violet-500 text-white gap-2 px-6 py-2.5 font-medium', className)}>
      <Sparkles className={cn('w-4 h-4', isLoading && 'animate-pulse')} />
      {isLoading ? 'Generating...' : label}
    </Button>
  );
}