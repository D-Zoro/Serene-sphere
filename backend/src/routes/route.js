import express from 'express';
import { userLogin, userSignup, getUsers, getUserDetails, deleteUser } from '../controllers/user-controller.js';
import { getAnonymousPosts, createAnonymousPost } from '../controllers/ano-controller.js';
import { submitQuiz, getUserMoodHistory } from '../controllers/quiz-controller.js';
import { 
    getUserChatHistories, 
    getChatHistoryById, 
    createChatHistory, 
    updateChatHistory, 
    deleteChatHistory,
    deleteMultipleChatHistories
} from '../controllers/chat-controller.js';
import passport from 'passport';
import '../config/passportConfig.js';
import multer from 'multer';
import upload from '../config/multerConfig.js';
import cors from 'cors';

const router = express.Router();
router.use(cors());

router.post('/signup', upload.single('profilePicture'), userSignup);
router.post('/login', userLogin);
router.get('/users', getUsers);
router.get('/delete-user/:username', deleteUser);
router.get('/:username/getuserdetails', getUserDetails);
//route.patch('/update-user/:username', updateUser);

//anonymous routes
router.get('/anonymouPosts', getAnonymousPosts);
router.post('/createAnonymousPost', createAnonymousPost);

//Quiz and mood tracking routes
router.post('/submitQuiz', submitQuiz);
router.get('/:username/moodHistory', getUserMoodHistory);

//Chat history routes
router.get('/:username/chathistories', getUserChatHistories);
router.get('/chathistory/:id', getChatHistoryById);
router.post('/chathistory', createChatHistory);
router.put('/chathistory/:id', updateChatHistory);
router.delete('/chathistory/:id', deleteChatHistory);
router.post('/chathistories/delete', deleteMultipleChatHistories);

//other routes

export default router;



