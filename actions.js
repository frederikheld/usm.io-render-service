'use strict'

const fs = require('fs')
// const xmlParser = require('xml-js')
const xmlParser = require('xml2js')

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

                // var json = xmlParser.xml2js(result, {
                //     compact: false,
                //     ignoreComment: true
                // })

                // console.log(json)
                // return resolve(JSON.stringify(json))

                xmlParser.parseString(result, {
                        preserveChildrenOrder: true
                    },
                    (error, result) => {
                        console.log(result)
                        return resolve(result)
                    })


            })

        })
    }

}