import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs'
import User from '../models/users.model.js'
export const test = (req,res)=>{
    res.send("Hello World:");
};
export const updateUser = async (req,res,next)=>{
    console.log(req);
    if(req.user.id!==req.params.id) return next(errorHandler(401,'You can only update your own account'));
    try {
        if(req.body.password){
            req.body.password=bcryptjs.hashSync(req.body.password,10);
        }
        const updateUser = await User.findByIdAndUpdate(req.params.id,{
            $set : {
                username : req.body.username ,
                email : req.body.email,
                password : req.body.password,
                photo : req.body.photo,
            }
        },{new:true});
        const {password, ...rest} = updateUser._doc;

        res.status(200).json(rest);

    } catch (error) {
        return next(error)
    }
};