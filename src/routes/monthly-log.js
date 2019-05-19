import { Router } from 'express';
import models, { sequelize } from './../models';

const router = Router();

router.get('/', (req, res) => {
  return res.send('Hello Monthly Log!');
});

export default router;