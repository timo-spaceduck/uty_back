import Feedback from "../models/Feedback.js"
import telegramService from "../services/telegram.service.js"

export const sendFeedback = async (req, res) => {

	const message = req.body?.message;
	const userId = req.body?.userId;

	if(!message || !userId) {
		return res.status(422).json({ error: 'Missing message or userId' });
	}

	const project = 'money-log';

	try {
		await Feedback.create({
			message,
			user_id: userId,
			project
		});
	} catch (error) {
		console.error('Error saving feedback to database:', error);
	}


	await telegramService.sendMessage('Feedback sent\n'+message);

	return res.json({ success: true });

};

export default { sendFeedback };
