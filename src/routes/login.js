import { Router } from 'express';

const router = Router();

router.post('/', (req, res) => {
  return res.send('Hello Login!');
});


export default router;