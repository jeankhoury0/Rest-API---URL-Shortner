const express = require('express');
const validUrl = require('valid-url')
const shortid = require('shortid')
const router = express.Router();
const Url = require('../model/urlModel');
const User = require('../model/userModel');
const {getAllURLForUser} = require('../controller/url-query')
const baseURL = process.env.BASE_URL;
const authHelper = require('../helper/authHelper')

router.post('/shorten', async (req, res) => {

    var isSpecial = true;
    var {
        longUrl,
        urlCode,
    } = req.body;
    const decryptedID = authHelper.decryptUserId(req.headers["x-access-token"]) 
    const userId = (await User.findOne(
        {"_id":decryptedID}
        ))

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
                //join the generated short code to base url
                const ShortUrl = baseURL + '/' + urlCode;
                //save to DB
                url = new Url({
                    longUrl,
                    ShortUrl,
                    urlCode,
                    date: new Date(),
                    isSpecial,
                    CreatedBy: userId,
                })
                await url.save();
                res.json(url);
            }
        
        catch (err) {
            console.log(err);
            res.status(500).json('Server Error')
        }
    } else {
        res.status(400).json('invalid url');
    }
})


router.get('/allURLforUser' , async (req, res) => {
    const Usertoken = req.headers["x-access-token"]
    res.json(await getAllURLForUser(Usertoken));
})

module.exports = router;
