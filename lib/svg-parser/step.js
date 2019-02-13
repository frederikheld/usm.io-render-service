// import {
//     Card
// } from './card.js'
// import {
//     Release
// } from './release.js'
const Card = require('./card')
const Release = require('./release')

// export {
//     Step
// }
module.exports = Step

function Step(jsonStep, jsonRoadmap) {
    this.jsonStep = jsonStep
    this.jsonRoadmap = jsonRoadmap
}
Step.prototype.render = function (domElement, domContext, offsetX = 0) {

    var svgStep = domElement
        .append("g")
        .attrs({
            class: "step",
            transform: "translate(" + offsetX + ", 0)"
        })

    // render step card:
    var stepCard = new Card(this.jsonStep)
    stepCard.render(svgStep, domContext)


    // render step body:
    var offsetY = 85
    var stepBody = new StepBody(this.jsonStep.body, this.jsonRoadmap)
    stepBody.render(svgStep, domContext, offsetY)

}

var StepBody = function (jsonStepBody, jsonRoadmap) {
    this.jsonStepBody = jsonStepBody
    this.jsonRoadmap = jsonRoadmap
}
StepBody.prototype.render = function (domElement, domContext, offsetY = 0) {
    var svgStepBody = domElement
        .append("g")
        .attrs({
            class: "stepbody",
            transform: "translate(0, " + offsetY + ")"
        })

    this.jsonStepBody.release.forEach(function (jsonRelease, indexRelease) {

        function getReleaseKey(jsonRoadmap, releaseId) {
            var result = undefined
            jsonRoadmap.release.forEach(function (jsRel, i) {
                if (jsRel.id._text == releaseId) {
                    result = i
                }
            })
            return result
        }

        var releaseId = jsonRelease._attributes.id
        var releaseKey = getReleaseKey(this.jsonRoadmap, releaseId)

        var offsetY = this.jsonRoadmap.release[releaseKey].maxCardsBefore * 70
        offsetY += this.jsonRoadmap.release[releaseKey].releasesBefore * 20

        var release = new Release(jsonRelease)
        release.render(svgStepBody, domContext, offsetY)
    }, this)
}