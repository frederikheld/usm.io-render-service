'use strict'

// == imports == //

const logger = require('../../lib/logger')

var argv = require('minimist')(process.argv.slice(2))

const path = require('path')
const fs = require('fs').promises

const express = require('express')

const request = require('request-promise-native')


// == config == //

const config = {
    port: argv.port || argv.p || 8080,
    renderServer: {
        apiPath: '/api',
        apiProtocol: argv.render_service_protocol || process.env.RENDER_SERVICE_PROTOCOL || 'http',
        apiHostname: argv.render_service_hostname || process.env.RENDER_SERVICE_HOSTNAME || "localhost",
        apiPort: argv.render_service_port || process.env.RENDER_SERVICE_PORT || 5324
    }
}

// ============ //

config.renderServer.apiEndpoint = config.renderServer.apiProtocol + '://' + config.renderServer.apiHostname + ':' + config.renderServer.apiPort + config.renderServer.apiPath

console.log(config.renderServer.apiEndpoint)


function publishWebInterface() {

    const app = express()

    app.use(express.static(path.join(__dirname, 'public')))
    app.get('/', async (req, res) => {

        // load json usm from file
        const usmJson = JSON.parse(await fs.readFile(path.join(__dirname, 'data', 'usm.json'), 'utf-8'))

        // send json usm to render server --> receive download token
        let downloadToken
        try {
            const body = await request({
                method: 'POST',
                uri: config.renderServer.apiEndpoint + '/render/html',
                body: {
                    'usm': usmJson,
                    'css': './assets/styles.css',
                    'js': './assets/scripts.js',
                    'timeline': true
                },
                json: true
            })

            downloadToken = body.token

        } catch (err) {
            throw err
        }

        // send download token to render server --> download html usm
        let html
        try {
            const body2 = await request({
                method: 'GET',
                uri: config.renderServer.apiEndpoint + '/download?token=' + downloadToken,
                json: true
            })

            html = body2.html

        } catch (err) {
            throw err
        }
            
        // save html usm to ./public/index.html
        try {
            await fs.writeFile(
                path.join(__dirname, 'public', 'usm.html'),
                html,
                'utf-8'
            )
        } catch (err) {
            throw err
        }
                
        // serve ./public/usm.html as static website
        res.sendFile(path.join(__dirname, 'public', 'usm.html'))

    })

    let server = app.listen(config.port, () => {
        logger.info('Server is listening on port ' + config.port)
    })
    
}
publishWebInterface()
