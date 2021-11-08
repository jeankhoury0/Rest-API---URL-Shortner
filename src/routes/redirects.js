const express = require('express');
const router = express.Router();
const redirectsController = require('../controller/redirectsController') 

router.get('/', (req,res)=>{
        // For default adress
        return res.redirect("https://short.001.lat/")
});

router.get('/:code', async (req, res) => {
        const a = await redirectsController(req, res)
        // // return res.redirect(); 
});

module.exports = router;
