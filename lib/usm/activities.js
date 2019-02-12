'use strict'

module.exports = Activities

const logger = require('../logger/logger')

function Activities(jsonActivities) {

    if (jsonActivities === undefined) {
        throw new ReferenceError('No list of Activities given!')
    }

    if (!Array.isArray(jsonActivities)) {
        throw new TypeError('Given Activities is not a list!')
    }

    this.jsonData = jsonActivities

    // if (this.jsonData) {
    // if (this.jsonData.activities) {
    //     this.activities = new Activities(this.jsonData.activities)
    // }
    // }
}

Activities.prototype.render = function () {
    let result = '<div class="activities">'

    if (this.jsonData.length > 0) {
        for (let i = 0; i < this.jsonData.length; i++) {
            result += '\n    <div class="activity"></div>'
        }
        result += '\n'
    }

    result += '</div>'

    return result
}