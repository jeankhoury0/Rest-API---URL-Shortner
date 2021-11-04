const express = require('express');
const registerController = require('../controller/registerController')
const router = express.Router();

router.post('/', async(req, res) =>{
  return await registerController(req,res);
});

module.exports = router;