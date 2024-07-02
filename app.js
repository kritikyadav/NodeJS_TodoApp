import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";

import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app = express();

config({
    path: "./data/config.env",
});

// this will be used to catch json file from req.body.
// use express before router as express is required in accessing router
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);

app.get("/", (req, res) => {
    res.send("Good morning. <br> Lets Get Started...");
});

// using error middlewares. 
app.use(errorMiddleware);
