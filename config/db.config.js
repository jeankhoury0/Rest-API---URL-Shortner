const mongoose = require('mongoose')

// declare a Database string URI
const DB_URI = 'mongodb+srv://testboy:mh6rf7hOK3PeeFOK@cluster0.qvitu.mongodb.net/UrlSolverTest?retryWrites=true&w=majority'

// establishing a database connection
mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const connection = mongoose.connection

// export the connection object
module.exports = connection
