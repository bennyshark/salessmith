'use client';

import { useState } from 'react';
import VSLForm from '@/components/vsl/VSLForm';
import VSLOutput from '@/components/vsl/VSLOutput';
import type { VSLInputs, VSLOutput as TVSLOutput } from '@/types';
import toast from 'react-hot-toast';
import { FileVideo, Mic } from 'lucide-react';

export default function VSLBuilderPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState<TVSLOutput | null>(null);

  async function handleGenerate(inputs: VSLInputs) {
    setIsLoading(true);
    setOutput(null);
    try {
      const response = await fetch('/api/generate-vsl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputs),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Generation failed');
      setOutput(data.output);
      toast.success('VSL script generated!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen" style={{ background: '#08080f' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(8,8,15,0.9)', backdropFilter: 'blur(12px)' }} className="px-10 py-5 sticky top-0 z-10">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <div style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.25)', width: 38, height: 38, borderRadius: 12 }} className="flex items-center justify-center">
              <FileVideo style={{ width: 16, height: 16, color: '#f59e0b' }} />
            </div>
            <div>
              <h1 style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.02em', fontSize: 17 }} className="text-white font-bold">VSL Script Builder</h1>
              <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 12, marginTop: 1 }}>14 sections · Full script · Ready to record</p>
            </div>
          </div>
          <div style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)' }} className="flex items-center gap-2 px-3 py-1.5 rounded-full">
            <Mic style={{ width: 12, height: 12, color: 'rgba(245,158,11,0.6)' }} />
            <span style={{ color: 'rgba(245,158,11,0.6)', fontSize: 12 }}>Hook · Problem · Offer · Close</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-10 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8 items-start">

          {/* Form */}
          <div className="sticky top-[73px]">
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, overflow: 'hidden' }}>
              <div style={{ background: 'rgba(245,158,11,0.04)', borderBottom: '1px solid rgba(245,158,11,0.08)', padding: '16px 22px' }}>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: 600 }}>Script Brief</p>
                <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 12, marginTop: 3 }}>The clearer the brief, the sharper the script</p>
              </div>
              <div style={{ padding: 22, maxHeight: 'calc(100vh - 160px)', overflowY: 'auto' }}>
                <VSLForm onGenerate={handleGenerate} isLoading={isLoading} />
              </div>
            </div>
          </div>

          {/* Output */}
          <div className="min-h-[600px]">
            {isLoading ? (
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, minHeight: 600 }} className="flex flex-col items-center justify-center gap-6">
                <div className="relative" style={{ width: 60, height: 60 }}>
                  <div style={{ position: 'absolute', inset: 0, border: '2px solid rgba(245,158,11,0.12)', borderTop: '2px solid #f59e0b', borderRadius: '50%', animation: 'spin 0.9s linear infinite' }} />
                  <div style={{ position: 'absolute', inset: 10, border: '2px solid rgba(245,158,11,0.06)', borderBottom: '2px solid rgba(245,158,11,0.35)', borderRadius: '50%', animation: 'spin 1.4s linear infinite reverse' }} />
                  <FileVideo style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 18, height: 18, color: '#f59e0b' }} />
                </div>
                <div className="text-center">
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>Writing your script...</p>
                  <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 13, marginTop: 4 }}>14 sections · takes about 30 seconds</p>
                </div>
                <div className="flex flex-wrap justify-center gap-2 max-w-xs">
                  {['Hook', 'Story', 'Problem', 'Agitate', 'Solution', 'Offer Stack', 'Guarantee', 'CTA'].map((s, i) => (
                    <div key={i} style={{ background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.12)', borderRadius: 999, padding: '3px 10px', animation: `fadePulse ${1 + (i % 4) * 0.25}s ease-in-out infinite` }}>
                      <span style={{ color: 'rgba(245,158,11,0.5)', fontSize: 11 }}>{s}</span>
                    </div>
                  ))}
                </div>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } } @keyframes fadePulse { 0%,100%{opacity:0.3} 50%{opacity:1} }`}</style>
              </div>
            ) : output ? (
              <VSLOutput output={output} />
            ) : (
              <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px dashed rgba(255,255,255,0.07)', borderRadius: 18, minHeight: 600 }} className="flex flex-col items-center justify-center gap-4 text-center px-8">
                <div style={{ width: 56, height: 56, background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.12)', borderRadius: 16 }} className="flex items-center justify-center">
                  <FileVideo style={{ width: 24, height: 24, color: 'rgba(245,158,11,0.35)' }} />
                </div>
                <div>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>Your script will appear here</p>
                  <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 13, marginTop: 4 }}>Fill the brief and generate</p>
                </div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 16, width: '100%', maxWidth: 300 }}>
                  {['Hook & Open Loop', 'Story & Problem', 'Solution & Proof', 'Offer & Guarantee', 'Urgency & CTA'].map((s, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0' }}>
                      <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                      <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: 12 }}>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}