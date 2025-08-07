const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/statistics.controller');

router.post('/', statisticsController.sendMessage);

module.exports = router;
