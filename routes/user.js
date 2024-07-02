/**
 * This filed which is in routes will only be used to redirect all the urls. 
 */

import express from "express"
import {  getAllUsers, getMyProfile , login, register, logout,  } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/login", login);

router.get("/logout", logout);

router.post("/new", register);

router.get("/all", getAllUsers);

// if you are already loged in then you already have id. 
router.route("/me")
        .get(isAuthenticated, getMyProfile)

export default router;
