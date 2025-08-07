const telegramService = require('./../services/telegram.service');

exports.sendMessage = (req, res) => {

	telegramService.sendMessage('test').then();

	res.json(true);
};
