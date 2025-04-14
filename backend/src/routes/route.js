import express from 'express';
import { userLogin, userSignup , getUsers , getUserDetails ,deleteUser} from '../controllers/user-controller.js';
import passport from 'passport';
import '../config/passportConfig.js';
import multer from 'multer';
import upload from '../config/multerConfig.js';
import cors from 'cors';

const router =express.Router();
router.use(cors());

router.post('/signup',upload.single('profilePicture'),userSignup);
router.post('/login',userLogin);
router.get('/users',getUsers);
router.get('/delete-user/:username',deleteUser)
router.get('/:username/getuserdetails',getUserDetails);


//other routes

export default router;



