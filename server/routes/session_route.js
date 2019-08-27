import express from 'express';
import SessionController from '../controllers/session_controller';
import auth from '../middleware/auth';
import mentor from '../middleware/mentor';

const router = express.Router();

// signup endpoint
// creation of object
const session_controller = new SessionController();

// session creation
router.post('/sessions', auth, session_controller.create);
// accept sessions
router.patch('/sessions/:id/accept', mentor, session_controller.acceptSession);
// reject session
router.patch('/sessions/:id/reject', mentor, session_controller.rejectSession);
// get your sessions
router.get('/sessions', auth, session_controller.yourOwnSessions);

export default router;
