import express from 'express';
import { handleGenerateNewShortURL, handleGetURlById ,handleGetAnalytics } from '../controllers/url.js';

const router=express.Router();

router.post('/',handleGenerateNewShortURL);

router.get('/url/:shortID',handleGetURlById);

router.get('/analytics/:shortID',handleGetAnalytics);



export default router;