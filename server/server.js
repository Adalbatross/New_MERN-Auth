import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import 'dotenv/config'
import connectDB from "./config/mogodb.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";

const app = express();
const port = process.env.PORT || 4000;
const allowedOrigins = "http://localhost:5173"
connectDB();
app.use(express.json());
app.use(cors({ origin : allowedOrigins, credentials : true}))
app.use(cookieParser())

app.get('/', (req,res)=>{
    res.send("Shinzo sasageyo")
})

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.listen(port, ()=>{
    console.log(`Currently listening on ${port}.....`);
})