//dependencies
import express from "express";
import mongoose from "mongoose";
import Connection from "./database/db.js";
import dotenv from 'dotenv';
dotenv.config();



const app=express();

Connection();

const port =process.env.PORT; 

app.listen(port,()=>{
    console.log(`Server is running on port${port}`);
});
