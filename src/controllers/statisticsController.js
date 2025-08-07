exports.getAllUsers = (req, res) => {
	res.json([{ id: 1, name: 'Timo' }, { id: 2, name: 'Khmel' }]);
};

// exports.getUserById = (req, res) => {
// 	const userId = req.params.id;
// 	res.json({ id: userId, name: `User ${userId}` });
// };
//
// exports.createUser = (req, res) => {
// 	const newUser = req.body;
// 	res.status(201).json({ message: 'User created', user: newUser });
// };
