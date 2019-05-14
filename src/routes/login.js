import { Router } from 'express';
import models, { sequelize } from './../models';

const router = Router();

router.post('/', (req, res) => {
  return res.send('Hello Login!');
});

router.put('/', (req, res) => {
	// const createUserAnswer = async () => {
	// 	await models.User.create(
	//     {
	//       email: 'bruno8eduardo@gmail.com',
	//       pass_hash: 'qwertyasdf',
	//       access_token: 'zxcvbnmlkjhgfdsa',
	//       token_expiry_date: '2019-05-13',
	//       refresh_token: 'aaaaaaaaaaaaaaaaaa',
	//       name: 'Bruno',
	//       surname: 'Carvalho'
	//     }
 //  	);
	// }
  return res.send('Hello Login!');
});


export default router;