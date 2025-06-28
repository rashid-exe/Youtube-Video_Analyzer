# 🎥 YouTube Analyzer (Fullstack App)

Analyze any YouTube video to extract:
- A screenshot of the video player
- Audio converted to `.wav` (16kHz mono)
- Transcription using AssemblyAI API
- Simulated AI probability for each sentence
- Downloadable transcript, screenshot, and audio

---

## 📁 Project Structure

youtube-analyzer/
├── frontend/ # React + Tailwind UI
├── backend/ # Node.js + Puppeteer + ffmpeg + AssemblyAI
├── README.md # You're here



---

## 🧪 Tech Stack

| Layer      | Technology                                     |
|------------|------------------------------------------------|
| Frontend   | React, Vite, Tailwind CSS, Axios, React Router |
| Backend    | Node.js, Express, Puppeteer, ytdl-core, ffmpeg |
| Transcription | AssemblyAI API                             |
| Deployment | Frontend: Vercel<br>Backend: Railway (Docker) |

---

## 🚀 Features

- Paste any public YouTube URL
- Screenshot generated using Puppeteer
- Audio extracted via `ytdl-core` & `ffmpeg`
- Transcript from **AssemblyAI**
- AI probability simulated (GPTZero logic placeholder)
- Download buttons for:
  - 📸 Screenshot
  - 🔊 Audio
  - 📄 Transcript (.json)

---

## 🧰 Local Development

### 1. Clone the Repo

```bash
git clone https://github.com/rashid-exe/Youtube-Video_Analyzer.git
cd Youtube-Video_Analyzer



cd backend
cp .env.example .env
# Add your AssemblyAI API key in .env

# Install dependencies
npm install

# Start server
node app.js
# or using Docker
docker compose up --build
cd frontend
npm install
npm run dev
Now visit: http://localhost:5173


🔐 Environment Variables
In backend/.env:
ASSEMBLYAI_API_KEY=your_real_assembly_ai_key
Don’t commit this file. Instead, include a .env.example like:
# .env.example
ASSEMBLYAI_API_KEY=your_key_here
 Deployment
🔙 Backend (Railway)
Deploy the backend/ folder using Docker

Set ASSEMBLYAI_API_KEY in Railway’s Environment Variables

Make sure Railway is pointing to the backend/ subfolder (monorepo setup)

Your backend will be live at:
https://youtube-videoanalyzer-production.up.railway.app



Frontend (Vercel)
Deploy the frontend/ folder from GitHub

Update API base URLs in:

AnalyzeForm.jsx

ResultViewer.jsx

Design Decisions
🎯 Why ytdl-core?
Easy to stream YouTube audio directly

Works locally but can fail on cloud due to bot protection

Note: For production, yt-dlp is more robust but harder to run in serverless environments

🤖 Why AssemblyAI?
Easy-to-use REST API with accurate transcriptions

Free trial credits

No GPU needed

💡 Why simulated AI probability?
GPTZero/OpenAI APIs are either paid or limited

We simulate ai_probability using Math.random() for demo purposes

👨‍💻 Developed By
Rashid Reyaz
Built for demo, portfolio & real-world learning.
Available for collaborations & freelance work 🚀







