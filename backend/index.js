import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.use('/api', authRoutes);

const PORT = process.env.PORT || 5786;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));