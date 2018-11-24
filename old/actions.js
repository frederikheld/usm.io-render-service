'use strict'

const fs = require('fs')
const xmlParser = require('xml-js')

module.exports = Actions

function Actions(xmlUrl) {

    this.xmlUrl = xmlUrl

    // this.__constructor = (() => {

    // })(xmlUrl)

    this.getJSON = function () {

        return new Promise((resolve, reject) => {

            console.log(this.xmlUrl)

            fs.readFile(this.xmlUrl, (error, result) => {

                if (error) return reject(error)

                var json = xmlParser.xml2js(result, {
                    compact: true,
                    ignoreComment: true
                })

                console.log(json)
                return resolve(json)

            })

        })
    }

}