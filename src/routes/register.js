const express = require('express');
const registerController = require('../controller/registerController')
const router = express.Router();

/**
 * @api {post} /register Register a user to obtain a token
 * @apiName PostLogin
 * @apiGroup User
 * 
 * @apiBody {String} email The User Email
 * @apiBody {String} password The user Password
 * 
 * @apiSuccess {String} [token] The x-access-token to pass in the header as API Key
 * 
 * @apiError [400] Please enter an email and a password
 * @apiError [401] Invalid Credentials. If you dont have an account please register
 * 
 */
router.post('/', async(req, res) =>{
  return await registerController(req,res);
});

module.exports = router;