export type ToolType = 'ad_copy' | 'vsl';

// ─── Ad Copy Types ─────────────────────────────────────────
export type AdPlatform = 'facebook' | 'google' | 'tiktok' | 'youtube' | 'native';
export type AdTone = 'aggressive' | 'soft_sell' | 'curiosity' | 'fear_based' | 'aspirational' | 'conversational';

export interface AdCopyInputs {
  productName: string;
  productDescription: string;
  targetAudience: string;
  mainBenefit: string;
  painPoints: string;
  offer: string;
  cta: string;
  platforms: AdPlatform[];
  tone: AdTone;
  variantCount: number;
}

export interface AdVariant {
  platform: AdPlatform;
  headline: string;
  primaryText: string;
  description?: string;
  cta: string;
  hookType: string;
}

export interface AdCopyOutput {
  variants: AdVariant[];
  notes: string;
}

// ─── VSL Types ─────────────────────────────────────────────
export type VSLHookStyle = 'shock_stat' | 'story' | 'bold_promise' | 'question' | 'controversy';
export type VSLTone = 'casual' | 'authoritative' | 'emotional' | 'hype';

export interface VSLInputs {
  productName: string;
  productDescription: string;
  targetAudience: string;
  mainProblem: string;
  transformation: string;
  price: string;
  guarantee: string;
  bonuses: string;
  hookStyle: VSLHookStyle;
  tone: VSLTone;
}

export interface VSLSection {
  id: string;
  label: string;
  content: string;
  estimatedSeconds: number;
}

export interface VSLOutput {
  sections: VSLSection[];
  totalWordCount: number;
  estimatedMinutes: number;
  topObjections: string[];
}

// ─── History Types ──────────────────────────────────────────
export interface HistoryItem {
  id: string;
  user_id: string;
  type: ToolType;
  title: string;
  inputs: AdCopyInputs | VSLInputs;
  output: AdCopyOutput | VSLOutput;
  is_saved: boolean;
  created_at: string;
}