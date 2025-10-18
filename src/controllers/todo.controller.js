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
	await Todo.findOrCreate({
		where: { web_user_id: userId },
		defaults: {
			todos,
			notes,
			todo_groups: groups
		}
	});
	return res.json({ success: true });
}

export default { getAll, syncAll };
