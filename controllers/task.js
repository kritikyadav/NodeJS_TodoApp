import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

// created new task. 
export const newTask = async (req, res, next) => {
    try {
        const { title, description } = req.body;

        await Task.create({
            title,
            description,
            user: req.user,
        });

        res.status(201)
            .json({
                success: true,
                message: "Task added successfully.",
            })
    } catch (error) {
        next(error);
    }
}

// get my task
export const getMyTask = async (req, res, next) => {

    try {
        const task = await Task.find({ user: req.user._id });
        res.status(201)
            .json({
                success: true,
                tasks: task,
            })
    } catch (error) {
        next(error);
    }
}

// update task.
export const updateMyTask = async (req, res, next) => {

    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return next(new ErrorHandler("Task not found", 404));
        }

        task.isCompleted = !task.isCompleted;
        await task.save();

        res.status(201)
            .json({
                success: true,
                message: "task updated",
                tasks: task,
            })
    } catch (error) {
        next(error);
    }
}

// delete task
export const deleteMyTask = async (req, res, next) => {

    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return next(new ErrorHandler("Task not found", 404));
        }

        await task.deleteOne();

        res.status(201)
            .json({
                success: true,
                message: "task deleted",
            })
    } catch (error) {
        next(error);
    }
}
