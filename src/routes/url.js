/**
 * @author Jean Khoury
 */

 const express = require('express');
 const validUrl = require('valid-url')
 const shortid = require('shortid')
 
 const router = express.Router();
 
 const Url = require('../model/urlModel')
 //TODO
 const baseURL = 'http:localhost:5000'
 
 router.post('/shorten', async(req, res) => {
     const {
         longUrl
     } = req.body;
     // check base url if valid using the validUrl.isUri method
     if (! validUrl.isUri(baseURL)) {
         return res.status(401).json('invalid base URL')
     }
 
     const urlCode = shortid.generate();
     
     if(validUrl.isUri(longUrl)){
         try {
             let url = await Url.findOne({
                 longUrl
             })
             if(url){
                 //case url alraedy in DB
                 res.json(url);
             } else{
                 //join the generated short code to base url
                 const ShortUrl = baseURL + '/' + urlCode;
 
                 //save to DB
                 url = new Url({
                     longUrl, 
                     ShortUrl, 
                     urlCode, 
                     date: new Date(),
                 })
                 await url.save();
                 res.json(url);
             }
         }
         catch (err) {
             console.log(err);
             res.status(500).json('Server Error')
         }
     } else {
         res.status(400).json('invalid url');
     }
 })
 
 module.exports = router;
 