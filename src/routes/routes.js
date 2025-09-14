import express from 'express';
import apiKeyMiddleware from '../middleware/apiKey.middleware.js';
import statisticsRoutes from './statistics.route.js';
import paddleRoutes from './paddle.route.js';

const router = express.Router();

router.use('/stats', apiKeyMiddleware, statisticsRoutes);
router.use('/paddle', paddleRoutes);

export default router;
