const express = require('express');  
const cors = require('cors');
const app = express();
require('dotenv').config();

//DB config
const connection = require('./config/db.config.js');
connection.once('open',() => console.info(''))
connection.on('error', () => console.error('Error'))

//auth middleware
const auth = require("./src/middleware/auth");

//Routes config
app.use(cors())
app.use(express.json({
    extended: false
}))
app.use('/', require('./src/routes/redirects'));
app.use('/url',auth, require('./src/routes/url'));
app.use('/register', require("./src/routes/register"));
app.use('/login', require("./src/routes/login"));
app.use('/email', require("./src/routes/email"));

//if testing mode is enable we create mock data and clear db
if(process.env.NODE_ENV == "TEST"){    
    const seed = require('./config/seed/seedapp')
    console.log("creating the dummy data")
    seed();
}

module.exports = app;