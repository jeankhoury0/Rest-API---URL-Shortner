/**
 * Protected by auth, 
 * Routes to check info about a user
 */

const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')


router.get("/", async(req,res)=>{
    try{
        user = await userController.readUser(req)
        console.log(await user)
        return res.status(201).json(user)
    }catch(err){
        console.log(err);
        return res.status(500).json(err)
    }
})

router.delete("/", async(req,res)=>{
    try{
        return await userController.deleteUser(req).res;
    }catch(err){
        console.log(err);
        return res.status(500).json(err)
    }
})

router.put("/", async(req,res)=>{
    try{
        return await userController.updateUser(req).res;
        // Body of user id
    }catch(err){
        console.log(err);
        return res.status(500).json(err)
    }
})


module.exports = router;