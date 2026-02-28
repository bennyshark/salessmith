import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export default function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-14 h-14 bg-zinc-800 rounded-2xl flex items-center justify-center mb-4">
        <Icon className="w-7 h-7 text-zinc-500" />
      </div>
      <h3 className="text-base font-medium text-zinc-200 mb-1">{title}</h3>
      <p className="text-sm text-zinc-500 max-w-xs mb-4">{description}</p>
      {action}
    </div>
  );
}