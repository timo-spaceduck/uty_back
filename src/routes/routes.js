const express = require('express');
const router = express.Router();

const statisticsRoutes = require('./statistics.route');

router.use('/stats', statisticsRoutes);

module.exports = router;
