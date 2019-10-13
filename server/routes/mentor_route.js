import express from 'express';
import MentorController from '../controllers/user_controller';
import verifyToken from '../middleware/auth';


const router = express.Router();

const { getAllMentors, getSpecificMentor } = MentorController;


router.get('/mentors', verifyToken, getAllMentors);
router.get('/mentors/:id', verifyToken, getSpecificMentor);

export default router;
