// import {
//     Activity
// } from './activity.js'
const Activity = require('./activity')

// export {
//     Backbone
// }
module.exports = Backbone

function Backbone(jsonBackbone, jsonRoadmap) {
    this.jsonBackbone = jsonBackbone
    this.jsonRoadmap = jsonRoadmap
}
Backbone.prototype.render = function (domElement, domContext) {
    var svgBackbone = domElement
        .append("g")
        .attrs({
            class: "backbone"
        })


    this.jsonBackbone.activity.forEach(function (jsonActivity, indexActivity) {
        var offsetX = jsonActivity.numberOfCardsBefore * 110 + indexActivity * 20
        var activity = new Activity(jsonActivity, this.jsonRoadmap)
        activity.render(svgBackbone, domContext, offsetX)
    }, this)

}