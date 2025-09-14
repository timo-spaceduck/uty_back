import telegramService from '../services/telegram.service.js';

export const sendMessage = (req, res) => {

	const text = req.body?.eventTitle || 'No event title provided';

	telegramService.sendMessage(text).then();

	res.json(true);
};

export default { sendMessage };
