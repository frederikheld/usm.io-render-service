'use strict'

const tokenizer = require('../lib/tokenizer.js')

let actions = {
    render: {}
}

actions.render.svg = (req, res) => {
    let token = tokenizer.generateDownloadToken(20)
    res.status(200).send({ token: token })
}

module.exports = actions