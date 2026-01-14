<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# ReactGenAI

ReactGenAI is a powerful, AI-driven tool designed to scaffold modern, responsive React components styled with Tailwind CSS from simple text descriptions. Leveraging the capabilities of Gemini AI, it allows developers to quickly generate high-quality landing pages, UI sections, and more.

## ✨ Features

- **AI-Powered Generation**: Uses Gemini 1.5 Flash / Gemini 3 Pro to generate React code.
- **Tailwind CSS Integration**: Automatically applies professional-grade Tailwind classes.
- **Responsive by Default**: All generated components are built to look great on mobile, tablet, and desktop.
- **Live Preview & Code Access**: View the generated design and copy the JSX code directly.
- **Visual Identity**: AI provides curated color palettes for each generated concept.

## 🛠 Tech Stack

- **Framework**: [React 19](https://react.dev/) (JavaScript)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **AI Models**: [Google Gemini AI](https://aistudio.google.com/)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- A Gemini API Key from [Google AI Studio](https://aistudio.google.com/app/apikey)

### Installation

1.  **Clone or download** the repository.
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Configure Environment Variables**:
    Create a `.env` file in the root directory and add your API credentials:

    ```bash
    VITE_AI_API_KEY=your_gemini_api_key_here
    ```

    _(Note: See [.env.example](.env.example) for reference)_

4.  **Run the application**:
    ```bash
    npm run dev
    ```
    The app will be available at `http://localhost:5173`.

## 📖 Usage

1. Enter a description of the website or component you want to build (e.g., "A modern SaaS landing page for an AI start-up").
2. Click **Generate**.
3. Wait for Gemini to craft your component.
4. Preview the design and copy the JSX code for use in your project.

---

View your app in AI Studio: [ReactGenAI on AI Studio](https://ai.studio/apps/drive/1BzoybK5EaXKsSd4WvCgUUPm33Bn3dqD1)
