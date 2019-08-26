import express from 'express';
import UserController from '../controllers/user_controller';
import admin from '../middleware/admin';


const router = express.Router();


// creation of object
const user_controller = new UserController();
//  user to mentor
router.patch('/user/:id', admin, user_controller.toMentor);

export default router;
