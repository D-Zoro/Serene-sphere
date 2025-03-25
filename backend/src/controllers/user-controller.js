import User from '../models/userModel.js';
import Journal from '../models/journalModel.js';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import bcrypt from 'bcryptjs';

//user Signup
export const userSignup = async (req,res) => {
    try{
        let existmail = await User.findOne({
           // $or :
                email: req.body.email 
        });
        if(existmail){                        //msg
            return res.status(409).json({ message: 'Email already in use'});
        }

        let existuser = await User.findOne({
            username: req.body.username
        });
        if(existuser){
            return res.status(409).json({ message: 'Username taken' });
        }
        const newUser = new User(req.body);
        console.log("Received Data:", req.body);  //  Check incoming data
        console.log("Received File:", req.file);  //  Check file upload
        if (req.file){
            newUser.profilePicture= req.file.path; //saving file path to user document
        }
        await newUser.save();
        return res.status(200).json(newUser);
    } catch(error){
        return res.status(500).json({ error: error.message });

    }
};

//login controller 
export const userLogin = async (req,res ) => {
    try{
        const { username, password } = req.body;

        //find user by username
        const user =await User.findOne({ username });

        //checking if user is registerd and if its correct passworkd
        if(!user ) {
            return res.status(401).json({ message: 'Invalid username' });
        }
        if(!bcrypt.compareSync( password,user.password)){
            return res.status(401).json({ message: 'wrong password'}) 
        }

        //return user details + tocken
        return res.status(200).json({ user });

    }catch(err){
        return res.status(500).json({ error: err.message });
    }
};