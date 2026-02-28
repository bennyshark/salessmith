import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
}

const sizeClasses = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' };

export default function LoadingSpinner({ size = 'md', className, label }: LoadingSpinnerProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
      <div className={cn('rounded-full border-2 border-zinc-700 border-t-violet-500 animate-spin', sizeClasses[size])} />
      {label && <p className="text-sm text-zinc-400 animate-pulse">{label}</p>}
    </div>
  );
}