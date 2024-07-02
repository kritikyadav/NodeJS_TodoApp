/**
 * This Controler file will contain all the action related content like function codes for performing any action. 
 * 
 */

// import User here for performing db related actions. 
import { User } from "../models/user.js";
import bycrpt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";


// function to get all user details
export const getAllUsers = async (req, res) => {

    try {
        const user = await User.find();
        if (!user) {
            return next(new ErrorHandler("No users registered.", 404));
        } else {
            return res.status(200)
                .json({
                    users: user,
                })
        }
    } catch (error) {
        next(error);
    }
}

// login function
export const login = async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return next(new ErrorHandler("Invalid email or password.", 404));
        }

        const isMatch = await bycrpt.compare(password, user.password);
        if (!isMatch) {
            return next(new ErrorHandler("Invalid email or password.", 404));
        }

        let message = `Welcome back, ${user.name}`;
        sendCookie(user, res, message, 200);
    } catch (error) {
        next(error);
    }
}

// logout function
export const logout = async (req, res) => {

    try {
        res.status(200)
            .cookie("token", "", {
                expires: new Date(Date.now()),
                sameSite: process.env.NODE_ENV === "DEV" ? "lax" : "none",
                secure: process.env.NODE_ENV === "DEV" ? false : true,
            })
            .json({
                message: "See you soon, have a nice day.",
                success: true,
            })

    } catch (error) {
        next(error);
    }
}

// register any user. 
export const register = async (req, res) => {

    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });

        if (user) {
            return next(new ErrorHandler("User Already Exists.", 404));
        }

        const hashedPassword = await bycrpt.hash(password, 10);
        user = await User.create({ name, email, password: hashedPassword });

        let message = "Registered Successfully."
        sendCookie(user, res, message, 200);

    } catch (error) {
        next(error);
    }
}

// function to get user info by passing id in get menthod in url after /:id .  
export const getMyProfile = (req, res) => {

    try {
        const user = req.user;
        if (req.user) {
            res.status(200).json({
                success: true,
                message: "User found",
                userId: user._id,
                username: user.name,
                email: user.email,
            })
        } else {
            return next(new ErrorHandler("User not found.", 404));
        }
    } catch (error) {
        next(error);
    }
}
