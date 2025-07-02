// 📁 backend/routes/modelB.js
import express from "express";
import { exec } from "child_process";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// 📍 Route to run the spoilage simulation model (Python script)
router.get("/run", (req, res) => {
  const scriptPath = path.join(__dirname, "../../Models/spoilagesimulage.py");
  const cmd = `python3 "${scriptPath}"`;

  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.error("❌ Error:", stderr);
      return res.status(500).json({ error: "Model failed to run", details: stderr });
    }
    res.json({ message: "✅ Spoilage forecast completed", logs: stdout });
  });
});

// 🖼️ Serve spoilage bar chart image
router.get("/image", (req, res) => {
  const imagePath = path.join(__dirname, "../results/spoilage_chart.png");
  if (fs.existsSync(imagePath)) {
    res.sendFile(imagePath);
  } else {
    res.status(404).json({ error: "Spoilage image not found" });
  }
});

// 📊 Serve spoilage result CSV
router.get("/predictions", (req, res) => {
  const csvPath = path.join(__dirname, "../results/spoilage_output.csv");
  if (fs.existsSync(csvPath)) {
    res.sendFile(csvPath);
  } else {
    res.status(404).json({ error: "Spoilage CSV not found" });
  }
});

export default router;
