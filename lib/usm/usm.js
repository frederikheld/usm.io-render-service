'use strict'

const logger = require('../logger/logger')

const Activities = require('./activities')

module.exports = Usm

function Usm(jsonUsm) {

    if (jsonUsm === undefined) {
        throw new ReferenceError('No USM object given!')
    }

    if (!(jsonUsm instanceof Object)) {
        throw new ReferenceError('Given USM object is not an object!')
    }

    this.jsonData = jsonUsm

    if (this.jsonData) {
        if (this.jsonData.activities) {
            this.activities = new Activities(this.jsonData.activities)
        }
    }
}

Usm.prototype.render = function () {

    let result = '<div class="usm">'

    // render sub objects

    if (this.activities) {
        result += '\n    ' + this.activities.render() + '\n'
    }

    result += '</div>'

    // // logger.debug('result in usm.js:')
    // // logger.debug(result)

    return result

}