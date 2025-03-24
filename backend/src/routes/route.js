import express from 'express';
import { userLogin, userSignup } from '../controllers/user-controller.js';
import passport from 'passport';
import '../config/passportConfig.js';
import multer from 'multer';
import upload from '../multer/multerConfig.js';
import cors from 'cors';

const router =express.Router();
router.use(cors());

router.post('/signup',upload.single('profilePicture'),userSignup);
router.post('/login',userLogin);


//other routes

export default router;



