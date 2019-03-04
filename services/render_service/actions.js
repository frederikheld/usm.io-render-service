'use strict'

const tokenizer = require('./../../lib/tokenizer/tokenizer')

const fs = require('fs').promises
const fx = require('mkdir-recursive')
const path = require('path')

const Usm = require('./../../lib/usm/usm')

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

    // content of field "usm" is not an object:
    if (!(req.body.usm instanceof Object)) {
        res.status(400).send()
        return
    }

    // TODO: The checks above should work more like this,
    //       since Usm is already performing the same checks.
    //
    // let usm
    // try {
    //     usm = new Usm(req.body.usm)
    // } catch (err) {
    //     if (err === ReferenceError) {
    //         // no data passed at all
    //         res.status(400).send()
    //     } else if (err === TypeError) {
    //         // data not an json object
    //         res.status(400).send()
    //     } else {
    //         res.status(400).send()
    //     }
    // }

    const usmJson = req.body.usm

    const usm = new Usm(usmJson)
    const usmHtml = usm.render()

    await fx.mkdir(path.join(__dirname, 'download'), {}, async () => {
        const downloadToken = tokenizer.generateDownloadToken(20)

        await fs.writeFile(path.join(__dirname, 'download', downloadToken), usmHtml, { encoding: 'utf8' })

        res.status(200).send({
            token: downloadToken
        })
    })
}

actions.download = async (req, res) => {
    let htmlResult
    try {
        htmlResult = await fs.readFile(path.join(__dirname, 'download', req.query.token))
        res.status(200).send({ html: htmlResult.toString() })
    } catch (err) {
        throw err
    }
}

actions.hello = (req, res) => {
    if (req.query.name) {
        res.status(200).send('Hello ' + req.query.name + '!')
    } else {
        res.status(200).send('Hello World!')
    }
}

module.exports = actions
