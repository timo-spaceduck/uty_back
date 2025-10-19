import axios from 'axios';

export const sendToNotifican = async (message) => {
	try {
		await axios.post('https://api.notifican.com/5f0579b9-3d9c-4ec9-a2f9-732868e4bf00', {
			message
		})
	} catch (e) {
		console.log(e);
	}
}
