import express from 'express';
import SessionController from '../controllers/session_controller';
import auth from '../middleware/auth';

const router = express.Router();

// signup endpoint
// creation of object
const session_controller = new SessionController();

// session creation
router.post('/sessions', auth, session_controller.create);


export default router;
