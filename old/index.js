'use strict'

// -- imports

const minimist = require('minimist')
const express = require('express')
const path = require('path')

// -- routes

var Actions = require('./actions.js')
var actions = new Actions('./data/usm.xml')

// -- config

var args = minimist(process.argv.slice(2), {
    string: ['port'],
    alias: {
        p: 'port'
    },
    default: {
        port: 8080
    }
})

// -- publish web interface

var app = express()

app.use(express.static(path.join(__dirname, 'web')))

app.get('/', (request, result) => {
    result.sendFile(path.join(__dirname, 'web', 'index.html'))
})

app.get('/data', (req, res) => {
    actions.getJSON()
        .then((result) => {
            return res.status(200).send({
                msg: 'ok',
                data: result
            })
        })
        .catch((error) => {
            return res.status(500).send({
                msg: 'error',
                error: error
            })
        })
})

app.listen(args.port, () => {
    console.log('ui listening on port ' + args.port)
}).on('error', function (error) {
    console.error(error)
})
