import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// === API ROUTES ===

// YouTube Translation Mock -> Real Gemini API
app.post("/api/v1/youtube/translate", async (req, res) => {
  const { url, language } = req.body;
  
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_api_key_here') {
    return res.status(500).json({ 
      success: false, 
      error: "GEMINI_API_KEY is missing. Please add it to your .env file or AI Studio secrets." 
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    // In a full implementation, you would fetch the YouTube transcript here.
    // For now, we simulate fetching the transcript and translating it with Gemini.
    const prompt = `Simulate translating the video at ${url} into ${language}. Provide a generic but realistic sounding translation output of what an educational AI/ML course video might contain.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt
    });

    res.json({
      success: true,
      translatedText: response.text
    });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// === Vite Middleware for Dev & Prod Static Serving ===
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
