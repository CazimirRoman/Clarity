import React from 'react';
import { Hero } from './components/Hero';
import { Demo } from './components/Demo';
import { ImageGenerator } from './components/ImageGenerator';
import { ChatBot } from './components/ChatBot';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* Navigation (Simple) */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800/50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="font-bold text-white text-lg">C</span>
            </div>
            <span className="font-bold text-lg tracking-tight">Clarity</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Features</a>
            <a href="#" className="hover:text-white transition-colors">Testimonials</a>
            <a href="#" className="hover:text-white transition-colors">Pricing</a>
          </div>
          <button className="px-4 py-2 bg-slate-100 text-slate-900 rounded-lg text-sm font-semibold hover:bg-white transition-colors">
            Download
          </button>
        </div>
      </nav>

      <main>
        <Hero />
        
        {/* Features Grid Brief */}
        <section className="py-20 bg-slate-950">
           <div className="container mx-auto px-6">
              <div className="text-center max-w-2xl mx-auto mb-16">
                 <h2 className="text-3xl font-bold mb-4">Why use Clarity?</h2>
                 <p className="text-slate-400">Stop wasting time on AI-generated fluff. Get straight to the point with advanced linguistic analysis.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                  {[
                      { title: "Fluff Detection", desc: "Highlights vague sentences and filler words that add no value.", color: "bg-pink-500" },
                      { title: "AI Pattern Rec.", desc: "Identifies sentence structures common in LLM outputs.", color: "bg-indigo-500" },
                      { title: "Smart Summary", desc: "Generates a one-paragraph summary of the core value prop.", color: "bg-emerald-500" }
                  ].map((f, i) => (
                      <div key={i} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors">
                          <div className={`w-2 h-2 rounded-full ${f.color} mb-4`}></div>
                          <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                          <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                      </div>
                  ))}
              </div>
           </div>
        </section>

        <Demo />
        <ImageGenerator />
      </main>

      <Footer />
      
      {/* Floating Chat */}
      <ChatBot />
    </div>
  );
};

export default App;