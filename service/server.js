const express = require('express')
const app = express()

const routes = require('./routes')
app.use('/api', routes)

var server = app.listen(8080, () => {
    var port = server.address().port
    console.log('Server listening on port %s', port)
})

module.exports = server
