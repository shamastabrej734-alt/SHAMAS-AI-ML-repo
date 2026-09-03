import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// === API ROUTES ===

// YouTube Translation Mock
app.post("/api/v1/youtube/translate", (req, res) => {
  const { url, language } = req.body;
  setTimeout(() => {
    res.json({
      success: true,
      translatedText: `This is a simulated translation in ${language} for the video at ${url}. In a full production deployment, this endpoint uses the Google GenAI SDK (Gemini) and the YouTube Transcript API to fetch and translate the video content.`
    });
  }, 1500);
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
