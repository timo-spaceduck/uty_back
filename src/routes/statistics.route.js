import express from 'express';
import statisticsController from '../controllers/statistics.controller.js';

const router = express.Router();

router.post('/', statisticsController.sendMessage);

export default router;
