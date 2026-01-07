
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface GeneratedWebsite {
  name: string;
  description: string;
  reactCode: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export const generateWebsite = async (prompt: string): Promise<GeneratedWebsite> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Act as an expert React developer. Create a complete, modern, and beautiful single-file React component (using Tailwind CSS) for a website based on this request: "${prompt}".
    
    The response must be valid JSON and include:
    1. A short name for the site.
    2. A brief description of the design choices.
    3. The full source code for a single React component named 'GeneratedSite'. 
    4. A set of hex colors used in the design.
    
    Technical requirements:
    - Use React Functional Component syntax.
    - Use only standard React hooks (useState, useEffect) if needed.
    - DO NOT use external icon libraries like Lucide. Instead, write clean, inline SVG code for all icons.
    - Use professional Tailwind CSS classes for layout, typography, and spacing.
    - Ensure it's fully responsive (mobile, tablet, desktop).
    - Include a Navigation, Hero, Features, Testimonials, and a Footer.`,
    config: {
      responseMimeType: "application/json",
      thinkingConfig: { thinkingBudget: 5000 },
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          description: { type: Type.STRING },
          reactCode: { type: Type.STRING, description: "The full React component code as a string." },
          colors: {
            type: Type.OBJECT,
            properties: {
              primary: { type: Type.STRING },
              secondary: { type: Type.STRING },
              accent: { type: Type.STRING }
            },
            required: ["primary", "secondary", "accent"]
          }
        },
        required: ["name", "description", "reactCode", "colors"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("Empty response from AI");
  return JSON.parse(text) as GeneratedWebsite;
};
