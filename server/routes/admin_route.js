import express from 'express';
import MentorController from '../controllers/user_controller';
import Admin from '../middleware/admin';


const router = express.Router();

const { changeToMentor } = MentorController;
const { verifyAdmin } = Admin;

router.patch('/user/:id', verifyAdmin, changeToMentor);

export default router;
