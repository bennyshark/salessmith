'use client';

import { useState } from 'react';
import AdCopyForm from '@/components/ad-copy/AdCopyForm';
import AdCopyOutput from '@/components/ad-copy/AdCopyOutput';
import type { AdCopyInputs, AdCopyOutput as TAdCopyOutput } from '@/types';
import toast from 'react-hot-toast';
import { Zap, Sparkles } from 'lucide-react';

export default function AdCopyPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState<TAdCopyOutput | null>(null);

  async function handleGenerate(inputs: AdCopyInputs) {
    setIsLoading(true);
    setOutput(null);
    try {
      const response = await fetch('/api/generate-ad-copy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputs),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Generation failed');
      setOutput(data.output);
      toast.success('Ad copy generated!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0a0a0f 0%, #0f0f1a 50%, #0a0a0f 100%)' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid rgba(251,191,36,0.15)', background: 'rgba(10,10,15,0.8)', backdropFilter: 'blur(12px)' }} className="px-8 py-5 sticky top-0 z-10">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <div style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', boxShadow: '0 0 20px rgba(245,158,11,0.4)' }} className="w-9 h-9 rounded-xl flex items-center justify-center">
              <Zap className="w-4 h-4 text-black" />
            </div>
            <div>
              <h1 style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.02em' }} className="text-lg font-bold text-white">Ad Copy Generator</h1>
              <p className="text-xs" style={{ color: 'rgba(251,191,36,0.6)' }}>AI-powered • Direct Response</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-8 items-start">

          {/* LEFT — Form Panel */}
          <div className="sticky top-[73px]">
            <div style={{ background: 'rgba(15,15,26,0.9)', border: '1px solid rgba(251,191,36,0.12)', boxShadow: '0 0 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(251,191,36,0.08)' }} className="rounded-2xl overflow-hidden">
              {/* Form header */}
              <div style={{ background: 'linear-gradient(90deg, rgba(245,158,11,0.08) 0%, transparent 100%)', borderBottom: '1px solid rgba(251,191,36,0.1)' }} className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" style={{ color: '#f59e0b' }} />
                  <span className="text-sm font-semibold text-white">Campaign Brief</span>
                </div>
                <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>The more specific you are, the harder the copy hits</p>
              </div>
              <div className="p-6 max-h-[calc(100vh-160px)] overflow-y-auto">
                <AdCopyForm onGenerate={handleGenerate} isLoading={isLoading} />
              </div>
            </div>
          </div>

          {/* RIGHT — Output Panel */}
          <div className="min-h-[600px]">
            {isLoading ? (
              <div style={{ background: 'rgba(15,15,26,0.9)', border: '1px solid rgba(251,191,36,0.12)' }} className="rounded-2xl h-full min-h-[600px] flex flex-col items-center justify-center gap-6">
                {/* Animated loader */}
                <div className="relative">
                  <div style={{ width: 64, height: 64, border: '2px solid rgba(245,158,11,0.15)', borderTop: '2px solid #f59e0b', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                  <div style={{ position: 'absolute', inset: 8, border: '2px solid rgba(245,158,11,0.08)', borderBottom: '2px solid rgba(245,158,11,0.4)', borderRadius: '50%', animation: 'spin 1.5s linear infinite reverse' }} />
                  <Zap style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#f59e0b', width: 20, height: 20 }} />
                </div>
                <div className="text-center">
                  <p className="text-white font-medium">Crafting your ads...</p>
                  <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>Applying 15+ years of DR copywriting knowledge</p>
                </div>
                <div className="flex gap-2">
                  {['Pattern interrupt', 'Psychology hooks', 'Platform specs'].map((label, i) => (
                    <div key={i} style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)', animation: `pulse ${1 + i * 0.3}s ease-in-out infinite` }} className="px-3 py-1 rounded-full">
                      <span className="text-xs" style={{ color: 'rgba(245,158,11,0.7)' }}>{label}</span>
                    </div>
                  ))}
                </div>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } } @keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }`}</style>
              </div>
            ) : output ? (
              <AdCopyOutput output={output} />
            ) : (
              <div style={{ background: 'rgba(15,15,26,0.6)', border: '1px dashed rgba(251,191,36,0.12)' }} className="rounded-2xl min-h-[600px] flex flex-col items-center justify-center gap-4 text-center px-8">
                <div style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.12)' }} className="w-16 h-16 rounded-2xl flex items-center justify-center">
                  <Zap className="w-7 h-7" style={{ color: 'rgba(245,158,11,0.4)' }} />
                </div>
                <div>
                  <p className="text-white font-medium">Your ad copy will appear here</p>
                  <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>Fill out the brief and hit generate</p>
                </div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }} className="pt-4 w-full max-w-xs">
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>Each generation uses proven DR frameworks,<br/>psychology principles & platform-specific specs</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}