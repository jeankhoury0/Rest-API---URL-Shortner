const mongoose = require('mongoose')

var DB_URI = process.env.DB_URL
// declare a Database string URI
// establishing a database connection
if(process.env.NODE_ENV == "TEST"){
    DB_URI = process.env.DB_TEST_URL;
    console.log("Testing mode successfull")
}
if(process.env.NODE_ENV=="LOCALHOST"){
    DB_URI = process.env.DB_LOCAL_URL;
}
console.log(DB_URI);
mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const connection = mongoose.connection


// export the connection object
module.exports = connection
