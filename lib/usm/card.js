'use strict'

const logger = require('../logger/logger')

module.exports = Card

function Card(jsonCard) {

    if (jsonCard === undefined) {
        throw new ReferenceError('No Card object given!')
    }

    if (!(jsonCard instanceof Object) || Array.isArray(jsonCard)) {
        throw new TypeError('Given Card object is not an object!')
    }

    this.jsonData = jsonCard

}

Card.prototype.render = function () {

    let result = '<div class="card">'

    result += '</div>'

    return result
}