import axios from 'axios';

export const sendToNotifican = async (message) => {
	try {
		await axios.post(`https://api.notifican.com/${process.env.NOTIFICAN_USER_ID}`, {
			categoryId: 10,
			message,
		}, {
			headers: {
				'Authorization': `Bearer ${process.env.NOTIFICAN_BEARER_TOKEN}`
			}
		})
	} catch (e) {
		console.log(e);
	}
}
