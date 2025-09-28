import telegramService from '../services/telegram.service.js';
import Log from "../models/Log.js"
import User from "../models/User.js"

export const sendMessage = async (req, res) => {

	let text = req.body?.eventTitle || 'No event title provided';

	try {
		const splitText = text.split('\n');
		let platform = 'web';
		let user_id = null;
		let message = text;
		if(splitText.length > 2) {
			platform = splitText[0] || null;
			user_id = splitText[1] || null;
			message = splitText[2] || text;
		}

		Log.create({
			platform,
			user_id,
			message
		}).then(res => {
			console.log('Message logged to database:', res.id);
		}).catch(err => {
			console.log('Error logging message to database:', err);
		})

		if(user_id) {
			const user = await User.findOne({
				where: { uuid: user_id }
			});
			if(user) {
				text += `\nExisting user: ${user.name || user.id}`
			} else {
				text += `\nNew user`
				User.create({
					uuid: user_id,
					platform,
				}).then(res => {
					console.log('New user created:', res.id);
				}).catch(err => {
					console.log('Error creating new user:', err);
				})
			}
		}
	} catch (e) {
		console.error('Error creating db record:', e);
	}

	telegramService.sendMessage(text).then();

	res.json(true);
};

export default { sendMessage };
