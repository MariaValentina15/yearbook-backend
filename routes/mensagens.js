import { Router } from 'express';
import {
  listarMensagens,
  criarMensagem,
  deletarMensagem,
} from '../controllers/mensagensController.js';

const router = Router();

router.get('/', listarMensagens);       // GET /mensagens
router.post('/', criarMensagem);        // POST /mensagens
router.delete('/:id', deletarMensagem); // DELETE /mensagens/:id

export default router;