const telegramService = require('./../services/telegram.service');

exports.sendMessage = (req, res) => {

	const text = req.body?.eventTitle || 'No event title provided';

	telegramService.sendMessage(text).then();

	res.json(true);
};
