import { v4 as uuidv4 } from 'uuid';
import User from "../models/user.js";
import { setUser } from '../service/auth.js';

export async function handleUserSignup(req,res) {

    const {name,email,password}=req.body;
    await User.create({
        name,
        email,
        password,
    });

    return res.render("login");

    
}

export async function handleLogin(req,res) {
    const {name,password}=req.body;

    const user=await User.findOne({name,password})
    if(!user){
        return res.json({message:"Invalid Credentials"});

    }
    const sessionId=uuidv4();
    setUser(sessionId,user);
    res.cookie("uid",sessionId);
    return res.redirect("/");
    
}