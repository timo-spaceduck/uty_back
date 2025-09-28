import express from 'express';
import promocodeController from '../controllers/promocode.controller.js';

const router = express.Router();

router.post('/', promocodeController.checkPromocode);

export default router;
