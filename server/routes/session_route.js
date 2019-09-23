import express from 'express';
import dotenv from 'dotenv';
import SessionController from '../controllers/session_controller';
import sessionValidator from '../middleware/sessionsValidator';
import auth from '../middleware/auth';
import mentor from '../middleware/mentor';

dotenv.config();

const router = express.Router();

// const { createSession, acceptSession, rejectSession } = SessionController;

// router.post('/sessions', sessionValidator, auth.auth, createSession);
// router.patch('/sessions/:id/accept', mentor, acceptSession);
// router.patch('/sessions/:id/reject', mentor, rejectSession);

export default router;
