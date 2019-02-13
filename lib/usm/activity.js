'use strict'

const logger = require('../logger/logger')

const Steps = require('./steps')

module.exports = Activity

function Activity(jsonActivity) {

    if (jsonActivity === undefined) {
        throw new ReferenceError('No Activity object given!')
    }

    if (!(jsonActivity instanceof Object) || Array.isArray(jsonActivity)) {
        throw new TypeError('Given Activity object is not an object!')
    }

    this.jsonData = jsonActivity

    if (this.jsonData.steps) {
        this.steps = new Steps(this.jsonData.steps)
    }

}

Activity.prototype.render = function () {

    let result = '<div class="activity">'

    if (this.steps) {
        result += '\n    ' + this.steps.render() + '\n'
    }

    result += '</div>'

    return result
}