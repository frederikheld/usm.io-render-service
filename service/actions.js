'use strict'

const tokenizer = require('../lib/tokenizer/tokenizer')

const fs = require('fs').promises
const fx = require('mkdir-recursive')
const fsSync = require('fs')
const path = require('path')

// const usm = require('../lib/usm/usm')

let actions = {
    render: {}
}

actions.render.html = async (req, res) => {
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

    // logger.debug(JSON.stringify(req.body.usm))

    // const usmJson = req.body.usm

    // WARNING: the upcoming part is
    // for debugging and not testet yet!
    // const usm = new Usm(usmJson)
    // const usmHTML = usm.render()
    // fs.mkdir(__dirname + '/public', {
    //     recursive: true
    // }, (err) => {
    //     if (err) {
    //         if (err.code === 'EEXIST') {
    //             // don't throw. An existing directory is exactly what we want.
    //         } else {
    //             throw err
    //         }
    //     }

    //     fs.writeFile(__dirname + '/public/usm.html', usmHTML, (err) => {
    //         if (err) throw err
    //     })
    // })
    // END

    await fx.mkdir(path.join(__dirname, 'download'), {}, async () => {
        const downloadToken = tokenizer.generateDownloadToken(20)

        await fs.writeFile(path.join(__dirname, 'download', downloadToken), 'Hello World!', { encoding: 'utf8' })

        res.status(200).send({
            token: downloadToken
        })
    })
}

actions.hello = (req, res) => {
    if (req.query.name) {
        res.status(200).send('Hello ' + req.query.name + '!')
    } else {
        res.status(200).send('Hello World!')
    }
}

module.exports = actions
