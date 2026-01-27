import express from "express";
import healthRoutes from "./routes/health.js";
import pasteRoutes from "./routes/pastes.js";

const app = express();

app.use(express.json());

app.use("/api/healthz", healthRoutes);
app.use("/api/pastes", pasteRoutes);

// HTML view route
import { renderPasteHtml } from "./controllers/pasteController.js";
app.get("/p/:id", renderPasteHtml);

// Fallback
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

export default app;
