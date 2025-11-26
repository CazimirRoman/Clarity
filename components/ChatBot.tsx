import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { createChatSession, checkApiKey, requestApiKey } from '../services/geminiService';
import { ChatMessage } from '../types';

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi! I'm ClarityBot. Ask me anything about article analysis, AI detection, or how this extension works." }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatSessionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Check Key before chatting
    const hasKey = await checkApiKey();
    if (!hasKey) {
        try {
            await requestApiKey();
            // Re-check or assume successful if no error
        } catch (e) {
            setMessages(prev => [...prev, { role: 'model', text: "I need an API key to function. Please try again." }]);
            return;
        }
    }

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      if (!chatSessionRef.current) {
        chatSessionRef.current = createChatSession();
      }

      const result = await chatSessionRef.current.sendMessage({ message: userMsg });
      const responseText = result.text;

      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (e) {
      console.error("Chat error", e);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error connecting to Gemini. Please check your API key." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 ${
            isOpen ? 'bg-slate-800 rotate-90' : 'bg-indigo-600 rotate-0'
        }`}
      >
        {isOpen ? <X className="w-6 h-6 text-white" /> : <MessageSquare className="w-6 h-6 text-white" />}
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl transition-all duration-300 transform origin-bottom-right flex flex-col z-40 ${
        isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
      }`} style={{ height: '500px' }}>
        
        {/* Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-900 rounded-t-2xl flex items-center gap-3">
          <div className="p-2 bg-indigo-500/20 rounded-lg">
            <Bot className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Clarity Assistant</h3>
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
              Powered by Gemini Pro
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                msg.role === 'user' ? 'bg-slate-700' : 'bg-indigo-600'
              }`}>
                {msg.role === 'user' ? <User className="w-4 h-4 text-slate-300" /> : <Bot className="w-4 h-4 text-white" />}
              </div>
              <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-slate-800 text-white rounded-tr-sm' 
                  : 'bg-indigo-900/30 text-slate-200 border border-indigo-500/20 rounded-tl-sm'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-3">
               <div className="w-8 h-8 rounded-full bg-indigo-600 flex-shrink-0 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
               </div>
               <div className="bg-indigo-900/30 border border-indigo-500/20 p-3 rounded-2xl rounded-tl-sm flex items-center gap-1">
                 <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></span>
                 <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></span>
                 <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-slate-800 bg-slate-900 rounded-b-2xl">
          <div className="relative">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask a question..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-colors"
            >
              {isTyping ? <Loader2 className="w-4 h-4 animate-spin"/> : <Send className="w-4 h-4" />}
            </button>
          </div>
        </div>

      </div>
    </>
  );
};
