const express = require('express');
const User = require('../model/userModel');
const authHelper= require('../helper/authHelper')


const readUser = (async(req,res)=>{
    const userToken = req.headers["x-access-token"]
    var extractedUID = authHelper.decryptUserId(userToken);
    const user = (await User.findOne(
        {"_id": extractedUID}
    ))
    if (await user == null) {
        console.error("is null")
        return;
    }
    return await user;
    
})

const updateUser = (async(req,res)=>{

})

const deleteUser = (async(req,res)=>{
    const userToken = req.headers["x-access-token"]
    var extractedUID = authHelper.decryptUserId(userToken);
    const user = await User.findByIdAndDelete({"_id":extractedUID})  
    return await user;

})

module.exports = {
    readUser, updateUser, deleteUser}