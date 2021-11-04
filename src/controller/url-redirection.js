const Url = require('../model/urlModel');
const mongoose = require('mongoose');
var itemsCollection = mongoose.Collection;


//TODO implement IP 
const increaseCounter = async (code) => {
    const query = { "urlCode":code };
    const update = {
    "$set": {
        "ClickCounter": 55,
    }
    };
    const options = { "upsert": false };
    findOneAndUpdate(query, update, options)
    .then(result => {
        const { matchedCount, modifiedCount } = result;
        if(matchedCount && modifiedCount) {
        console.log(`Successfully updated the item.`)
        }
    })
    .catch(err => console.error(`Failed to update the item: ${err}`))

   
}

module.exports = {increaseCounter};