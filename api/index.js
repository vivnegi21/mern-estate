import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import { test } from "./controllers/user.controller.js";

dotenv.config();
const app = express();


mongoose.connect("mongodb://127.0.0.1:27017/mern-estate").then(
    () => console.log("Connected to DB")).catch((err) => {
        console.log(err);
    })
;
app.get('/',test);
app.use('/api/user',userRouter);
app.listen(3000, () => console.log("Server is running on 3000!"));
