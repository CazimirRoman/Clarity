import React, { useState } from 'react';
import { Button } from './Button';
import { analyzeText, checkApiKey, requestApiKey } from '../services/geminiService';
import { Loader2, Sparkles, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const Demo: React.FC = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!text) return;
    
    // Key Check
    const hasKey = await checkApiKey();
    if (!hasKey) {
        try {
            await requestApiKey();
        } catch (e) {
            console.error(e);
            return;
        }
    }

    setLoading(true);
    try {
      const jsonStr = await analyzeText(text);
      // Clean markdown if present
      const cleanJson = jsonStr.replace(/```json/g, '').replace(/```/g, '').trim();
      setResult(JSON.parse(cleanJson));
    } catch (e) {
      console.error("Analysis failed", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-slate-900/50 border-y border-slate-800">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left: Input */}
          <div>
            <h2 className="text-3xl font-bold mb-6">See it in action</h2>
            <p className="text-slate-400 mb-8">
              Paste any article text below to see how Clarity analyzes content for quality, AI patterns, and usefulness.
            </p>
            
            <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 focus-within:ring-2 focus-within:ring-indigo-500/50 transition-all">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste article content here..."
                className="w-full h-64 bg-transparent p-4 text-slate-300 placeholder:text-slate-600 focus:outline-none resize-none"
              />
              <div className="p-2 flex justify-between items-center border-t border-slate-800/50 bg-slate-900/50 rounded-b-lg">
                <span className="text-xs text-slate-500">{text.length} characters</span>
                <Button onClick={handleAnalyze} disabled={loading || !text.length} size="sm">
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Analyze Text
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Right: Output */}
          <div className="relative">
             <div className="absolute inset-0 bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none" />
             
             <div className={`h-full min-h-[400px] border border-slate-800 bg-slate-950/80 backdrop-blur-md rounded-2xl p-6 transition-all duration-500 ${!result ? 'flex items-center justify-center' : ''}`}>
                {!result ? (
                  <div className="text-center text-slate-500">
                    <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-800">
                      <BarChart3 className="w-8 h-8 opacity-50" />
                    </div>
                    <p>Analysis results will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-3">Analysis Summary</h3>
                      <p className="text-slate-200 leading-relaxed bg-slate-900/50 p-4 rounded-lg border border-slate-800/50">
                        {result.summary}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-slate-900/30 border border-slate-800">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-slate-400">Usefulness Score</span>
                          {result.score > 70 ? <CheckCircle2 className="w-4 h-4 text-emerald-500"/> : <AlertTriangle className="w-4 h-4 text-amber-500"/>}
                        </div>
                        <div className="text-3xl font-bold text-white">{result.score}/100</div>
                        <div className="w-full bg-slate-800 h-1.5 mt-3 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400" style={{width: `${result.score}%`}}></div>
                        </div>
                      </div>

                      <div className="p-4 rounded-lg bg-slate-900/30 border border-slate-800">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-slate-400">AI Likelihood</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300">Beta</span>
                        </div>
                        <div className="text-3xl font-bold text-white">{result.ai}%</div>
                        <div className="w-full bg-slate-800 h-1.5 mt-3 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500" style={{width: `${result.ai}%`}}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-slate-900/30 border border-slate-800">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-slate-400">Fluff Percentage</span>
                          <span className="text-xs text-slate-500">Words that add no value</span>
                        </div>
                        <div className="flex items-end gap-2">
                            <span className="text-3xl font-bold text-white">{result.fluff}%</span>
                            <span className="text-sm text-slate-500 mb-1">detected</span>
                        </div>
                    </div>

                  </div>
                )}
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};
import { BarChart3 } from 'lucide-react';
