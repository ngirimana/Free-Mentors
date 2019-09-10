import express from 'express';
import UserController from '../controllers/user_controller';
import admin from '../middleware/admin';


const router = express.Router();

const { changeToMentor } = UserController;

router.patch('/user/:id', admin, changeToMentor);

export default router;
