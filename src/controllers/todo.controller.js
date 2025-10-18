import Todo from "../models/Todo.js"

export const getAll = async (req, res) => {
	const userId = req.user.id;
	const data = await Todo.findOne({
		where: { web_user_id: userId }
	})
	return res.json(data);
};

export const syncAll = async (req, res) => {
	const userId = req.user.id;
	const { todos, notes, groups } = req.body;

	const fillData = {
		web_user_id: userId,
		todos,
		notes,
		todo_groups: groups
	}

	const item = await Todo.findOne({
		where: { web_user_id: userId }
	})

	if(item) {
		await item.update(fillData)
	} else {
		await Todo.create(fillData)
	}

	return res.json({ success: true });
}

export default { getAll, syncAll };
