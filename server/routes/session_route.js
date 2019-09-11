import express from 'express';
import dotenv from 'dotenv';
import SessionController from '../controllers/session_controller';
import sessionValidator from '../middleware/sessionsValidator';
import auth from '../middleware/auth';

dotenv.config();

const router = express.Router();

const { createSession } = SessionController;

router.post('/sessions', sessionValidator, auth.auth, createSession);

export default router;
