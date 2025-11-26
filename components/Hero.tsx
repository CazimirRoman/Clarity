import React from 'react';
import { Button } from './Button';
import { ArrowRight, ShieldCheck, Zap, BarChart3 } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/50 border border-slate-800 text-indigo-400 text-xs font-medium mb-8 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          v2.0 Now Available with Gemini Pro
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-gradient-to-b from-white via-slate-200 to-slate-400 text-transparent bg-clip-text">
          Read Smarter, <br /> Not Harder.
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          The all-in-one browser extension that detects AI-written content, cuts through the fluff, and summarizes complex articles in seconds.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="group">
            Add to Chrome
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button variant="secondary" size="lg">
            View Demo
          </Button>
        </div>

        {/* Stats / Trust */}
        <div className="mt-20 pt-10 border-t border-slate-800/50 grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="p-3 bg-indigo-500/10 rounded-xl mb-3">
              <ShieldCheck className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="font-semibold text-white">AI Detection</h3>
            <p className="text-sm text-slate-500">99.9% Accuracy on GPT-4</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="p-3 bg-pink-500/10 rounded-xl mb-3">
              <Zap className="w-6 h-6 text-pink-400" />
            </div>
            <h3 className="font-semibold text-white">Fluff Remover</h3>
            <p className="text-sm text-slate-500">Save 40% reading time</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="p-3 bg-emerald-500/10 rounded-xl mb-3">
              <BarChart3 className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="font-semibold text-white">Readability Score</h3>
            <p className="text-sm text-slate-500">Instant metrics & insights</p>
          </div>
        </div>
      </div>
    </section>
  );
};