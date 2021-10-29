const express = require('express');  
const app = express()
require('dotenv').config()

//DB config
const connection = require('./config/db.config.js');
connection.once('open',() => console.log('db connected'))
connection.on('error', () => console.log('Error'))

//Routes config
app.use(express.json({
    extended: false
}))
app.use('/', require('./src/routes/redirects'));
app.use('/api/url', require('./src/routes/url'));


const PORT = process.env.PORT || 5000
// Listen for incoming requests
app.listen(PORT, () => console.log(`server started, listening PORT ${PORT}`))