import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 5555;

app.use(cors());
app.use(express.json());

// API health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Mock Generation API (Replacement for Gemini Frontend call)
app.post('/api/generate', async (req, res) => {
  console.log('--- API REQUEST RECEIVED ---');
  const { prompt } = req.body;
  
  if (!prompt) {
    console.error('Error: Prompt missing');
    return res.status(400).json({ error: 'Prompt is required' });
  }

  console.log('Generating for prompt:', prompt);

  try {
    // For now, providing a structured mock response as requested
    // Later this can be connected to any AI API (OpenAI, Claude, etc.)
    const mockResponse = {
      name: "Nexus Generated Site",
      description: `A modern website built for: ${prompt}`,
      reactCode: `
import React from 'react';

const GeneratedSite = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <nav className="p-6 flex justify-between items-center border-b border-gray-800">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Nexus AI
        </h1>
        <div className="space-x-6">
          <a href="#" className="hover:text-blue-400 transition">Features</a>
          <a href="#" className="hover:text-blue-400 transition">About</a>
          <button className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition">Get Started</button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center">
          <h2 className="text-5xl font-extrabold mb-6">
            Future of Web Development: <br/>
            <span className="text-blue-500">${prompt}</span>
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Experience the power of AI-driven design with Nexus. This landing page was generated instantly based on your requirements.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition transform hover:scale-105">
              Launch Now
            </button>
            <button className="border border-gray-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition">
              View Demo
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-32">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-8 rounded-2xl bg-gray-800/50 border border-gray-700 hover:border-blue-500/50 transition">
              <div className="w-12 h-12 bg-blue-600 rounded-lg mb-6 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Feature {i}</h3>
              <p className="text-gray-400">Advanced AI capabilities integrated directly into your workflow for maximum efficiency.</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="mt-40 p-10 border-t border-gray-800 text-center text-gray-500">
        <p>© 2026 Nexus AI - All rights reserved.</p>
      </footer>
    </div>
  );
};

export default GeneratedSite;
      `,
      colors: {
        primary: "#3b82f6",
        secondary: "#06b6d4",
        accent: "#1e1b4b"
      }
    };

    res.json(mockResponse);
  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ error: 'Failed to generate content' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
