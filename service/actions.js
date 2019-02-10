'use strict'

const logger = require('../lib/logger/logger')
const tokenizer = require('../lib/tokenizer/tokenizer')

let actions = {
    render: {}
}

actions.render.svg = (req, res) => {

    const usmJson = req.body

    // TODO: do something with it

    const downloadToken = tokenizer.generateDownloadToken(20)

    // TODO: check if there's no file with this token yet!

    res.status(200).send({ token: downloadToken })
}

actions.hello = (req, res) => {
    if (req.query.name) {
        res.status(200).send("Hello " + req.query.name + "!")
    } else {
        res.status(200).send("Hello World!")
    }
}

module.exports = actions