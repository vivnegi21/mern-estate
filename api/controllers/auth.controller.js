import User from '../models/users.model.js'
import bcrypt from 'bcryptjs';

export const signup = async (req,res)=>{
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
        res.status(500).json(error.message);
    }
};