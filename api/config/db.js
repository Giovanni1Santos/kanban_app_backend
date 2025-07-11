import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL não definida no .env');
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: process.env.NODE_ENV === 'development' ? console.log : false
});

// Testar conexão
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com o banco estabelecida.');
  } catch (error) {
    console.error('❌ Erro na conexão com o banco:', error);
  }
})();

export default sequelize;