import express from 'express';
import SessionController from '../controllers/session_controller';
import ReviewController from '../controllers/review_controller';
import auth from '../middleware/auth';
import mentor from '../middleware/mentor';
import admin from '../middleware/admin';
import sessionValidate from '../middleware/sessionsValidator';
import reviewValidate from '../middleware/reviewValidator';

const router = express.Router();


const session_controller = new SessionController();
const review_controller = new ReviewController();

router.post('/sessions', auth, sessionValidate, session_controller.create);

router.patch('/sessions/:id/accept', mentor, session_controller.acceptSession);

router.patch('/sessions/:id/reject', mentor, session_controller.rejectSession);

router.get('/sessions', auth, session_controller.yourOwnSessions);

router.post('/sessions/:id/review', auth, reviewValidate, review_controller.creatReview);

router.delete('/sessions/:id/review', admin, review_controller.deleteReview);

export default router;
