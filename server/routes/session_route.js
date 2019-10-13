import express from 'express';
import SessionController from '../controllers/session_controller';
import verifyAuth from '../middleware/auth';
import verifyMentor from '../middleware/mentor';


const router = express.Router();

const { createSession, acceptSessions, rejectSessions } = SessionController;


router.post('/sessions', verifyAuth, createSession);
router.patch('/sessions/:id/accept', verifyAuth, verifyMentor, acceptSessions);
router.patch('/sessions/:id/reject', verifyAuth, verifyMentor, rejectSessions);
export default router;
