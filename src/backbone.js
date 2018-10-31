import {
    Activity
} from './activity.js'

export {
    Backbone
}

function Backbone(jsonBackbone, jsonRoadmap) {
    this.jsonBackbone = jsonBackbone
    this.jsonRoadmap = jsonRoadmap
}
Backbone.prototype.render = function (domElement) {
    var svgBackbone = domElement
        .append("g")
        .attrs({
            class: "backbone"
        })


    this.jsonBackbone.activity.forEach(function (jsonActivity, indexActivity) {
        var offsetX = jsonActivity.numberOfCardsBefore * 110 + indexActivity * 20
        var activity = new Activity(jsonActivity, this.jsonRoadmap)
        activity.render(svgBackbone, offsetX)
    }, this)

}