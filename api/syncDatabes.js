app.get('/sync-database', async (req, res) => {
  try {
    await sequelize.sync({ alter: true });
    res.send('Banco sincronizado com sucesso!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao sincronizar o banco');
  }
});
