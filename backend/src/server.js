//dependencies
import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

//src comp
import Connection from "./database/db.js";



const app=express();

Connection();

const port =process.env.PORT; 

app.listen(port,()=>{
    console.log(`Server is running on port${port}`);
});
