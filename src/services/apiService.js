
export const generateWebsite = async (prompt) => {
  const apiKey = import.meta.env.VITE_AI_API_KEY;
  const apiUrl = import.meta.env.VITE_API_URL || 'https://api.openai.com/v1/chat/completions';

  const promptText = `Act as an expert React developer. Create a complete, modern, and beautiful single-file React component (using Tailwind CSS) for a website based on this request: "${prompt}".
    
    The response must be a JSON object with EXACTLY the following structure:
    {
      "name": "A short name for the site",
      "description": "A brief description of design choices",
      "reactCode": "The full source code for a single React component named 'GeneratedSite'",
      "colors": {
        "primary": "Hex color code",
        "secondary": "Hex color code",
        "accent": "Hex color code"
      }
    }
    
    Technical requirements:
    - Use React Functional Component syntax.
    - Use only standard React hooks (useState, useEffect) if needed.
    - DO NOT use external icon libraries. Use inline SVGs.
    - Use Tailwind CSS classes.
    - Fully responsive.
    - Include Navigation, Hero, Features, Testimonials, and Footer.`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o", // Default model for OpenAI-compatible APIs
        messages: [
          {
            role: "system",
            content: "You are a specialized React and Tailwind UI generator. You only output valid JSON."
          },
          {
            role: "user",
            content: promptText
          }
        ],
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    if (!content) throw new Error("Empty response from AI");
    return JSON.parse(content);
  } catch (err) {
    console.error("API Service Error:", err);
    throw err;
  }
};
