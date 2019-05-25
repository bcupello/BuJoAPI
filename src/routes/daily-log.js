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

// Search Daily Logs by Range
router.get('/:startDate/:endDate', async (req, res) => {
	// req.params.startDate
	// req.params.endDate
	//Verifica se existe usuário
	if(req.context.user.id > 0) {
		// Busca os Daily Logs no intervalo dado
		await models.DailyLog.searchDailyLogsByRange(req.params.startDate, req.params.endDate, req.context.user.id)
		.then(function (resp) {
			if (resp != []) {
				// Encontraram dados, então encapsula no formato por dias
				var searchDailyLogsByRangeResponse = {};
				searchDailyLogsByRangeResponse.Status = 200;
				searchDailyLogsByRangeResponse.DailyLogDays = [];

				var dt = new Date(req.params.startDate);
				var endDate = new Date(req.params.endDate);
				
				while(dt <= endDate) {
					// Cria o objeto DailyLogDay pra dar push no DailyLogDays
					var dailyLogDay = {};
					dailyLogDay.Date = dt.toISOString().split('T')[0];

					// Cria o objeto dailyLogs, que ficam dentro de um dailyLogDay
					dailyLogDay.dailyLogs = [];
					for (var i = 0; i < resp.length; i++) {
						if(resp[i].Date == dailyLogDay.Date){
							dailyLogDay.dailyLogs.push(resp[i]);
						}
					}
					searchDailyLogsByRangeResponse.DailyLogDays.push(dailyLogDay);
					// Incrementa o dt variável pra percorrer o while
					dt.setDate(dt.getDate() + 1);
				}
				// Ao fim das encapsulações, retorna o objeto completo
				return res.send(searchDailyLogsByRangeResponse);
			} else {
				// Resposta vazia
				var searchDailyLogsByRangeResponse = {};
				searchDailyLogsByRangeResponse.Status = 204;
				searchDailyLogsByRangeResponse.Message = 'Não há Daily Logs no período buscado.';
				return res.send(searchDailyLogsByRangeResponse);
			}
		})
		.catch(function (err) {
			// Deu um erro interno na busca
			var searchDailyLogByRangeFailResponse = {};
			searchDailyLogByRangeFailResponse.Status = 500;
			searchDailyLogByRangeFailResponse.Message = 'Falha interna na busca de Daily Logs. Tente novamente.';
			return res.send(searchDailyLogByRangeFailResponse);
		});
	} else {
		// Não tem como buscar daily log, pois não há usuário
		var searchDailyLogByRangeFailResponse = {};
		searchDailyLogByRangeFailResponse.Status = 400;
		searchDailyLogByRangeFailResponse.Message = 'Falha na autenticação do usuário para busca de Daily Logs.';
		return res.send(searchDailyLogByRangeFailResponse);
	}
});

// Edit Daily Log
router.post('/', async (req, res) => {
	return res.send({});
});

export default router;