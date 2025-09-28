import express from 'express';
import apiKeyMiddleware from '../middleware/apiKey.middleware.js';
import statisticsRoutes from './statistics.route.js';
import promocodeRoutes from './promocode.route.js';
import pdfRoutes from './pdfs.route.js';
import paddleRoutes from './paddle.route.js';

const router = express.Router();

router.use('/stats', express.json(), apiKeyMiddleware, statisticsRoutes);
router.use('/promocode', express.json(), apiKeyMiddleware, promocodeRoutes);
router.use('/pdf', express.raw({ type: "application/pdf", limit: "10mb" }), apiKeyMiddleware, pdfRoutes);
router.use('/paddle', paddleRoutes);

export default router;
