'use strict'

// == config == //

const config = {
    port: 8080,
    renderServer: {
        apiEndpoint: 'http://localhost:5324/api'
    }
}

// ============ //

const logger = require('./../../lib/logger/logger')

const path = require('path')
const fs = require('fs').promises

const express = require('express')
const app = express()

const request = require('request-promise-native')

app.use(express.static(path.join(__dirname, 'public')))
app.get('/', async (req, res) => {

    // load json usm from file
    const usmJson = JSON.parse(await fs.readFile(path.join(__dirname, 'data', 'usm.json'), 'utf-8'))

    // send json usm to render server --> receive download token
    const body = await request({
            method: 'POST',
            uri: config.renderServer.apiEndpoint + '/render/html',
            body: {
                'usm': usmJson
            },
            json: true
    })   
    const downloadToken = body.token
    
    // send download token to render server --> download html usm
    const body2 = await request({
        method: 'GET',
        uri: config.renderServer.apiEndpoint + '/download?token=' + downloadToken,
        json: true
    })
    const html = body2.html

    // save html usm to ./public/index.html
    await fs.writeFile(
        path.join(__dirname, 'public', 'usm.html'),
        html,
        'utf-8'
    )

    // serve ./public/usm.html as static website
    res.sendFile(path.join(__dirname, 'public', 'usm.html'))
})

let server = app.listen(config.port, () => {
    logger.info('Server is listening on port ' + config.port)
})

module.exports = server
