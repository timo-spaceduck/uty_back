import Feedback from "../models/Feedback.js"
import telegramService from "../services/telegram.service.js"

export const sendFeedback = async (req, res) => {

	const message = req.body?.message;
	const userId = req.body?.userId;

	if(!message || !userId) {
		return res.status(422).json({ error: 'Missing message or userId' });
	}

	const project = 'money-log';

	Feedback.create({
		message,
		user_id: userId,
		project
	}).then().catch(err => {
		console.error('Error saving feedback:', err);
	});

	telegramService.sendMessage('Feedback sent '+message).then().catch();

	return res.json({ success: true });

};

export default { sendFeedback };
