const express = require('express');
const router = express.Router();

const statisticsRoutes = require('./statistics.route');
const paddleRoutes = require('./paddle.route');

router.use('/stats', statisticsRoutes);
router.use('/paddle', paddleRoutes);

module.exports = router;
