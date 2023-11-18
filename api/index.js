import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import { test } from "./controllers/user.controller.js";
import authRouter from './routes/auth.route.js'
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
//connect to DB
mongoose.connect("mongodb://127.0.0.1:27017/mern-estate").then(
    () => console.log("Connected to DB")).catch((err) => {
        console.log(err);
    })
;

app.get('/',test);
app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);

//middle ware
app.use((err,req,res,next)=>{
    const statusCode= err.statusCode || 500;
    const message  = err.message || "Interal Server Error";
    return res.status(statusCode).json({
        success:false,
        statusCode:statusCode,
        message:message
    })
});




app.listen(3000, () => console.log("Server is running on 3000!"));
