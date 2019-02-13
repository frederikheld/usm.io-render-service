'use strict'

const logger = require('../logger/logger')

const Cards = require('./cards')

module.exports = Step

function Step(jsonStep) {

    if (jsonStep === undefined) {
        throw new ReferenceError('No Step object given!')
    }

    if (!(jsonStep instanceof Object) || Array.isArray(jsonStep)) {
        throw new TypeError('Given Step object is not an object!')
    }

    this.jsonData = jsonStep

    if (this.jsonData.cards) {
        this.cards = new Cards(this.jsonData.cards)
    }

}

Step.prototype.render = function () {

    let result = '<div class="step">'

    if (this.cards) {
        result += '\n    ' + this.cards.render() + '\n'
    }

    result += '</div>'

    return result
}