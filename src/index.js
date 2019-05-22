import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import bodyParser from 'body-parser';
import routes from './routes';

import models, { sequelize } from './models';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(async (req, res, next) => { // Middleware de autenticação do usuário
	// Verifica se é uma requisição com Access_Token
	if (req.headers.access_token) {
		// Altera o contexto da requisição
		// Aqui faria a verificação do AccessKey para descobrir o ID do usuário
		// e atualizaria o Access_token caso o token_expiry_date esteja pra expirar
		let userData = await models.User.findByAccessToken(req.headers.access_token)
		.then(function (resp) {
			// Caso funcione a busca ao access token
			req.context = {
				models,
				user: { id: resp.id }
			};
			if (resp.newAccessToken != '') {
				res.NewAccessToken = resp.newAccessToken;
			}
			next();
		})
		.catch(function (err) {
			// Caso dê erro ao buscar o access token
			req.context = {
				models,
				user: { id: 0 }
			}
			next();
		});
	} else {
		// Altera o contexto da requisição para usuário de id 0
		req.context = {
			models,
			user: { id: 0 }
		}

		next();
	}
});

app.use('/login', routes.login);
app.use('/future-log', routes.futureLog);
app.use('/monthly-log', routes.monthlyLog);
app.use('/daily-log', routes.dailyLog);

/*sequelize.sync().then(() => { // Chama o banco de dados pelo sequelize assincronamente
  app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}!`)
  });
});*/

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`)
});