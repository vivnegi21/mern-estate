import User from '../models/users.model.js'
import bcrypt from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

export const signup = async (req,res,next)=>{
    const {username,email,password} = req.body;
    const hashedPassword = bcrypt.hashSync(password,10);

    const newUser = new User({
        username:username,
        email:email,
        password:hashedPassword
    });
    try {
        await newUser.save();     //takes time
        res.status(201).json("User Created Success");
    } catch (error) {
        next(error+"Error-VIvel");
        // next(errorHandler(550,"Error from a function"));
    }
};