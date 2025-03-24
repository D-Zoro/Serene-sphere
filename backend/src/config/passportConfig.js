import passport from 'passport';
import { Strategy as JwtStrategy,ExtractJwt } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';

//Local Strategy(cookie session based)
passport.use(new LocalStrategy(
    { usernameField: 'username' },
    async (username, password, done) => {
        try {
            const user = await User.findOne({ username });
            if(!user){
                return done(null, false, { message: 'Incorrect username.'});

            }
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                return done(null,false,{ message: 'Incorrect password.' });

            }
            return done(null, user);
            
        }catch (err){
            return done(err);
        }
    }
)); 

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "gommacomedmra"
    //after testing put it in .env

};

passport.use(new JwtStrategy(opts, async (jwt_payload,done) => {
    try{
        const user = await User.findById( jwt_payload.id);
        if(user) {
            return done(null, user);
        }
        return done(null, false);
    } catch (err){
        return done(err, false);
    }
}));

//serialize user for session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

//Deserialize user from session
passport.deserializeUser((id,done) => {
    User.findById( id,(err,user) =>{
        done(err, user);
    });
});