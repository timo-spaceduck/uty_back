import express from 'express';
import googleController from '../controllers/auth/google.controller.js';

const router = express.Router();

router.get('/google', googleController.auth);
router.get('/google/callback', googleController.authCallback);

export default router;
