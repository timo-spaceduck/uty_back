import express from 'express';
import todoController from '../controllers/todo.controller.js';

const router = express.Router();

router.get('/get', todoController.getAll);
router.post('/sync', todoController.syncAll);

export default router;
