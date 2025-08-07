const express = require('express');
const router = express.Router();

const statisticsRoutes = require('./statisticsRoute');

router.use('/stats', statisticsRoutes);

module.exports = router;
