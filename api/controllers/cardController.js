import Card from '../models/Card.js';

export async function getAllCards(req, res) {
  try {
    const cards = await Card.findAll({
      where: { userId: req.user.id, deleted: false }
    });
    res.json(cards);
  } catch (error) {
    console.error('Erro ao buscar cartões:', error);
    res.status(500).json({ error: 'Erro interno ao buscar cartões' });
  }
}

// ... (outras funções seguem o mesmo padrão com try/catch)

export async function createCard(req, res) {
  const { title, description, status } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Título é obrigatório' });
  }

  try {
    const card = await Card.create({
      title,
      description: description || '',
      status: status || 'todo',
      userId: req.user.id
    });
    res.status(201).json(card);
  } catch (error) {
    console.error('Erro ao criar cartão:', error);
    res.status(500).json({ error: 'Erro interno ao criar cartão' });
  }
}