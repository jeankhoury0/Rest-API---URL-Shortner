const mongoose = require('mongoose');
var Schema = mongoose.Schema;


const urlTransactionModel = new Schema({
    url:{
        type: Schema.Types.ObjectId, 
        ref: 'Url',
    },
    date: {
        type: String,
        default: Date.now,
    },
    userIP: {
        type: String,
        default: null,
    }
    
})

module.exports = mongoose.model('UrlTransaction', urlTransactionModel);
