import { nanoid } from "nanoid";
import URL from "../models/url.js";


export async function handleGenerateNewShortURL(req,res) {
    const body=req.body;
    if(!body.url) return res.status(400).json({error: 'url is required.'})

    const shortID=nanoid(8);
    await URL.create({
        shortId:shortID,
        reDirectURL:body.url,
        visitHistory:[],
        createdBy:req.user._id,
    });

    console.log(shortID);
    return res.render('home',{
        id:shortID,
    })
    
    
    
    
}


export async function handleGetURlById(req,res) {
    const shortID=req.params.shortID;
    if(!shortID){
        res.status(400).json({error:'shortURL is required.'})
    }
    
    const entry=await URL.findOneAndUpdate({shortId:shortID},{$push :{
        visitHistory:{
            timestamp:Date.now(),
        }
    }});

    if(!entry){
        return res.status(404).json({error:'Short url not found.'});
    }

    res.redirect(entry.reDirectURL);
}


export async function handleGetAnalytics(req,res) {
    const shortID=req.params.shortID;
    if(!shortID){
        res.status(400).json({error:"Enter a short URL."})
    }

    const analytics=await URL.findOne({shortId:shortID});

    return res.json({totalClicks: analytics.visitHistory.length,
                            analytics: analytics.visitHistory
    });
    
}


