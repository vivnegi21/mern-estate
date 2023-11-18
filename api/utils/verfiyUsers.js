import { errorHandler } from "./error.js";
import jwt  from "jsonwebtoken";

export const verifyToken = (req,res,next)=>{
    const token = req.cookie.access_token;
    if(!token){
        return next(errorHandler(404,'Unauthorized'));
    }
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err) return next(errorHandler(403,"Invalid Token"));
        req.user= user;
        next();
    })

};