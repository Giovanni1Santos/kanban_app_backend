import Card from '../models/Card.js';

export async function getAllCards(req, res) {
  const cards = await Card.findAll({
    where: { userId: req.user.id, deleted: false }
  });
  res.json(cards);
}

export async function getDeletedCards(req, res) {
  const cards = await Card.findAll({
    where: { userId: req.user.id, deleted: true }
  });
  res.json(cards);
}

export async function createCard(req, res) {
  const card = await Card.create({ ...req.body, userId: req.user.id });
  res.status(201).json(card);
}

export async function updateCard(req, res) {
  const { id } = req.params;
  const [updated] = await Card.update(req.body, {
    where: { id, userId: req.user.id }
  });
  if (updated) {
    const updatedCard = await Card.findByPk(id);
    res.json(updatedCard);
  } else {
    res.status(404).send('Card não encontrado');
  }
}

export async function softDeleteCard(req, res) {
  const { id } = req.params;
  await Card.update({ deleted: true }, { where: { id, userId: req.user.id } });
  res.sendStatus(204);
}

export async function restoreCard(req, res) {
  const { id } = req.params;
  await Card.update({ deleted: false }, { where: { id, userId: req.user.id } });
  res.sendStatus(200);
}

export async function permanentlyDeleteCard(req, res) {
  const { id } = req.params;
  await Card.destroy({ where: { id, userId: req.user.id } });
  res.sendStatus(204);
}
