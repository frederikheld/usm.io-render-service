'use strict'

// == config == //

const config = {
    port: 5324,
    apiEndpoint: '/api'
}

// ============ //

const logger = require('./../../lib/logger/logger')

const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const routes = require('./routes')
app.use(config.apiEndpoint, routes)

var server = app.listen(config.port, () => {
    logger.info('Render Service is listening on port ' + config.port + '. API endpoint is ' + config.apiEndpoint)
})

module.exports = server
