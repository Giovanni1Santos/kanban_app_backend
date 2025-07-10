import express from 'express';
import cors from 'cors';
import sequelize from './config/db.js';
import './models/Card.js';
import './models/User.js';
import cardRoutes from './routes/cardRoutes.js';
import authRoutes from './auth/authRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_, res) => res.send('API Kanban com Login funcionando!'));

app.use('/auth', authRoutes);
app.use('/cards', cardRoutes);

await sequelize.sync();

export default app;
