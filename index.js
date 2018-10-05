'use strict'

// -- imports

const minimist = require('minimist')
const express = require('express')
const path = require('path')


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

app.use(express.static(path.join(__dirname, "web")))

app.get("/", (request, result) => {
    result.sendFile(path.join(__dirname, "web", "index.html"))
})

app.listen(args.port, () => {
    console.log("ui listening on port " + args.port)
}).on('error', function (error) {
    console.error(error)
})