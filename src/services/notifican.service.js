import axios from 'axios';

export const sendToNotifican = async (message) => {
	try {
		// await axios.post('https://api.notifican.com/5f0579b9-3d9c-4ec9-a2f9-732868e4bf00', {
		await axios.post('https://api.notifican.com/063ca464-09f2-4a86-82f4-478c83234fad', {
			categoryId: 10,
			message,
		}, {
			headers: {
				'Authorization': 'Bearer fc8ac7bb-bb35-4a66-b400-398fdba3852c'
			}
		})
	} catch (e) {
		console.log(e);
	}
}
