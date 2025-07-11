import sequelize from './config/db.js';
import './models/User.js';
import './models/Card.js';

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('✅ Banco sincronizado com sucesso!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Erro ao sincronizar o banco:', err);
    process.exit(1);
  }
})();
