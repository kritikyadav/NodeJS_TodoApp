import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async(req, res, next) => {
    // fetch id if you are loged in. 
    // loged in if token cookie exists. 
    const { token } = req.cookies;
    if (!token) {
        return res.status(404)
            .json({
                success: false,
                message: "Login first.",
            })
    }
    const decoded = jwt.verify(token , process.env.JWT_SECRET);
    // req.user will have data if loged in.
    req.user = await User.findById(decoded._id);
    next();
}
