const express = require('express');
const router = express.Router();
const mailer = require('../helper/mailer')

router.post("/send", async (req, res) => {
    try{
        await mailer()
    }catch(err){

    }
})

module.exports = router;