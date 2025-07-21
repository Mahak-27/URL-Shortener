import express from 'express';
import { handleLogin, handleUserSignup } from '../controllers/user.js';

const router=express.Router();

router.post('/',handleUserSignup);

router.post('/login',handleLogin)


export default router;