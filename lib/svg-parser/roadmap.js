// export {
//     Roadmap
// }
module.exports = Roadmap

function Roadmap(jsonRoadmap) {
    this.jsonRoadmap = jsonRoadmap
}
Roadmap.prototype.render = function (domElement, width, offsetY = 0) {

    var svgRoadmap = domElement
        .append("g")
        .attrs({
            class: "roadmap",
            transform: "translate(0," + offsetY + ")"
        })

    this.jsonRoadmap.release.forEach(function (release, releaseIndex) {

        // calculate y-offset for this release:
        var releaseOffsetY = release.maxCardsBefore * 70 + release.releasesBefore * 20 + release.maxCards * 70

        var svgRelease = svgRoadmap
            .append("g")
            .attrs({
                class: "release",
                transform: "translate(0," + releaseOffsetY + ")"
            })

        svgRelease
            .append("rect")
            .attrs({
                x: 0,
                y: 0,
                width: width,
                height: 1
            })

        svgRelease
            .append("text")
            .text(release.name._text + " (" + release.maxCards + ")")
            .attrs({
                x: 0,
                y: -5,
                width: width,
                height: 1
            })
    }, this)

}