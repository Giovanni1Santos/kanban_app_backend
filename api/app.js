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

// Rota opcional para sincronizar manualmente com o banco (acessar manualmente uma vez)
app.get('/sync-database', async (req, res) => {
  try {
    await sequelize.sync({ alter: true });
    res.send('Banco sincronizado com sucesso!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao sincronizar o banco');
  }
});

export default app;
