// import express from "express";
// import { exec } from "child_process";
// import path from "path";
// import fs from "fs";
// import { fileURLToPath } from "url";

// const router = express.Router();
// const __dirname = path.dirname(fileURLToPath(import.meta.url));

// // Run model
// router.get("/run", (req, res) => {
//   const storeId = req.query.store_id;
//   const productId = req.query.product_id;

//   if (!storeId || !productId) {
//     return res.status(400).json({ error: "Missing store_id or product_id" });
//   }

//   const scriptPath = path.join(__dirname, "../../Models/ForeCast.py");
//   const cmd = `python3 "${scriptPath}" ${storeId} ${productId}`;

//   exec(cmd, (err, stdout, stderr) => {
//     if (err) {
//       console.error(stderr);
//       return res.status(500).json({ error: "Model execution failed", details: stderr });
//     }
//     res.json({ message: "Model A executed successfully", logs: stdout });
//   });
// });

// // Serve forecast plot
// router.get("/image", (req, res) => {
//   res.sendFile(path.join(__dirname, "../results/a_plot.png"));
// });

// // Serve predictions CSV
// router.get("/predictions", (req, res) => {
//   res.sendFile(path.join(__dirname, "../results/a_predictions.csv"));
// });

// // Serve metrics JSON
// router.get("/metrics", (req, res) => {
//   const metrics = JSON.parse(fs.readFileSync(path.join(__dirname, "../results/a_metrics.json")));
//   res.json(metrics);
// });

// // Serve top (store, product) options
// router.get("/options", (req, res) => {
//   const scriptPath = path.join(__dirname, "../../model/model_a_options.py");

//   exec(`python3 "${scriptPath}"`, (err, stdout, stderr) => {
//     if (err) {
//       console.error("Option fetch error:", stderr);
//       return res.status(500).json({ error: "Failed to retrieve options" });
//     }

//     try {
//       const parsed = JSON.parse(stdout);
//       res.json(parsed);
//     } catch (jsonErr) {
//       console.error("JSON parse error:", jsonErr);
//       res.status(500).json({ error: "Invalid JSON format" });
//     }
//   });
// });

// export default router;
// 📁 backend/routes/modelA.js
// 📁 backend/routes/modelA.js
// import express from 'express';
// import { exec } from 'child_process';
// import path from 'path';
// import fs from 'fs';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const router = express.Router();

// router.get("/run", (req, res) => {
//   const productId = req.query.product_id;
//   if (!productId) return res.status(400).json({ error: "Missing product_id" });

//   const scriptPath = path.join(__dirname, "../../Models/ForeCast.py");
//   const cmd = `python3 "${scriptPath}" ${productId}`;

//   exec(cmd, (err, stdout, stderr) => {
//     if (err) {
//       console.error(stderr);
//       return res.status(500).json({ error: "Model execution failed", details: stderr });
//     }
//     res.json({ message: "Forecast for top 5 stores executed", logs: stdout });
//   });
// });

// router.get("/forecast/image", (req, res) => {
//   res.sendFile(path.join(__dirname, "../results/combined_forecast_top5.png"));
// });

// router.get("/forecast/data", (req, res) => {
//   res.sendFile(path.join(__dirname, "../results/combined_forecast_top5.csv"));
// });

// export default router;
// 📁 backend/routes/modelA.js
// 📁 backend/routes/modelA.js
// import express from 'express';
// import { exec } from 'child_process';
// import path from 'path';
// import fs from 'fs';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const router = express.Router();

// router.get("/run", (req, res) => {
//   const productId = req.query.product_id;
//   if (!productId) return res.status(400).json({ error: "Missing product_id" });

//   const scriptPath = path.join(__dirname, "../../Models/ForeCast.py");
//   const cmd = `python3 "${scriptPath}" ${productId}`;

//   exec(cmd, (err, stdout, stderr) => {
//     if (err) {
//       console.error(stderr);
//       return res.status(500).json({ error: "Model execution failed", details: stderr });
//     }
//     res.json({ message: "Forecast for top 5 stores executed", logs: stdout });
//   });
// });

// router.get("/forecast/image", (req, res) => {
//   res.sendFile(path.join(__dirname, "../results/combined_forecast_top5.png"));
// });

// router.get("/forecast/data", (req, res) => {
//   res.sendFile(path.join(__dirname, "../results/combined_monthly_sales_top5_one_month.csv"));
// });

// export default router;
import express from 'express';
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

router.get("/run", (req, res) => {
  const productId = req.query.product_id;
  if (!productId) return res.status(400).json({ error: "Missing product_id" });

  const scriptPath = path.join(__dirname, "../../Models/ForeCast.py");
  const cmd = `python3 "${scriptPath}" ${productId}`;

  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.error(stderr);
      return res.status(500).json({ error: "Model execution failed", details: stderr });
    }
    res.json({ message: "30-day Forecast run complete", logs: stdout });
  });
});

router.get("/chart", (req, res) => {
  res.sendFile(path.join(__dirname, "../results/monthly_bar_chart.png"));
});

router.get("/data", (req, res) => {
  res.sendFile(path.join(__dirname, "../results/monthly_bar_chart_data.csv"));
});

export default router;
