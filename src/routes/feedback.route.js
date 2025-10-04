import express from 'express';
import feedbackController from '../controllers/feedback.controller.js';

const router = express.Router();

router.post('/', feedbackController.sendFeedback);

export default router;
