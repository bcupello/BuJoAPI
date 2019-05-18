import { Router } from 'express';
import models, { sequelize } from './../models';
import md5 from 'md5';

const router = Router();

router.post('/', (req, res) => {
  return res.send('Hello Login!');
});

router.put('/', async (req, res) => {
	const createUserAnswer = await req.context.models.User.create(
    {
      Email: req.body.email,
      Pass_hash: md5(req.body.password),
      Access_token: 'zxcvbnmlkjhgfdsa',
      Token_expiry_date: '2019-06-18',
      Name: req.body.name,
      Surname: req.body.surname
    }
	);
	console.log(createUserAnswer, 'abc');
  return res.send('Hello Login!' + req.context.user.id + createUserAnswer);
});


export default router;