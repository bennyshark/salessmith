'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import GenerateButton from '@/components/shared/GenerateButton';
import type { AdCopyInputs, AdPlatform, AdTone } from '@/types';
import { cn } from '@/lib/utils';

const platforms: { value: AdPlatform; label: string }[] = [
  { value: 'facebook', label: 'Facebook' },
  { value: 'google', label: 'Google' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'native', label: 'Native Ads' },
];

const tones: { value: AdTone; label: string }[] = [
  { value: 'aggressive', label: 'Aggressive / Hard Sell' },
  { value: 'soft_sell', label: 'Soft Sell' },
  { value: 'curiosity', label: 'Curiosity-Driven' },
  { value: 'fear_based', label: 'Fear-Based' },
  { value: 'aspirational', label: 'Aspirational' },
  { value: 'conversational', label: 'Conversational' },
];

const defaultInputs: AdCopyInputs = {
  productName: '',
  productDescription: '',
  targetAudience: '',
  mainBenefit: '',
  painPoints: '',
  offer: '',
  cta: 'Learn More',
  platforms: ['facebook'],
  tone: 'curiosity',
  variantCount: 3,
};

interface AdCopyFormProps {
  onGenerate: (inputs: AdCopyInputs) => Promise<void>;
  isLoading: boolean;
}

export default function AdCopyForm({ onGenerate, isLoading }: AdCopyFormProps) {
  const [inputs, setInputs] = useState<AdCopyInputs>(defaultInputs);

  function togglePlatform(platform: AdPlatform) {
    setInputs(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform],
    }));
  }

  function update(field: keyof AdCopyInputs, value: unknown) {
    setInputs(prev => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onGenerate(inputs);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-1.5">
        <Label>Product / Offer Name *</Label>
        <Input value={inputs.productName} onChange={e => update('productName', e.target.value)}
          placeholder="e.g. Keto Blueprint 30-Day Program" required className="bg-zinc-800 border-zinc-700" />
      </div>

      <div className="space-y-1.5">
        <Label>What does it do? *</Label>
        <Textarea value={inputs.productDescription} onChange={e => update('productDescription', e.target.value)}
          placeholder="Briefly describe what your product is and how it works..."
          rows={3} required className="bg-zinc-800 border-zinc-700 resize-none" />
      </div>

      <div className="space-y-1.5">
        <Label>Target Audience *</Label>
        <Input value={inputs.targetAudience} onChange={e => update('targetAudience', e.target.value)}
          placeholder="e.g. Women 35-55 who want to lose weight without giving up carbs"
          required className="bg-zinc-800 border-zinc-700" />
      </div>

      <div className="space-y-1.5">
        <Label>Main Benefit *</Label>
        <Input value={inputs.mainBenefit} onChange={e => update('mainBenefit', e.target.value)}
          placeholder="e.g. Lose 10-20 lbs in 30 days without giving up your favorite foods"
          required className="bg-zinc-800 border-zinc-700" />
      </div>

      <div className="space-y-1.5">
        <Label>Pain Points to Address</Label>
        <Textarea value={inputs.painPoints} onChange={e => update('painPoints', e.target.value)}
          placeholder="What frustrations, problems, or fears does your audience have?"
          rows={3} className="bg-zinc-800 border-zinc-700 resize-none" />
      </div>

      <div className="space-y-1.5">
        <Label>The Offer</Label>
        <Input value={inputs.offer} onChange={e => update('offer', e.target.value)}
          placeholder="e.g. $47 for lifetime access + 3 bonuses, 60-day money back guarantee"
          className="bg-zinc-800 border-zinc-700" />
      </div>

      <div className="space-y-1.5">
        <Label>Call to Action</Label>
        <Input value={inputs.cta} onChange={e => update('cta', e.target.value)}
          placeholder="e.g. Get Instant Access, Start Free Trial, Shop Now"
          className="bg-zinc-800 border-zinc-700" />
      </div>

      <div className="space-y-2">
        <Label>Platforms (select all that apply) *</Label>
        <div className="flex flex-wrap gap-2">
          {platforms.map(({ value, label }) => (
            <button key={value} type="button" onClick={() => togglePlatform(value)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-sm font-medium border transition-all',
                inputs.platforms.includes(value)
                  ? 'bg-violet-600/20 border-violet-600/50 text-violet-300'
                  : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-600'
              )}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Tone</Label>
        <Select value={inputs.tone} onValueChange={v => update('tone', v)}>
          <SelectTrigger className="bg-zinc-800 border-zinc-700"><SelectValue /></SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-700">
            {tones.map(({ value, label }) => (
              <SelectItem key={value} value={value}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label>Variants per Platform</Label>
        <Select value={String(inputs.variantCount)} onValueChange={v => update('variantCount', Number(v))}>
          <SelectTrigger className="bg-zinc-800 border-zinc-700"><SelectValue /></SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-700">
            {[2, 3, 5].map(n => (
              <SelectItem key={n} value={String(n)}>{n} variants</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <GenerateButton isLoading={isLoading} disabled={inputs.platforms.length === 0}
        className="w-full"
        label={`Generate ${inputs.variantCount * inputs.platforms.length} Ad Variants`} />
    </form>
  );
}