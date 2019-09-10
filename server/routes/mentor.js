import express from 'express';
import UserController from '../controllers/user_controller';
import auth from '../middleware/auth';


const router = express.Router();

const { getAllMentors } = UserController;

router.get('/mentors', auth.auth, getAllMentors);

export default router;
