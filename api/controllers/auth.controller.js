import User from '../models/users.model.js'
import bcrypt from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken'


export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new User({
        username: username,
        email: email,
        password: hashedPassword
    });
    try {
        await newUser.save();     //takes time
        res.status(201).json("User Created Success");
    } catch (error) {
        next(error + "Error-VIvel");
        // next(errorHandler(550,"Error from a function"));
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email: email });
        if (!validUser) {
            return next(errorHandler(404, "User Not Found!"));
        }

        const validPassword = bcrypt.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(404, "Invalid Credentials!"));

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

        const { password: pass, ...userInfo } = validUser._doc;

        res
            .cookie('access_token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 100 })
            .status(200)
            .json(userInfo);


    } catch (error) {
        next(error);
    }
}

export const google = async (req, res, next) => {
    try {
        //if user exist
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password: pass, ...userInfo } = user._doc;
            res.cookie('access_token', token, { httpOnly: true })
                .status(200)
                .json(userInfo);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8);
            const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
            let newUser = new User({
                username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
                email: req.body.email,
                password: hashedPassword,
                photo:req.body.photo,
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password: pass, ...userInfo } = newUser._doc;
            res.cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(userInfo);

        }
    } catch (error) {
        next(error);
    }
};