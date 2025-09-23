import express from 'express';
import pdfsController from '../controllers/pdfs.controller.js';

const router = express.Router();

router.post('/', pdfsController.parsePDF);

export default router;
