import telegramService from '../services/telegram.service.js';
import Log from "../models/Log.js"

export const sendMessage = (req, res) => {

	const text = req.body?.eventTitle || 'No event title provided';

	try {
		const splitText = text.split('\n');
		console.log(splitText);
		let platform = 'web';
		let user_id = null;
		if(splitText.length > 1) {
			user_id = splitText.length > 1 ? splitText[1] : null;
			platform = splitText.length > 1 ? splitText[0] : null;
		}

		Log.create({
			platform,
			user_id,
			message: text
		}).then().catch(err => {
			console.log('Error logging message to database:', err);
		})
	} catch (e) {
		console.error('Error creating db record:', e);
	}

	telegramService.sendMessage(text).then();

	res.json(true);
};

export default { sendMessage };
