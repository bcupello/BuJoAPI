import { Router } from 'express';
import models, { sequelize } from './../models';

const router = Router();

// Create Daily Log
router.put('/', async (req, res) => {
	// Verifica se existe usuário
	if (req.context.user.id > 0) {
		// Preenche o objeto Daily Log de criação
		var dailyLog = {};
		dailyLog.signifier = req.body.signifier;
		dailyLog.date = req.body.date;
		dailyLog.text = req.body.text;
		dailyLog.status = 'a'; // Status padrão inicial é 'a' de active
		dailyLog.userId = req.context.user.id;

		await models.DailyLog.createDailyLog(dailyLog)
		.then(function (resp) {
			// Funcionou a criação
			if (resp == undefined) {
				// Deu um erro interno na criação
				var createDailyLogFailResponse = {};
				createDailyLogFailResponse.Status = 500;
				createDailyLogFailResponse.Message = 'Falha interna na criação de Daily Log. Tente novamente.';
				return res.send(createDailyLogFailResponse);
			} else {
				// Deu certo a criação
				var createDailyLogResponse = {};
				createDailyLogResponse.DailyLog = resp;
				createDailyLogResponse.Status = 201;

				return res.send(createDailyLogResponse);
			}
		})
		.catch(function (err) {
			// Deu um erro interno na criação
			var createDailyLogFailResponse = {};
			createDailyLogFailResponse.Status = 500;
			createDailyLogFailResponse.Message = 'Falha interna na criação de Daily Log. Tente novamente.';
			return res.send(createDailyLogFailResponse);
		});
	} else {
		// Não tem como criar o daily log, pois não há usuário
		var createDailyLogFailResponse = {};
		createDailyLogFailResponse.Status = 400;
		createDailyLogFailResponse.Message = 'Falha na autenticação do usuário para criação de Daily Log.';
		return res.send(createDailyLogFailResponse);
	}
});

export default router;