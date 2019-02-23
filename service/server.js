'use strict'

const logger = require('../lib/logger/logger')

const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const routes = require('./routes')
app.use('/api', routes)

var server = app.listen(8080, () => {
    var port = server.address().port
    logger.log('Server listening on port ' + port)
})

module.exports = server
