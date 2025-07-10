import express from 'express';
import {
  getAllCards,
  getDeletedCards,
  createCard,
  updateCard,
  softDeleteCard,
  permanentlyDeleteCard,
  restoreCard
} from '../controllers/cardController.js';

import { authenticateToken } from '../auth/authMiddleware.js';

const router = express.Router();

router.use(authenticateToken); // Protege todas as rotas abaixo

router.get('/', getAllCards);
router.get('/trash', getDeletedCards);
router.post('/', createCard);
router.put('/:id', updateCard);
router.delete('/:id', softDeleteCard);
router.delete('/trash/:id', permanentlyDeleteCard);
router.put('/restore/:id', restoreCard);

export default router;
