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
    CreatedBy:{
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    ClickCounter: {
        type: Number, 
        default: 0
    }
})

module.exports = mongoose.model('Url', URLSchema);
