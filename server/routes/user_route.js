import express from 'express';
import UserController from '../controllers/user_controller';
import userValidate from '../middleware/userValidator';
import signInValidator from '../middleware/signInValidator';


const router = express.Router();

const { signIn, signUp } = UserController;

router.post('/signup', userValidate, signUp);
router.post('/signin', signInValidator, signIn);

export default router;
