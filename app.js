const express = require('express');  
const cors = require('cors');
const app = express();
require('dotenv').config();

//DB config
const connection = require('./config/db.config.js');
connection.once('open',() => console.log('db connected'))
connection.on('error', () => console.log('Error'))

//auth middleware
const auth = require("./src/middleware/auth");
app.post("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome");
  });

//Routes config
app.use(cors())
app.use(express.json({
    extended: false
}))
app.use('/', require('./src/routes/redirects'));
app.use('/url',auth, require('./src/routes/url'));
app.use('/register', require("./src/routes/register"));
app.use('/login', require("./src/routes/login"));

module.exports = app;