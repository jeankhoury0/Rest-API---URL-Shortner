const express = require('express');
const validUrl = require('valid-url')
const shortid = require('shortid')
const router = express.Router();
const Url = require('../model/urlModel')
const baseURL = process.env.BASE_URL

router.post('/shorten', async (req, res) => {
    
    var isSpecial = true;
    var {
        longUrl,
        urlCode,
    } = req.body;

    // check base url if valid using the validUrl.isUri method
    if (!validUrl.isUri(baseURL)) {
        return res.status(401).json('invalid base URL')
    }

    //check if has url code and validate that it does not have
    if (urlCode != undefined) {
        let urlCodeAlreadyExist = await Url.findOne({
            urlCode
        })
        if (urlCodeAlreadyExist){
            res.status(409).json('short url already exist');
            return null;
        }
    } else {
        urlCode = shortid.generate();
        isSpecial = false;
    }


    if (validUrl.isUri(longUrl)) {
        try {
            let url = await Url.findOne({
                longUrl
            })
            if (url) {
                //case url alraedy in DB
                res.json(url);
            } else {
                //join the generated short code to base url
                const ShortUrl = baseURL + '/' + urlCode;

                //save to DB
                url = new Url({
                    longUrl,
                    ShortUrl,
                    urlCode,
                    date: new Date(),
                    isSpecial
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
