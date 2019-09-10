import express from 'express';
import MentorController from '../controllers/mentor_controller';
import admin from '../middleware/admin';


const router = express.Router();

const { changeToMentor } = MentorController;

router.patch('/user/:id', admin, changeToMentor);

export default router;
