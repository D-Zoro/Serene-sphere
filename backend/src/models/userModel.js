import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/,'abe lodu enter valid email address.']
    },
    name:{
        type:String,
        required: true
    },
    password:{
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    gender:{
        type: String,
        enum: ['Male','Female','Others'],
        required: true
    },
    age:{
        type: Number,
        required: true,
        min: 0
    },
    bio:{
        type: String,
        default:''
    },
    profilePicture:{
        type: String, // string file path
        default: ''
    },
    journals:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Journal'
    }]
},{
    timestamps: true
});

//hashing the passwords b4 saving 
userSchema.pre('save',async function(next){
    if(!this.isModified('password')) 
        return next();
    const salt=await bcrypt.genSalt(10);
    //add salt to the password yes we cookin !!
    this.password= await bcrypt.hash(this.password, salt);
    next();
});

const User =mongoose.model('User',userSchema);
export default User;

