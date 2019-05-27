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
		// Não tem como criar o daily log, pois o usuário não está autenticado
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

					// Cria o objeto DailyLogs, que ficam dentro de um dailyLogDay
					dailyLogDay.DailyLogs = [];
					for (var i = 0; i < resp.length; i++) {
						if(resp[i].Date == dailyLogDay.Date){
							// Cria o objeto dailyLog pra dar push no DailyLogs
							var dailyLog = {};
							dailyLog.Key = resp[i].Key;
							dailyLog.Signifier = resp[i].Signifier;
							dailyLog.Date = resp[i].Date;
							dailyLog.Text = resp[i].Text;
							dailyLog.Status = resp[i].Status;
							dailyLogDay.DailyLogs.push(dailyLog);
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
		// Não tem como buscar daily log, pois o usuário não está autenticado
		var searchDailyLogByRangeFailResponse = {};
		searchDailyLogByRangeFailResponse.Status = 400;
		searchDailyLogByRangeFailResponse.Message = 'Falha na autenticação do usuário para busca de Daily Logs.';
		return res.send(searchDailyLogByRangeFailResponse);
	}
});

// Edit Daily Log
router.post('/', async (req, res) => {
	// Verifica se existe usuário
	if (req.context.user.id > 0) {
		// Altera os valores e parâmetros de um Daily Log
		if(req.body.key != "" && req.body.signifier != "" && req.body.text != "") {
			// Se existem todos os dados, editamos no banco os valores
			await models.DailyLog.editDailyLogInfo(req.body.key, req.body.signifier, req.body.text, req.context.user.id)
			.then(function (resp) {
				if(resp[0] == 1) {
					// Funcionou a edição
					var editDailyLogResponse = {};
					editDailyLogResponse.Status = 200;

					return res.send(editDailyLogResponse);
				} else {
					// Não editou nada
					var editDailyLogResponse = {};
					editDailyLogResponse.Status = 204;
					editDailyLogResponse.Message = 'Não houve Daily Log editado.';
					return res.send(editDailyLogResponse);
				}
			})
			.catch(function (err) {
				// Deu um erro interno na edição
				var editDailyLogFailResponse = {};
				editDailyLogFailResponse.Status = 500;
				editDailyLogFailResponse.Message = 'Falha interna na edição de Daily Log. Tente novamente.';
				return res.send(editDailyLogFailResponse);
			});
		} else if(req.body.isDone != undefined) {
			// Marcar a tarefa como feita/não feita
		} else if(req.body.isIrrelevant != undefined) {
			// Marcar a tarefa como irrelevante/relevante
		} else if(req.body.sendToFutureLog == true) {
			// Envia a tarefa para o Future Log e a exclui dos Daily Logs
		} else if(req.body.postPone == true) {
			// Adia a tarefa para o mês req.body.postPoneDate (01-MM-YYYY)
		}
	} else {
		// Não tem como editar o daily log, pois o usuário não está autenticado
		var editDailyLogFailResponse = {};
		editDailyLogFailResponse.Status = 400;
		editDailyLogFailResponse.Message = 'Falha na autenticação do usuário para edição de Daily Log.';
		return res.send(editDailyLogFailResponse);
	}
});

export default router;