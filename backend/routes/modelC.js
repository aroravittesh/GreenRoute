import express from 'express';
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

// Run Distribution Script
router.get("/run", (req, res) => {
  const scriptPath = path.join(__dirname, "../../Models/DistributionPlanning.py");
  const cmd = `python3 "${scriptPath}"`;

  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.error("DistributionPlanning error:", stderr);
      return res.status(500).json({ error: "Model execution failed", details: stderr });
    }

    // Extract MAE and MAPE from stdout using regex
    const maeMatch = stdout.match(/MAE\s*[:=]\s*([\d.]+)/);S
    const mapeMatch = stdout.match(/MAPE\s*[:=]\s*([\d.]+)/);

    const mae = maeMatch ? parseFloat(maeMatch[1]) : null;
    const mape = mapeMatch ? parseFloat(mapeMatch[1]) : null;

    res.json({
      message: "Distribution plan complete",
      mae,
      mape,
      logs: stdout
    });
  });
});

// Serve chart image
router.get("/image", (req, res) => {
  const chartPath = path.join(__dirname, "../results/distribution_chart.png");
  if (!fs.existsSync(chartPath)) {
    return res.status(404).json({ error: "Chart image not found" });
  }
  res.sendFile(chartPath);
});

// Serve CSV data
router.get("/predictions", (req, res) => {
  const csvPath = path.join(__dirname, "../results/distribution_result.csv");
  if (!fs.existsSync(csvPath)) {
    return res.status(404).json({ error: "Prediction file not found" });
  }
  res.sendFile(csvPath);
});

export default router;
