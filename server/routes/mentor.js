import express from 'express';
import UserController from '../controllers/user_controller';
import auth from '../middleware/auth';


const router = express.Router();

const { getAllMentors, getSpecificMentor } = UserController;

router.get('/mentors', auth.auth, getAllMentors);
router.get('/mentors/:id', auth.auth, getSpecificMentor);

export default router;
