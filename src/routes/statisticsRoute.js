const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/statisticsController');

router.get('/', statisticsController.getAllUsers);

// router.get('/users', (req, res) => {
// 	res.send('User list');
// });

module.exports = router;
