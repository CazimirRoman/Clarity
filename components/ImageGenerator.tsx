import React, { useState } from 'react';
import { Button } from './Button';
import { generateBlogImage, checkApiKey, requestApiKey } from '../services/geminiService';
import { ImageSize } from '../types';
import { Image as ImageIcon, Download, Maximize2, Loader2, Settings2 } from 'lucide-react';

export const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState<ImageSize>(ImageSize.SIZE_1K);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!prompt) return;
    setError('');

    // Mandatory key check for Pro models
    const hasKey = await checkApiKey();
    if (!hasKey) {
        try {
            await requestApiKey();
            // We need to verify again or just proceed. 
            // In a real app we'd wait for a callback, but here we assume success if no error thrown immediately
        } catch (e) {
            setError("API Key selection cancelled or failed.");
            return;
        }
    }

    setLoading(true);
    try {
      const imgData = await generateBlogImage(prompt, size);
      setGeneratedImage(imgData);
    } catch (e: any) {
      setError(e.message || "Failed to generate image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 relative border-t border-slate-800/50">
       <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                    <ImageIcon className="w-5 h-5 text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Visualizer</h2>
              </div>
              <p className="text-slate-400 max-w-lg">
                Create stunning, relevant header images for your articles using our integrated <span className="text-purple-400">Gemini 3 Pro</span> engine.
              </p>
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
             <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[500px]">
                
                {/* Controls */}
                <div className="p-8 border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col gap-6">
                   <div className="space-y-2">
                     <label className="text-sm font-medium text-slate-300">Image Prompt</label>
                     <textarea 
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="w-full h-32 bg-slate-950 border border-slate-700 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none resize-none transition-all placeholder:text-slate-600"
                        placeholder="e.g. A futuristic library with floating holographic books..."
                     />
                   </div>

                   <div className="space-y-2">
                     <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                        <Settings2 className="w-4 h-4" />
                        Resolution
                     </label>
                     <div className="grid grid-cols-3 gap-2">
                        {Object.values(ImageSize).map((s) => (
                           <button
                              key={s}
                              onClick={() => setSize(s)}
                              className={`py-2 text-sm font-medium rounded-md border transition-all ${
                                size === s 
                                ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-900/20' 
                                : 'bg-slate-950 border-slate-700 text-slate-400 hover:border-slate-600'
                              }`}
                           >
                             {s}
                           </button>
                        ))}
                     </div>
                   </div>

                   <div className="pt-4 mt-auto">
                     <Button 
                        onClick={handleGenerate} 
                        disabled={loading || !prompt}
                        className="w-full !bg-purple-600 hover:!bg-purple-700 !shadow-purple-500/20"
                     >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2"/> : <Maximize2 className="w-4 h-4 mr-2" />}
                        Generate Image
                     </Button>
                     {error && <p className="text-red-400 text-xs mt-3 text-center">{error}</p>}
                   </div>
                </div>

                {/* Preview */}
                <div className="lg:col-span-2 bg-slate-950 relative flex items-center justify-center p-8 group">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950"></div>
                    
                    {/* Grid Pattern */}
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#4b5563 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

                    {generatedImage ? (
                        <div className="relative z-10 w-full max-w-2xl rounded-lg overflow-hidden shadow-2xl shadow-black border border-slate-800 group-hover:scale-[1.01] transition-transform duration-500">
                           <img src={generatedImage} alt="Generated result" className="w-full h-auto object-cover" />
                           <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                              <a 
                                href={generatedImage} 
                                download="clarity-gen.png" 
                                className="p-2 bg-black/50 backdrop-blur-md text-white rounded-lg hover:bg-black/70 flex items-center gap-2 text-sm font-medium border border-white/10"
                              >
                                <Download className="w-4 h-4" />
                                Save
                              </a>
                           </div>
                        </div>
                    ) : (
                        <div className="relative z-10 text-center space-y-4 max-w-sm">
                           <div className="w-20 h-20 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-center mx-auto shadow-xl transform rotate-3">
                              <ImageIcon className="w-8 h-8 text-slate-600" />
                           </div>
                           <h3 className="text-lg font-medium text-slate-300">Ready to visualize</h3>
                           <p className="text-sm text-slate-500">Enter a prompt and select a resolution to generate high-quality assets powered by Gemini Nano Banana Pro.</p>
                        </div>
                    )}
                </div>

             </div>
          </div>
       </div>
    </section>
  );
};
