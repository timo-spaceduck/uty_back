import express from 'express';
import apiKeyMiddleware from '../middleware/apiKey.middleware.js';
import statisticsRoutes from './statistics.route.js';
import paddleRoutes from './paddle.route.js';

const router = express.Router();

router.use('/stats', express.json(), apiKeyMiddleware, statisticsRoutes);
router.use('/paddle', paddleRoutes);

export default router;
