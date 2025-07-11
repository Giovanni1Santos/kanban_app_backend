import express from 'express';
import cors from 'cors';
import cardRoutes from './routes/cardRoutes.js';
import authRoutes from './auth/authRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/favicon.ico', (req, res) => res.status(204).end());

app.get('/', (req, res) => res.json({ status: 'Kanban API', timestamp: new Date() }));

app.use('/auth', authRoutes);
app.use('/cards', cardRoutes);

export default app;
