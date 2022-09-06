const express = require('express');
const Url = require('../model/urlModel');
const User = require('../model/userModel');
const authHelper= require('../helper/authHelper')

const getAllURLForUser = async(userToken) =>{
    var extractedUID = authHelper.decryptUserId(userToken);
    const userID= (await User.findOne(
        {"_id": extractedUID}
    ))

    if (await userID == null) {
        console.error("is null")
        return;
    }
    const allURL = (await Url.find(
            {"createdBy":userID}
    ))
    return allURL;
    
}

module.exports =  {getAllURLForUser};