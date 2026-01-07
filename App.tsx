
import React, { useState } from 'react';
import { generateWebsite, GeneratedWebsite } from './services/geminiService';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GeneratedWebsite | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copying, setCopying] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await generateWebsite(prompt);
      setResult(data);
    } catch (err: any) {
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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-200">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">ReactGen<span className="text-indigo-600">AI</span></span>
          </div>
          <div className="hidden sm:flex gap-6 text-sm font-semibold text-slate-500">
            <span className="hover:text-indigo-600 cursor-pointer transition-colors">How it works</span>
            <span className="hover:text-indigo-600 cursor-pointer transition-colors">Showcase</span>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12 lg:py-20">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-5xl sm:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
            Build your next site <br className="hidden sm:block" />
            <span className="text-indigo-600">with React & AI.</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Generate high-performance, responsive React components styled with Tailwind CSS from a simple description.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleGenerate} className="max-w-3xl mx-auto mb-20 relative group">
          <div className="absolute -inset-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative flex flex-col sm:flex-row gap-3 bg-white p-3 rounded-[24px] shadow-2xl shadow-indigo-100/50 border border-slate-100">
            <input 
              type="text" 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. A modern SaaS landing page for an AI automation tool..."
              className="flex-1 px-5 py-4 text-lg outline-none bg-transparent placeholder:text-slate-400 font-medium"
              disabled={loading}
            />
            <button 
              type="submit"
              disabled={loading || !prompt.trim()}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-indigo-200/50 flex items-center justify-center gap-3"
            >
              {loading ? (
                <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Generate
                </>
              )}
            </button>
          </div>
          
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {['E-commerce', 'Portfolio', 'Fitness App', 'Real Estate', 'Food Delivery'].map(tag => (
              <button 
                key={tag}
                type="button"
                onClick={() => setPrompt(`A professional ${tag} website`)}
                className="text-xs font-bold uppercase tracking-widest bg-slate-100 text-slate-400 px-4 py-2 rounded-full hover:bg-indigo-50 hover:text-indigo-600 transition-all border border-transparent hover:border-indigo-100"
              >
                {tag}
              </button>
            ))}
          </div>
        </form>

        {/* Error */}
        {error && (
          <div className="max-w-2xl mx-auto bg-red-50 border border-red-100 text-red-700 p-5 rounded-2xl mb-12 flex items-start gap-4">
            <div className="p-2 bg-red-100 rounded-lg text-red-600 mt-0.5">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-red-800">Something went wrong</p>
              <p className="text-sm opacity-90">{error}</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="max-w-4xl mx-auto space-y-6 text-center">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-sm font-bold animate-pulse">
              <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
              Gemini is coding your React component...
            </div>
            <div className="space-y-4 max-w-2xl mx-auto">
              <div className="h-4 bg-slate-200 rounded-full w-full animate-pulse"></div>
              <div className="h-4 bg-slate-200 rounded-full w-5/6 mx-auto animate-pulse"></div>
              <div className="h-4 bg-slate-200 rounded-full w-4/6 mx-auto animate-pulse"></div>
            </div>
          </div>
        )}

        {/* Result Area */}
        {result && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <div className="flex flex-col lg:flex-row gap-10">
              {/* Meta Info */}
              <div className="lg:w-80 flex-shrink-0 space-y-6">
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 mb-2 block">Site Concept</span>
                  <h2 className="text-3xl font-black text-slate-900 mb-4">{result.name}</h2>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">
                    {result.description}
                  </p>
                  
                  <div className="mt-8 pt-8 border-t border-slate-100">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 block">Visual Identity</span>
                    <div className="grid grid-cols-3 gap-3">
                      {Object.entries(result.colors).map(([key, color]) => (
                        <div key={key} className="group cursor-help">
                          <div 
                            className="w-full aspect-square rounded-2xl border border-slate-200 shadow-sm transition-transform group-hover:scale-105" 
                            style={{ backgroundColor: color }}
                            title={key}
                          ></div>
                          <span className="text-[9px] font-mono font-bold text-slate-400 mt-2 block text-center truncate">{color}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/20 blur-3xl -mr-10 -mt-10 group-hover:bg-indigo-600/40 transition-colors"></div>
                  <h3 className="font-black text-lg mb-4 relative z-10">Ready to Ship?</h3>
                  <div className="space-y-4 text-sm text-slate-400 relative z-10">
                    <p>This code is optimized for <span className="text-white font-bold">Tailwind CSS v3+</span>. </p>
                    <button 
                      onClick={copyToClipboard}
                      className="w-full bg-white text-slate-900 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-50 transition-colors"
                    >
                      Copy JSX Code
                    </button>
                  </div>
                </div>
              </div>

              {/* Code Viewer */}
              <div className="flex-1 bg-slate-900 rounded-[32px] overflow-hidden shadow-2xl border border-slate-800 flex flex-col h-[700px]">
                <div className="bg-slate-800/50 px-8 py-5 flex items-center justify-between border-b border-slate-700/50">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400/30"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-400/30"></div>
                      <div className="w-3 h-3 rounded-full bg-emerald-400/30"></div>
                    </div>
                    <span className="ml-4 text-[11px] font-mono font-bold text-slate-500 uppercase tracking-widest">GeneratedSite.jsx</span>
                  </div>
                  <div className="text-[10px] font-bold text-indigo-400/80 bg-indigo-400/10 px-3 py-1 rounded-full border border-indigo-400/20">
                    READY FOR REACT
                  </div>
                </div>
                <div className="flex-1 overflow-auto p-8 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                  <pre className="font-mono text-sm leading-7 text-indigo-100/90 whitespace-pre">
                    <code>{result.reactCode}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-slate-200 py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="font-bold text-slate-300 tracking-widest text-xs uppercase">Generated with Gemini 3 Pro</span>
          </div>
          <p className="text-slate-400 text-sm font-medium">
            The intelligent way to scaffold modern web applications.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
