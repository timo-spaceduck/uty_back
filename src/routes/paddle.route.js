import express from 'express';
import paddleController from '../controllers/paddle.controller.js';

const router = express.Router();

router.post('/webhook', paddleController.handleWebhook);

export default router;