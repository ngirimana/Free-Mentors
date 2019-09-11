import express from 'express';
import dotenv from 'dotenv';
import UserController from '../controllers/user_controller';
import userValidate from '../middleware/userValidator';
import signInValidator from '../middleware/signInValidator';

dotenv.config();

const router = express.Router();

const { signIn, signUp } = UserController;

router.post('/signup', userValidate, signUp);
router.post('/signin', signInValidator, signIn);
console.log(process.env.NODE_ENV)
export default router;
