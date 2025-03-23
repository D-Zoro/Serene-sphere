import User from '../models/userModel.js';
import Journal from '../models/journalModel.js';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import bcrypt from 'bcryptjs';

//user Signup
export const userSignup = async (req,res) => {
    try{
        let exist = await User.findOne({
            $or :
                [{ username: req.body.username},{ email: req.body.email }]
        });
        if(exist){
            return res.status(409).json({ msg: 'Username or email  exits try another'});
        }
        const newUser = new User(req.body);
        if (req.file){
            newUser.profilePicture= req.file.path; //saving file path to user document
        }
        await newUser.save();
        return res.status(200).json(newUser);
    } catch(error){
        return res.status(500).json({ error: error.message });

    }
};