# NanoEdit 🎨✨

[🇷🇺 Читать на русском](README_RU.md)

**NanoEdit** is a powerful, next-generation AI image editor powered by Google's **Gemini 2.5 Flash Image** model ("Nano Banana"). It allows users to modify images using natural language prompts, offering a seamless and magical editing experience.

![App Screenshot](https://via.placeholder.com/800x450.png?text=NanoEdit+Screenshot)

## 🚀 Features

- **Natural Language Editing**: Simply describe what you want to change (e.g., *"Remove the text"*, *"Add a cyberpunk filter"*, *"Turn this into a sketch"*).
- **Advanced Comparison Tools**:
  - **Slider View**: Interactive drag-slider to compare original vs. edited images.
  - **Side-by-Side**: Classic comparison layout.
  - **Toggle**: Press-and-hold to peek at the original.
- **Multi-Language Support**: Fully localized interface for **English** and **Russian** 🇷🇺.
- **High Performance**: Built with Vite and React for instant interactions.
- **Privacy Focused**: Client-side processing logic (API key handling via server-side env in production or local proxy).
- **Responsive Design**: Works beautifully on desktop and mobile devices.

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS
- **AI Model**: Google Gemini 2.5 Flash Image (`gemini-2.5-flash-image`)
- **SDK**: `@google/genai`
- **Icons**: Lucide React
- **Build Tool**: Vite

## 📦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- A Google Cloud Project with the Gemini API enabled
- An API Key from [Google AI Studio](https://aistudio.google.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/nano-edit.git
   cd nano-edit
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Create a `.env` file in the root directory:
   ```env
   API_KEY=your_google_gemini_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

## 🎮 How to Use

1. **Upload**: Drag & drop an image or click to select one from your device.
2. **Prompt**: Type instructions in the text box.
   - *Example: "Make the background black and white but keep the car red"*
3. **Generate**: Hit `Enter` or click the "Generate" button.
4. **Compare**: Use the **Slider** to see the magic happen.
5. **Download**: Save your masterpiece.

## 🌍 Localization

The app currently supports:
- English (Default)
- Russian (Toggle via the header)

To add more languages, update `contexts/LanguageContext.tsx`.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.