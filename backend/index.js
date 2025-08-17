// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import authRoutes from './routes/authRoutes.js';
// import modelARoutes from './routes/modelA.js'; // ✅ add this line
// import modelBRoutes from './routes/modelB.js';
// import modelCRoutes from './routes/modelC.js';

// dotenv.config();
// const app = express();

// app.use(cors());
// app.use(express.json());

// app.get('/ping', (req, res) => {
//   res.send('pong');
// });

// // Routes
// app.use('/api', authRoutes);
// app.use('/api/model-a', modelARoutes); // ✅ this mounts all /model-a endpoints
// app.use('/api/model-b', modelBRoutes);
// app.use("/api/model-c", modelCRoutes);

// const PORT = process.env.PORT || 5786;
// app.listen(PORT, '0.0.0.0', () => console.log(`✅ Server running on port ${PORT}`));
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import modelARoutes from './routes/modelA.js';
import modelBRoutes from './routes/modelB.js';
import modelCRoutes from './routes/modelC.js';

dotenv.config();
const app = express();

// ✅ Enable CORS for frontend access
app.use(cors({
  origin: ["http://localhost:5173", "http://54.197.3.23", "https://sanchaya-web.web.app"],
  methods: ["GET", "POST"],
  credentials: true,
}));

app.use(express.json());

// ✅ Health check
app.get('/ping', (req, res) => {
  res.send('pong');
});

// ✅ Optional CORS test endpoint
app.get('/api/test-cors', (req, res) => {
  res.json({ status: 'CORS working ✅' });
});

// ✅ Route mounting
app.use('/api', authRoutes);
app.use('/api/model-a', modelARoutes);
app.use('/api/model-b', modelBRoutes);
app.use('/api/model-c', modelCRoutes);

// ✅ Start server on port 5786
const PORT = process.env.PORT || 5786;
app.listen(PORT, "127.0.0.1", () => {
  console.log(`✅ Server running on http://127.0.0.1:${PORT}`);
});

