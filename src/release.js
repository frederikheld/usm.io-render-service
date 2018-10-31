import {
    Card
} from './card.js'

export {
    Release
}

function Release(jsonRelease) {
    this.jsonRelease = jsonRelease
}
Release.prototype.render = function (domElement, offsetY = 0) {
    var svgRelease = domElement
        .append("g")
        .attrs({
            class: "release",
            transform: "translate(0, " + offsetY + ")"
        })

    this.jsonRelease.card.forEach(function (jsonCard, indexCard) {

        var offsetY = indexCard * 70 // TODO: Calculate card offset

        var card = new Card(jsonCard)
        card.render(svgRelease, 0, offsetY)
    })
}