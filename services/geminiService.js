
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_AI_API_KEY);

export const generateWebsite = async (prompt) => {
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash',
    generationConfig: {
      responseMimeType: "application/json",
    },
  });

  const promptText = `Act as an expert React developer. Create a complete, modern, and beautiful single-file React component (using Tailwind CSS) for a website based on this request: "${prompt}".
    
    The response must be valid JSON and include:
    1. "name": A short name for the site.
    2. "description": A brief description of the design choices.
    3. "reactCode": The full source code for a single React component named 'GeneratedSite'. 
    4. "colors": A set of hex colors used in the design (primary, secondary, accent).
    
    Technical requirements:
    - Use React Functional Component syntax.
    - Use only standard React hooks (useState, useEffect) if needed.
    - DO NOT use external icon libraries like Lucide. Instead, write clean, inline SVG code for all icons.
    - Use professional Tailwind CSS classes for layout, typography, and spacing.
    - Ensure it's fully responsive (mobile, tablet, desktop).
    - Include a Navigation, Hero, Features, Testimonials, and a Footer.`;

  const result = await model.generateContent(promptText);
  const response = await result.response;
  const text = response.text();
  
  if (!text) throw new Error("Empty response from AI");
  return JSON.parse(text);
};
