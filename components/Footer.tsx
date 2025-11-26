import React from 'react';
import { Github, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 text-sm">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-slate-500">
          © {new Date().getFullYear()} Clarity. Built with React & Gemini.
        </div>
        <div className="flex gap-6">
          <a href="#" className="text-slate-500 hover:text-indigo-400 transition-colors">Privacy Policy</a>
          <a href="#" className="text-slate-500 hover:text-indigo-400 transition-colors">Terms of Service</a>
          <div className="flex gap-4 border-l border-slate-800 pl-6 ml-2">
            <a href="#" className="text-slate-500 hover:text-white transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors">
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};