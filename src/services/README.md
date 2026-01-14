# Services

This directory contains logic for interacting with AI models and external APIs.

## Available Services

- **[geminiService.js](file:///d:/web-ai/src/services/geminiService.js)**: The primary service implementation using **Gemini 2.0 Flash** via the `@google/generative-ai` library.
- **[apiService.js](file:///d:/web-ai/src/services/apiService.js)**: A general-purpose API client designed to work with **OpenAI-compatible endpoints** (can be configured via environment variables).

## Configuration

Services rely on environment variables defined in your `.env` file, primarily `VITE_AI_API_KEY`.
