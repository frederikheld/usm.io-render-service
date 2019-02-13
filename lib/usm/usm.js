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

    if (this.jsonUsm.activities) {
        this.activities = new ActivitiesContainer(this.jsonUsm.activities)
    }
}

Usm.prototype.render = function () {

    // render header:
    let result = '<!DOCTYPE html>\n'
    result += '\n<html>\n'
    result += '\n<head>'
    result += '\n    <meta charset="utf-8">'
    result += '\n    <title>usm.io</title>'
    result += '\n</head>\n'
    result += '\n<body>'

    // render usm:
    result += '<div class="usm">'
    if (this.activities) {
        result += '\n    ' + this.activities.render() + '\n'
    }
    result += '</div>'

    // render footer:
    result += '\n</body>\n'
    result += '\n</html>'

    return result

}