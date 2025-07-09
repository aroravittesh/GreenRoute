import express from 'express';
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

// 📦 Run Distribution Model
router.get("/run", (req, res) => {
  const scriptPath = path.join(__dirname, "../../Models/DistributionPlanning.py");
  const cmd = `python3 "${scriptPath}"`;

  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.error("❌ DistributionPlanning error:", stderr);
      return res.status(500).json({ error: "Model execution failed", details: stderr });
    }

    console.log("✅ DistributionPlanning completed");
    res.json({ message: "Distribution plan generated successfully" });
  });
});

// 🖼️ Serve Distribution Chart
router.get("/image", (req, res) => {
  const chartPath = path.join(__dirname, "../results/final_distribution_chart.png");
  if (!fs.existsSync(chartPath)) {
    return res.status(404).json({ error: "Chart image not found" });
  }
  res.sendFile(chartPath);
});

// 📄 Serve CSV Data
router.get("/predictions", (req, res) => {
  const csvPath = path.join(__dirname, "../results/final_distribution.csv");
  if (!fs.existsSync(csvPath)) {
    return res.status(404).json({ error: "Distribution CSV not found" });
  }
  res.sendFile(csvPath);
});

export default router;
