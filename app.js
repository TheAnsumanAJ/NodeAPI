import express from 'express';
import  userRouter  from './routes/user.js';
import taskRouter from './routes/task.js';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from "cors";

export const app = express();

config({
    path: "./features/config.env",
});

app.use(cors({
    origin: 'FRONTEND_URL',
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}));

app.use(express.json());
app.use(cookieParser());
app.use(userRouter);
app.use("/tasks",taskRouter);
app.use(cors({
    origin: 'http://localhost:5173',
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}));

app.get('/',(req,res)=>{
    res.send("Hello AJ!");
});

