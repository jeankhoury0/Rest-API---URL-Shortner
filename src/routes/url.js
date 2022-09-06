const express = require('express');
const validUrl = require('valid-url')
const shortid = require('shortid')
const router = express.Router();
const Url = require('../model/urlModel');
const User = require('../model/userModel');
const {getAllURLForUser} = require('../controller/url-query')
const baseURL = process.env.BASE_URL;
const authHelper = require('../helper/authHelper');
const urlController = require('../controller/urlControllers');

router.post('/shorten', async (req, res) => {
    return await urlController(req, res)
})


router.get('/allURLforUser' , async (req, res) => {
    const Usertoken = req.headers["x-access-token"]
    res.json(await getAllURLForUser(Usertoken));
})

module.exports = router;
