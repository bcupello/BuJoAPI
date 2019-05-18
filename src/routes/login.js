import { Router } from 'express';
import models, { sequelize } from './../models';
import md5 from 'md5';
import uuid from 'uuid';

const router = Router();

router.post('/', async (req, res) => {
	// Encontrar o usuário pelo Email e Pass_hash
	var user = await models.User.findByEmailAndPassword(req.body.email, req.body.password);
	if (user == undefined) {
		// Falha ao achar Email e Pass_hash compatíveis no BD
		var loginFailResponse = {};
		loginFailResponse.Status = 400;
		loginFailResponse.Message = 'Cadastro não existe ou senha está incorreta.';
		return res.send(loginFailResponse);
	} else {
		// Encontrou Email e Pass_hash compatíveis no BD

		// Atualiza o Access_token do usuário ao logar
		const newAccessToken = await models.User.refreshAccessTokenById(user.Id)
		
		// Funcionou a busca
		if (newAccessToken != '') {
			// Access_token atualizado com sucesso
			var loginResponse = {};
			loginResponse.Status = 200;
			loginResponse.AccessToken = newAccessToken;
			return res.send(loginResponse);
		} else {
			// Falha ao atualizar o Access_token
			var loginResponse = {};
			loginResponse.Status = 500;
			loginResponse.Message = 'Falha interna do servidor ao logar. Tente novamente.';
		}
	}
});

router.put('/', async (req, res) => {
	const expiryDate = new Date();
	expiryDate.setDate(expiryDate.getDate() + 7);
	const expiryDateString = expiryDate.toISOString().split('T')[0];
	
	const createUserAnswer = await req.context.models.User.create(
    {
      Email: req.body.email,
      Pass_hash: md5(req.body.password),
      Access_token: uuid.v4(),
      Token_expiry_date: expiryDateString, // Pega a data atual + 7 dias e a formata no padrão do banco '2019-01-01'
      Name: req.body.name,
      Surname: req.body.surname
    }
	)
	.then(function (resp) {
		var createResponse = {};
		createResponse.Status = 201;
		createResponse.User = {};
		createResponse.User.Id = resp.Id;
		createResponse.User.Email = resp.Email;
		createResponse.User.Access_token = resp.Access_token;
		createResponse.User.Token_expiry_date = resp.Token_expiry_date;
		createResponse.User.Name = resp.Name;
		createResponse.User.Surname = resp.Surname;
		return res.send(createResponse);
	})
	.catch(function (err) {
		var createResponseError = {};
		createResponseError.Status = 500;

		var errorMessages = '';
		for (var i = 0; i < err.errors.length; i++) {
			errorMessages += err.errors[i].message + ', '
		}
		errorMessages = errorMessages.substring(0, errorMessages.length - 2);

		createResponseError.Messages = errorMessages
		return res.send(createResponseError);
	});
});


export default router;