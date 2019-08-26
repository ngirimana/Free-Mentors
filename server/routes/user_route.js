import express from 'express';
import UserController from '../controllers/user_controller';
import admin from '../middleware/admin';


const router = express.Router();


// creation of object
const user_controller = new UserController();

router.post('/signup', user_controller.signUp);


export default router;
