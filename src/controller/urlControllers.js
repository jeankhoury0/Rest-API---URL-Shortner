const express = require('express');
const validUrl = require('valid-url')
const shortid = require('shortid')
const router = express.Router();
const Url = require('../model/urlModel');
const User = require('../model/userModel');
const {getAllURLForUser} = require('../controller/url-query')
const baseURL = process.env.BASE_URL;
const authHelper = require('../helper/authHelper')

const url = async(req, res) => {
    try{
        var isSpecial = true;
        var {
            longUrl, 
            urlCode
        } = req.body
        const decryptedID = authHelper.decryptUserId(req.headers["x-access-token"]) 
        const userId = (await User.findOne({
            "_id":decryptedID
        })
        )
        
        // check if base url is valid
        if(!validUrl.isUri(longUrl)){
            return res.status(401).json("invalid URL, please use the http:// format")
        }

        // check if shortCode Exist already
        if (urlCode != undefined){
            let isUrlCodeAlreadyExistent = await Url.findOne({
                urlCode: urlCode
            })
            if (await isUrlCodeAlreadyExistent) {
                return res.status(409).json("short URL already exist")
            }
        }else{
            urlCode = shortid.generate();
            isSpecial = false;
        }

        // check if long url is already shorten
        let url = await Url.findOne({
            longUrl: longUrl
        })

        if (await url) return res.json(url)
        
        url = new Url({
            longUrl: longUrl,
            shortUrl: `${baseURL}/${urlCode}`,
            urlCode: urlCode,
            date: new Date(),
            isSpecial: isSpecial,
            createdBy: userId
        })
        await url.save()
        return res.json(url)

    } catch (err){
        res.status(500).json(err)
    }


     
}



module.exports = url;