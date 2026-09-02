import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// === Mock Database ===
let users = [
  { id: 1, email: "admin@shamas.com", password: "password", role: "ADMIN", name: "Shamas" },
  { id: 2, email: "student@test.com", password: "password", role: "USER", name: "Student" }
];

let courses = [
  { id: 1, title: "Machine Learning Full Course", category: "ML", difficulty: "Beginner", duration: "10 Hours", lessons: 24, language: "English", instructor: "Shamas", thumbnail: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=600", progress: 0 }
];

let topics = [
  { id: 1, title: "Linear Regression", category: "ML", difficulty: "Beginner", description: "Learn the basics of Linear Regression.", content: "Linear regression is a linear approach to modelling the relationship between a scalar response and one or more explanatory variables.", videoId: "xyz" }
];

let pdfs = [
  { id: 1, title: "Python Basics Cheat Sheet", category: "Python", pages: 5, difficulty: "Beginner", topic: "Python", cover: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&q=80&w=600" }
];

let projects = [
  { id: 1, title: "House Price Prediction", category: "ML", difficulty: "Intermediate", tech: ["Python", "Scikit-learn"], demo: "#", github: "#", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=600" }
];

let tests = [
  { id: 1, title: "ML Basics Quiz", category: "ML", questions: 10, time: 10 }
];

// === API ROUTES (v1) ===

// Auth
app.post("/api/v1/auth/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    res.json({ token: "fake-jwt-token-" + user.id, user: { id: user.id, name: user.name, role: user.role, email: user.email } });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

app.get("/api/v1/auth/me", (req, res) => {
  res.json({ user: users[1] }); // mock logged in as student
});

// Courses
app.get("/api/v1/courses", (req, res) => res.json(courses));
app.get("/api/v1/courses/:id", (req, res) => res.json(courses.find(c => c.id === parseInt(req.params.id))));

// Topics
app.get("/api/v1/topics", (req, res) => res.json(topics));

// PDFs
app.get("/api/v1/pdfs", (req, res) => res.json(pdfs));

// Projects
app.get("/api/v1/projects", (req, res) => res.json(projects));

// YouTube Translation Mock
app.post("/api/v1/youtube/translate", (req, res) => {
  const { url, language } = req.body;
  setTimeout(() => {
    res.json({
      success: true,
      translatedText: "This is a mock translation in " + language + " for the video at " + url + ". Since you declined Firebase, this uses a mock backend. In a production app, this would use the official YouTube API and Gemini to fetch and translate the transcript."
    });
  }, 1500);
});

// Admin routes (mock protected)
app.get("/api/v1/admin/dashboard", (req, res) => {
  res.json({ stats: { users: users.length, courses: courses.length, topics: topics.length, pdfs: pdfs.length } });
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
