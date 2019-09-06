import express from 'express';
import UserController from '../controllers/user_controller';
import auth from '../middleware/auth';

const router = express.Router();


const user_controller = new UserController();

router.get('/mentors', auth, user_controller.allmentors);

router.get('/mentors/:id', auth, user_controller.specificMentor);

export default router;
