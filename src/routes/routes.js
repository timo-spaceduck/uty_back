const express = require('express');
const router = express.Router();
const apiKeyMiddleware = require('./../middleware/apiKey.middleware');

const statisticsRoutes = require('./statistics.route');
const paddleRoutes = require('./paddle.route');

router.use('/stats', apiKeyMiddleware, statisticsRoutes);
router.use('/paddle', paddleRoutes);

module.exports = router;
