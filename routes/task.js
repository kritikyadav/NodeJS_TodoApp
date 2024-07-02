import express from "express";
import { deleteMyTask, getMyTask, newTask, updateMyTask } from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";


const router = express.Router();

// create new task 
router.post("/new", isAuthenticated, newTask);
// get my task
router.get("/getMyTask", isAuthenticated, getMyTask);

// update and delete my task. 
router.route("/:id")
    .put(isAuthenticated, updateMyTask)
    .delete(isAuthenticated, deleteMyTask)

export default router; 
