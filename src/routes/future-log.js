import { Router } from 'express';
import uuidv4 from 'uuid/v4';

const router = Router();

router.get('/:logKey', (req, res) => {
  return res.send(`Pega um Future Log pela chave ${req.params.logKey} para o usuário de Id ${req.user.id}!`);
});

router.put('/', (req, res) => {
	const key = uuidv4();

  return res.send(`Cria um Future Log! de chave ${key}!`);
});

router.post('/:logkey', (req, res) => {
  return res.send(`Edita o Future Log de chave ${req.params.logKey}!`);
});

router.delete('/:logkey', (req, res) => {
  return res.send(`Exclui Future Log de chave ${req.params.logKey}!`);
});

export default router;