import express from 'express';
import UserController from '../controllers/user_controller';
import auth from '../middleware/auth';

const router = express.Router();

// signup endpoint
// creation of object
const user_controller = new UserController();

// get all mentors
router.get('/mentors', auth, user_controller.allmentors);


export default router;
