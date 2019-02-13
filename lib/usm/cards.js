'use strict'

module.exports = Cards

const logger = require('../logger/logger')

const Card = require('./card')

function Cards(jsonCards) {

    if (jsonCards === undefined) {
        throw new ReferenceError('No list of Cards given!')
    }

    if (!Array.isArray(jsonCards)) {
        throw new TypeError('Given Cards is not a list!')
    }

    this.jsonData = jsonCards
    this.cards = []

    for (let i = 0; i < this.jsonData.length; i++) {
        this.cards.push(new Card(this.jsonData[i]))
    }

}

Cards.prototype.render = function () {
    let result = '<div class="cards">'

    if (this.jsonData.length > 0) {
        for (let i = 0; i < this.jsonData.length; i++) {
            result += '\n    <div class="card"></div>'
        }
        result += '\n'
    }

    result += '</div>'

    return result
}