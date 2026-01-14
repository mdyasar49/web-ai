import React, { useState, useEffect } from 'react';
import { generateWebsite } from './services/geminiService';

const App = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [copying, setCopying] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await generateWebsite(prompt);
      setResult(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to generate your website code.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.reactCode);
    setCopying(true);
    setTimeout(() => setCopying(false), 2000);
  };

  return (
    <div className={`min-h-screen bg-[#fafbfc] text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-[120px] opacity-60 animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-50 rounded-full blur-[120px] opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Navbar */}
      <nav className="bg-white/70 backdrop-blur-xl border-b border-slate-200/50 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 p-2.5 rounded-2xl shadow-lg shadow-indigo-200 ring-4 ring-white transition-transform hover:scale-105">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <span className="font-bold text-2xl tracking-tight text-slate-900">ReactGen<span className="text-indigo-600">AI</span></span>
          </div>
          <div className="hidden sm:flex gap-8 text-sm font-bold text-slate-400">
            <span className="hover:text-indigo-600 cursor-pointer transition-colors relative group">
              How it works
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
            </span>
            <span className="hover:text-indigo-600 cursor-pointer transition-colors relative group">
              Showcase
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
            </span>
            <a href="https://github.com/mdyasar49/web-ai" target="_blank" className="hover:text-indigo-600 transition-colors">GitHub</a>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-16 lg:py-24">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-4 animate-bounce">
            Powering Next-Gen Development
          </div>
          <h1 className="text-6xl sm:text-8xl font-black text-slate-900 tracking-tight leading-[0.9] mb-8">
            Magic code <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_auto] animate-gradient">for your vision.</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
            Generate high-performance, responsive React components styled with Tailwind CSS from a simple description.
          </p>
        </div>

        {/* Input Area */}
        <form onSubmit={handleGenerate} className="max-w-3xl mx-auto mb-20 relative group transition-all duration-500">
          <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 rounded-[32px] blur-xl opacity-20 group-hover:opacity-40 transition duration-1000 group-focus-within:opacity-50"></div>
          <div className="relative flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-[28px] shadow-2xl shadow-indigo-100/30 border border-slate-100 group-focus-within:border-indigo-200 transition-all">
            <input 
              type="text" 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. A modern SaaS landing page for an AI automation tool..."
              className="flex-1 px-6 py-4 text-xl outline-none bg-transparent placeholder:text-slate-300 font-medium"
              disabled={loading}
            />
            <button 
              type="submit"
              disabled={loading || !prompt.trim()}
              className="bg-indigo-600 hover:bg-slate-900 disabled:bg-slate-200 text-white px-10 py-4 rounded-2xl font-black transition-all shadow-xl shadow-indigo-200/40 flex items-center justify-center gap-3 active:scale-95 disabled:scale-100"
            >
              {loading ? (
                <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Generate
                </>
              )}
            </button>
          </div>
          
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {['SaaS Dashboard', 'Agency Portfolio', 'Crypto Wallet', 'Travel App', 'Health platform'].map((tag, i) => (
              <button 
                key={tag}
                type="button"
                onClick={() => setPrompt(`A professional ${tag} website`)}
                className="text-[10px] font-black uppercase tracking-widest bg-white border border-slate-100 text-slate-400 px-5 py-2.5 rounded-full hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all hover:shadow-lg hover:shadow-indigo-100 transform hover:-translate-y-0.5 active:translate-y-0"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                {tag}
              </button>
            ))}
          </div>
        </form>

        {/* Error State */}
        {error && (
          <div className="max-w-2xl mx-auto bg-red-50 border border-red-100 text-red-700 p-6 rounded-[24px] mb-12 flex items-start gap-4 animate-in slide-in-from-top-4 duration-300">
            <div className="p-2.5 bg-red-100 rounded-xl text-red-600 mt-0.5 shadow-inner">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="font-black text-red-900 mb-1">Generation failed</p>
              <p className="text-sm font-medium opacity-80 leading-relaxed">{error}</p>
            </div>
          </div>
        )}

        {/* Loading Animation */}
        {loading && (
          <div className="max-w-4xl mx-auto py-12 text-center animate-in fade-in duration-500">
            <div className="flex flex-col items-center gap-8">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-3 h-3 bg-purple-500 rounded-full animate-ping"></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="text-2xl font-black text-slate-900">Gemini is brainstorming...</div>
                <div className="px-4 py-2 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse inline-block">
                  Writing Production-ready JSX
                </div>
              </div>
              <div className="flex gap-2 justify-center">
                {[0, 1, 2].map(i => (
                  <div key={i} className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 150}ms` }}></div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Result Area */}
        {result && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex flex-col lg:row gap-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Meta Info Sidebar */}
                <div className="lg:col-span-4 space-y-8">
                  <div className="bg-white p-10 rounded-[32px] border border-slate-100 shadow-xl shadow-indigo-100/20 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-500"></div>
                    
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 mb-4 block">Concept Created</span>
                    <h2 className="text-4xl font-black text-slate-900 mb-6 leading-tight">{result.name}</h2>
                    <p className="text-[15px] text-slate-500 leading-relaxed font-medium mb-10">
                      {result.description}
                    </p>
                    
                    <div className="pt-8 border-t border-slate-100">
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 block">The Palette</span>
                      <div className="grid grid-cols-3 gap-4">
                        {Object.entries(result.colors).map(([key, color], idx) => (
                          <div key={key} className="group cursor-help text-center animate-in zoom-in duration-300" style={{ animationDelay: `${idx * 100}ms` }}>
                            <div 
                              className="w-full aspect-square rounded-2xl border border-white shadow-lg shadow-black/5 transition-all group-hover:scale-110 group-hover:-rotate-3" 
                              style={{ backgroundColor: color }}
                              title={key}
                            ></div>
                            <span className="text-[11px] font-bold text-slate-900 mt-3 block">{key}</span>
                            <span className="text-[9px] font-mono text-slate-400 block uppercase">{color}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-900 p-10 rounded-[32px] text-white shadow-2xl relative overflow-hidden group">
                    <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-600/30 blur-[80px] rounded-full transition-colors group-hover:bg-indigo-600/50"></div>
                    <div className="relative z-10">
                      <h3 className="text-2xl font-black mb-4">Ready to ship?</h3>
                      <p className="text-slate-400 text-sm mb-8 leading-relaxed font-medium">
                        This component is using <span className="text-white font-bold">Tailwind CSS v3+</span> and standard React hooks.
                      </p>
                      <button 
                        onClick={copyToClipboard}
                        className={`w-full py-4 rounded-2xl font-black flex items-center justify-center gap-3 transition-all transform active:scale-95 ${copying ? 'bg-emerald-500 text-white' : 'bg-white text-slate-900 hover:bg-slate-100 shadow-xl shadow-black/20'}`}
                      >
                        {copying ? (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                            Copied!
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Copy JSX Code
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Code Editor Preview */}
                <div className="lg:col-span-8 bg-[#0a0c10] rounded-[40px] overflow-hidden shadow-2xl border border-slate-800/50 flex flex-col h-[750px] shadow-indigo-200/20 translate-y-4">
                  <div className="bg-[#11141a] px-8 py-6 flex items-center justify-between border-b border-slate-800">
                    <div className="flex items-center gap-4">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                      </div>
                      <div className="h-4 w-px bg-slate-800 mx-2"></div>
                      <span className="text-[12px] font-mono font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <svg className="w-4 h-4 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                           <path d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                        </svg>
                        GeneratedSite.jsx
                      </span>
                    </div>
                    <div className="text-[10px] font-black text-indigo-400 bg-indigo-500/10 px-4 py-1.5 rounded-full border border-indigo-500/20 tracking-widest uppercase">
                      ES6 React Component
                    </div>
                  </div>
                  <div className="flex-1 overflow-auto p-10 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
                    <pre className="font-mono text-[13px] leading-8 text-slate-300 whitespace-pre">
                      <code className="text-indigo-200">{result.reactCode}</code>
                    </pre>
                  </div>
                  <div className="bg-[#11141a] px-8 py-3 flex justify-end border-t border-slate-800">
                     <span className="text-[10px] text-slate-600 font-mono tracking-tighter">Lines: {result.reactCode.split('\n').length} | UTF-8</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-24 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <div className="flex flex-col items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center shadow-inner">
                <svg className="w-6 h-6 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-black text-slate-200 tracking-[0.4em] text-sm uppercase">ReactGenAI v1.0</span>
            </div>
            <p className="text-slate-400 text-sm font-medium max-w-lg mx-auto leading-relaxed">
              Designed for speed. Engineered for precision. <br />
              Generated with the latest Gemini 2.0 Flash model.
            </p>
            <div className="h-px w-24 bg-slate-100"></div>
            <p className="text-[11px] text-slate-300 font-bold uppercase tracking-widest">
              © 2026 Crafted by Antigravity AI
            </p>
          </div>
        </div>
      </footer>

      {/* Custom Styles for Animations */}
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 6s ease infinite;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 8px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 20px;
        }
        .animate-in {
          animation-delay: 0.1s;
        }
      `}</style>
    </div>
  );
};

export default App;
