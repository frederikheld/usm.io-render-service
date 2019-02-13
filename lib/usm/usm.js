'use strict'

const logger = require('../logger/logger')

const ActivitiesContainer = require('./activities')

module.exports = Usm

function Usm(jsonUsm) {

    if (jsonUsm === undefined) {
        throw new ReferenceError('No USM object given!')
    }

    if (!(jsonUsm instanceof Object) || Array.isArray(jsonUsm)) {
        throw new TypeError('Given USM object is not an object!')
    }

    this.jsonUsm = jsonUsm

    if (this.jsonUsm) {
        if (this.jsonUsm.activities) {
            this.activities = new ActivitiesContainer(this.jsonUsm.activities)
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