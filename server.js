'use strict'

// -- imports

// const minimist = require('minimist')
const express = require('express')
// const path = require('path')

// -- routes

// var Actions = require('./actions.js')
// var actions = new Actions('./data/usm.xml')


// -- config

// var args = minimist(process.argv.slice(2), {
//     string: ['port'],
//     alias: {
//         p: 'port'
//     },
//     default: {
//         port: 8080
//     }
// })


// -- describe api

var app = express()

app.get('/', (request, response) => {
    response.status(200).send('ok')
})


var server = app.listen(8080, () => {
    var port = server.address().port
    console.log('Server listening at port %s', port)
})


// -- exports

module.exports = server