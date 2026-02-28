import { Badge } from '@/components/ui/badge';
import CopyButton from '@/components/shared/CopyButton';
import type { AdVariant } from '@/types';
import { platformLabels } from '@/lib/utils';

interface AdCopyVariantCardProps {
  variant: AdVariant;
  index: number;
}

export default function AdCopyVariantCard({ variant, index }: AdCopyVariantCardProps) {
  const fullText = `HEADLINE: ${variant.headline}\n\n${variant.primaryText}${variant.description ? `\n\n${variant.description}` : ''}\n\nCTA: ${variant.cta}`;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4 hover:border-zinc-700 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-violet-400 border-violet-600/40 bg-violet-600/10 text-xs">
            {platformLabels[variant.platform]}
          </Badge>
          <Badge variant="outline" className="text-zinc-400 border-zinc-700 text-xs capitalize">
            {variant.hookType.replace('_', ' ')}
          </Badge>
          <span className="text-xs text-zinc-500">Variant {index + 1}</span>
        </div>
        <CopyButton text={fullText} />
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-xs font-medium text-zinc-500 uppercase tracking-wide mb-1">Headline</p>
          <p className="text-white font-semibold">{variant.headline}</p>
        </div>
        <div>
          <p className="text-xs font-medium text-zinc-500 uppercase tracking-wide mb-1">Primary Text</p>
          <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">{variant.primaryText}</p>
        </div>
        {variant.description && (
          <div>
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wide mb-1">Description</p>
            <p className="text-zinc-400 text-sm">{variant.description}</p>
          </div>
        )}
        <div className="pt-1 border-t border-zinc-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-zinc-500 mr-2">CTA:</span>
            <span className="text-sm font-medium text-violet-400">{variant.cta}</span>
          </div>
        </div>
      </div>
    </div>
  );
}