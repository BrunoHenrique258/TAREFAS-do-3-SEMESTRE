import { Router } from 'express';
import {
  criarEvento,
  listarEventos,
  atualizarEvento,
  excluirEvento
} from '../controllers/eventoController';

const router = Router();

router.post('/eventos', criarEvento);
router.get('/eventos', listarEventos);
router.put('/eventos/:id', atualizarEvento);
router.delete('/eventos/:id', excluirEvento);

export default router;
