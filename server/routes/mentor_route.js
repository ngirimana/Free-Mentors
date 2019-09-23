import express from 'express';
// import MentorController from '../controllers/mentor_controller';
import auth from '../middleware/auth';


const router = express.Router();

// const { getAllMentors, getSpecificMentor } = MentorController;

// router.get('/mentors', auth.auth, getAllMentors);
// router.get('/mentors/:id', auth.auth, getSpecificMentor);

export default router;
