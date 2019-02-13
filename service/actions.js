'use strict'

const logger = require('../lib/logger/logger')
const tokenizer = require('../lib/tokenizer/tokenizer')

const fs = require('fs')

const Usm = require('../lib/usm/usm')

let actions = {
    render: {}
}

actions.render.html = (req, res) => {

    // no data sent:
    if (!Object.keys(req.body).length) {
        res.status(400).send()
        return
    }

    // field "usm" missing:
    if (!req.body.usm) {
        res.status(400).send()
        return
    }

    const usmJson = req.body.usm

    // WARNING: the upcoming part is
    // for debugging and not testet yet!
    const usm = new Usm(usmJson)
    const usmHTML = usm.render()
    fs.writeFile(__dirname + '/public/usm.html', usmHTML, (err) => {
        if (err) {
            throw err
        }
    })
    // END

    const downloadToken = tokenizer.generateDownloadToken(20)

    res.status(200).send({ token: downloadToken })
    return

}

actions.render.svg = (req, res) => {

    // get payload from request:
    const usmJson = req.body

    // generate usm:

    // const USM = new usm(usmJson)


    // store usm in download area:
    const downloadToken = tokenizer.generateDownloadToken(20)

    // TODO: check if there's no file with this token yet!


    // send result:
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