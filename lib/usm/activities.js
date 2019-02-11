'use strict'

module.exports = Activities

function Activities(jsonActivities) {

    if (jsonActivities === undefined) {
        throw new ReferenceError('No Activities object given!')
    }

    if (!(jsonActivities instanceof Object)) {
        throw new ReferenceError('Given Activities object is not an object!')
    }

    this.jsonData = jsonActivities

    // if (this.jsonData) {
    // if (this.jsonData.activities) {
    //     this.activities = new Activities(this.jsonData.activities)
    // }
    // }
}

Activities.prototype.render = function () {
    return '<div class="activities"></div>'
}