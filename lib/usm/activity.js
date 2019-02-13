'use strict'

const logger = require('../logger/logger')

module.exports = Activity

function Activity(jsonActivity) {

    if (jsonActivity === undefined) {
        throw new ReferenceError('No Activity object given!')
    }

    if (!(jsonActivity instanceof Object) || Array.isArray(jsonActivity)) {
        throw new TypeError('Given Activity object is not an object!')
    }

    this.jsonData = jsonActivity

    // if (this.jsonData) {
    //     if (this.jsonData.steps) {
    //         this.steps = new Steps(this.jsonData.activities)
    //     }
    // }
}

Activity.prototype.render = function () {

    let result = '<div class="activity">'

    if (this.jsonData.steps) {
        result += '\n    <div class="steps"></div>\n'
    }

    result += '</div>'

    return result
}