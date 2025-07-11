import express from 'express';
import cors from 'cors';
import sequelize from './config/db.js';
import cardRoutes from './routes/cardRoutes.js';
import authRoutes from './auth/authRoutes.js';

const app = express();

// Configurações
app.use(cors());
app.use(express.json());

// Ignora favicon
app.get('/favicon.ico', (req, res) => res.status(204).end());

// Rota de saúde
app.get('/', (req, res) => {
  res.json({ status: 'API Kanban Online', timestamp: new Date() });
});

// Rotas
app.use('/auth', authRoutes);
app.use('/cards', cardRoutes);

// Sincronização do banco (apenas para desenvolvimento)
if (process.env.NODE_ENV === 'development') {
  app.get('/sync-db', async (req, res) => {
    try {
      await sequelize.sync({ alter: true });
      res.json({ message: 'Banco sincronizado com sucesso' });
    } catch (error) {
      console.error('Erro na sincronização:', error);
      res.status(500).json({ error: 'Erro ao sincronizar banco' });
    }
  });
}

// Middleware de erro global
app.use((err, req, res, next) => {
  console.error('Erro não tratado:', err);
  res.status(500).json({ error: 'Erro interno no servidor' });
});

export default app;