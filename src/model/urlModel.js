const mongoose = require('mongoose');
var Schema = mongoose.Schema;


const URLSchema = new Schema({
    urlCode: String,
    longUrl: String,
    shortUrl: String,
    date: {
        type: String,
        default: Date.now,
    },
    isSpecial:{
        type: Boolean,
        default: false,
    },
    createdBy:{
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    clickCounter: {
        type: Number, 
        default: 0
    }
})

module.exports = mongoose.model('Url', URLSchema);
