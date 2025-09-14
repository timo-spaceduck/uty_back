const express = require('express');
const router = express.Router();
const paddleController = require('../controllers/paddle.controller');

router.post('/webhook', paddleController.handleWebhook);

module.exports = router;