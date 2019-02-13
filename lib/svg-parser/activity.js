// import {
//     Step
// } from './step.js'
// import {
//     Card
// } from './card.js'
const Step = require('./step')

// export {
//     Activity
// }
module.exports = Activity

function Activity(jsonActivity, jsonRoadmap) {
    this.jsonActivity = jsonActivity
    this.jsonRoadmap = jsonRoadmap
}
Activity.prototype.render = function (domElement, domContext, offsetX = 0) {
    var svgActivity = domElement
        .append("g")
        .attrs({
            class: "activity",
            transform: "translate(" + offsetX + ", 0)"
        })

    // render activity card:
    var activityCard = new Card(this.jsonActivity)
    activityCard.render(svgActivity, domContext)

    // render activity body:
    var offsetY = 70
    var activityBody = new ActivityBody(this.jsonActivity.body, this.jsonRoadmap)
    activityBody.render(svgActivity, domContext, offsetY)

}

var ActivityBody = function (jsonActivityBody, jsonRoadmap) {
    this.jsonActivityBody = jsonActivityBody
    this.jsonRoadmap = jsonRoadmap
}
ActivityBody.prototype.render = function (domElement, domContext, offsetY = 0) {
    // TODO: Calculate offset according to numbers of step
    var svgActivityBody = domElement
        .append("g")
        .attrs({
            class: "activitybody",
            transform: "translate(0, " + offsetY + ")"
        })

    this.jsonActivityBody.step.forEach(function (jsonStep, indexStep) {
        var offsetX = indexStep * 110
        var step = new Step(jsonStep, this.jsonRoadmap)
        step.render(svgActivityBody, domContext, offsetX)
    }, this)
}