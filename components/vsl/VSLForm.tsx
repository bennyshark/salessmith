'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import GenerateButton from '@/components/shared/GenerateButton';
import type { VSLInputs, VSLHookStyle, VSLTone } from '@/types';

const hookStyles: { value: VSLHookStyle; label: string; description: string }[] = [
  { value: 'shock_stat', label: 'Shock Statistic', description: 'Opens with a jaw-dropping fact' },
  { value: 'story', label: 'Story Open', description: 'Drops you mid-scene into a story' },
  { value: 'bold_promise', label: 'Bold Promise', description: 'Leads with a specific, measurable result' },
  { value: 'question', label: 'Question Hook', description: 'A question your prospect says "yes" to' },
  { value: 'controversy', label: 'Controversy', description: 'Contradicts a widely-held belief' },
];

const tones: { value: VSLTone; label: string }[] = [
  { value: 'casual', label: 'Casual / Conversational' },
  { value: 'authoritative', label: 'Authoritative / Expert' },
  { value: 'emotional', label: 'Emotional / Story-Driven' },
  { value: 'hype', label: 'High Energy / Hype' },
];

const defaultInputs: VSLInputs = {
  productName: '', productDescription: '', targetAudience: '',
  mainProblem: '', transformation: '', price: '',
  guarantee: '60-day money back guarantee', bonuses: '',
  hookStyle: 'bold_promise', tone: 'casual',
};

interface VSLFormProps {
  onGenerate: (inputs: VSLInputs) => Promise<void>;
  isLoading: boolean;
}

export default function VSLForm({ onGenerate, isLoading }: VSLFormProps) {
  const [inputs, setInputs] = useState<VSLInputs>(defaultInputs);

  function update(field: keyof VSLInputs, value: string) {
    setInputs(prev => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onGenerate(inputs);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-1.5">
        <Label>Product Name *</Label>
        <Input value={inputs.productName} onChange={e => update('productName', e.target.value)}
          placeholder="e.g. The Fat Loss Blueprint" required className="bg-zinc-800 border-zinc-700" />
      </div>
      <div className="space-y-1.5">
        <Label>What is it / how does it work? *</Label>
        <Textarea value={inputs.productDescription} onChange={e => update('productDescription', e.target.value)}
          placeholder="Describe the product and mechanism..." rows={3} required
          className="bg-zinc-800 border-zinc-700 resize-none" />
      </div>
      <div className="space-y-1.5">
        <Label>Target Audience *</Label>
        <Input value={inputs.targetAudience} onChange={e => update('targetAudience', e.target.value)}
          placeholder="Who is this for? Be specific." required className="bg-zinc-800 border-zinc-700" />
      </div>
      <div className="space-y-1.5">
        <Label>Main Problem They Have *</Label>
        <Textarea value={inputs.mainProblem} onChange={e => update('mainProblem', e.target.value)}
          placeholder="What pain, frustration, or problem are they experiencing?" rows={3} required
          className="bg-zinc-800 border-zinc-700 resize-none" />
      </div>
      <div className="space-y-1.5">
        <Label>Transformation / Result *</Label>
        <Input value={inputs.transformation} onChange={e => update('transformation', e.target.value)}
          placeholder="e.g. Lose 10-20 lbs in 30 days without giving up carbs" required
          className="bg-zinc-800 border-zinc-700" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Price</Label>
          <Input value={inputs.price} onChange={e => update('price', e.target.value)}
            placeholder="e.g. $47" className="bg-zinc-800 border-zinc-700" />
        </div>
        <div className="space-y-1.5">
          <Label>Guarantee</Label>
          <Input value={inputs.guarantee} onChange={e => update('guarantee', e.target.value)}
            placeholder="e.g. 60-day money back" className="bg-zinc-800 border-zinc-700" />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label>Bonuses (optional)</Label>
        <Input value={inputs.bonuses} onChange={e => update('bonuses', e.target.value)}
          placeholder="e.g. Meal plan PDF, Private Facebook group" className="bg-zinc-800 border-zinc-700" />
      </div>

      <div className="space-y-2">
        <Label>Hook Style</Label>
        <div className="grid grid-cols-1 gap-2">
          {hookStyles.map(({ value, label, description }) => (
            <button key={value} type="button" onClick={() => update('hookStyle', value)}
              className={`text-left px-4 py-3 rounded-lg border transition-all ${
                inputs.hookStyle === value
                  ? 'bg-violet-600/20 border-violet-600/50'
                  : 'bg-zinc-800 border-zinc-700 hover:border-zinc-600'
              }`}>
              <p className={`text-sm font-medium ${inputs.hookStyle === value ? 'text-violet-300' : 'text-zinc-200'}`}>
                {label}
              </p>
              <p className="text-xs text-zinc-500 mt-0.5">{description}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Tone</Label>
        <Select value={inputs.tone} onValueChange={v => update('tone', v as VSLTone)}>
          <SelectTrigger className="bg-zinc-800 border-zinc-700"><SelectValue /></SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-700">
            {tones.map(({ value, label }) => (
              <SelectItem key={value} value={value}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <GenerateButton isLoading={isLoading} className="w-full" label="Generate Full VSL Script" />
    </form>
  );
}