import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import {restrictToLoggedInUserOnly,checkAuth} from './middleware/auth.js';

import { connectToMongoDB } from './connect.js';

import urlRouter from './routes/url.js';
import staticRouter from './routes/staticRouter.js';
import userRouter from './routes/user.js';

const PORT=3000;
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.set("view engine","ejs");
app.set('views',path.resolve("./views"))

connectToMongoDB('mongodb://localhost:27017/short-url').then(()=>console.log('MongoDB connected'));

app.use("/url",restrictToLoggedInUserOnly,urlRouter);
app.use("/",checkAuth,staticRouter);
app.use("/user",userRouter)

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
    
});