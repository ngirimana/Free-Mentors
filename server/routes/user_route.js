import express from 'express';
import UserController from '../controllers/user_controller';
import userValidate from '../middleware/userValidator';


const router = express.Router();


// creation of object
const { signUp } = UserController;

router.post('/signup', userValidate, signUp);

export default router;
