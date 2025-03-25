//dependencies
import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
import http from 'http';
import cookieParser from "cookie-parser";
import cors from 'cors';
import session from "express-session";
import passport from "passport";
import { fileURLToPath } from "url";
import path from "path";
import bodyParser from "body-parser";

//src comp
import Connection from "./config/mongodbconfig.js";
import userRoutes from './routes/route.js';


mongoose.set('strictQuery',true);
const app=express();
const server = http.createServer(app);//http server on express();

app.use(express.json());
app.use(cors({
    origin: '*',
    methods:['GET', 'POST', 'PATCH' ,'DELETE', 'PUT'],
    credentials: true,
}));
app.use(cookieParser());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended:true }));

app.use(session({
    secret:process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname,'uploads')));
//uploads1 ka idar dalo 


Connection();
app.use('/',userRoutes);

const port =process.env.PORT; 

server.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});
