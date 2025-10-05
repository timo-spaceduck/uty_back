import Promocode from "../models/Promocode.js"
import User from "../models/User.js"

export const saveToken = async (req, res) => {

	const token = req.body?.token;
	const userId = req.body?.userId;

	if(!token || !userId) {
		return res.status(400)
	}

	const user = await User.findOne({
		where: { uuid: user_id }
	});

	if(user) {
		await user.update({ notifications_token: token });
	}

	return res.json({ created: true });

};

export default { saveToken };
