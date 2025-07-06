import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import modelARoutes from './routes/modelA.js'; // ✅ add this line
import modelBRoutes from './routes/modelB.js';
import modelCRoutes from './routes/modelC.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/ping', (req, res) => {
  res.send('pong');
});

// Routes
app.use('/api', authRoutes);
app.use('/api/model-a', modelARoutes); // ✅ this mounts all /model-a endpoints
app.use('/api/model-b', modelBRoutes);
app.use("/api/model-c", modelCRoutes);

const PORT = process.env.PORT || 5786;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
