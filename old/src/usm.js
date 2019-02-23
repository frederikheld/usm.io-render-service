import {
    Timeline
} from './timeline.js'
import {
    Roadmap
} from './roadmap.js'
import {
    Backbone
} from './backbone.js'

export {
    USM
}

/*
    A map
        consists of the timeline (represented by an arrow)
        and the roadmap
            wich consists of releases (represented by dividers)
        and a backbone
            which consists of multiple activities
                which consist of a card
                and of multiple steps
                    which consist of a card
                    and of the body
                        which consist of multiple releases
                            which consist of multiple cards
*/

/*
    Each type of element has it's own class.
    Feed data into constructor.
    Feed svgElement to append to and domContext into prototype.render()
*/

function USM (jsonUSM) {
    this.jsonData = jsonUSM

    this.timeline = new Timeline()
    this.backbone = new Backbone(this.jsonData.usm.backbone, this.jsonData.usm.roadmap)
    this.roadmap = new Roadmap(this.jsonData.usm.roadmap)

    this.optimizeDataStructure()
    this.generateMetaData()
}
USM.prototype.render = function (domElement, domContext, dimensions, doDebug = false) {
    // create canvas as base element for all children to append their elements to:
    console.log(dimensions)
    var svgUSM = domElement
        .append('svg')
        .attrs({
            xmlns: 'http://www.w3.org/2000/svg',
            class: 'usm',
            x: 0,
            y: 0
        })

    var canvas = svgUSM
        .append('g')
        .attrs({
            class: 'canvas',
            transform: 'translate(' + dimensions.marginLeft + ',' + dimensions.marginTop + ')'
        })

    // render children:
    this.backbone.render(canvas, domContext)

    // get space that is occupied by rendered children:
    dimensions.canvasWidth = canvas.node().getBoundingClientRect().width
    dimensions.canvasHeight = canvas.node().getBoundingClientRect().height

    // render content that depends on the space that the children occupy:
    this.timeline.render(canvas, dimensions.canvasWidth, 140)
    this.roadmap.render(canvas, dimensions.canvasWidth, 160)

    // update canvas dimensions:
    dimensions.canvasWidth = canvas.node().getBoundingClientRect().width
    dimensions.canvasHeight = canvas.node().getBoundingClientRect().height

    // render debug information:
    this.renderDebug(canvas, dimensions, doDebug)

    // calculate svg deminesions:
    var svgViewBoxWidth = dimensions.canvasWidth + dimensions.marginRight + dimensions.marginLeft
    var svgViewBoxHeight = dimensions.canvasHeight + dimensions.marginTop + dimensions.marginBottom

    if (typeof dimensions.scaleToWidth !== 'undefined') {
        var svgWidth = dimensions.scaleToWidth
    } else {
        var svgWidth = dimensions.canvasWidth
    }

    if (typeof dimensions.scaleToHeight !== 'undefined') {
        var svgHeight = dimensions.scaleToHeight
    } else {
        var svgHeight = dimensions.canvasHeight
    }

    // set svg dimensions:
    svgUSM
        .attrs({
            width: svgWidth + 'px',
            height: svgHeight + 'px',
            viewBox: '0 0 ' + svgViewBoxWidth + ' ' + svgViewBoxHeight,
            preserveAspectRatio: 'xMinYMin meet'
        })
}
USM.prototype.renderDebug = function (domElement, dimensions, doRender = false) {
    if (doRender) {
        var svgDebug = domElement
            .append('g')
            .attrs({
                class: 'debug'
            })

        renderBoundingBox(svgDebug, dimensions)
    }

    function renderBoundingBox (domElement, dimensions) {
        var svgBoundingBox = domElement
            .append('rect')
            .attrs({
                x: 0,
                y: 0,
                width: dimensions.canvasWidth,
                height: dimensions.canvasHeight
            })
            .styles({
                'stroke': '#f00',
                'stroke-width': 1,
                'stroke-dasharray': '10,10',
                'fill': 'none'
            })
    }
}
USM.prototype.optimizeDataStructure = function () {
    this.jsonData.usm.backbone.activity.forEach(function (jsonActivity, indexActivity) {
        // put single steps inside a activity.body.step into an array
        // as multiple steps already are. This makes further processing cleaner:
        if (!Array.isArray(jsonActivity.body.step)) {
            // var tempRelease = jsonStep.body.release
            var tempStep = this.jsonData.usm.backbone.activity[indexActivity].body.step
            this.jsonData.usm.backbone.activity[indexActivity].body.step = []
            this.jsonData.usm.backbone.activity[indexActivity].body.step[0] = tempStep
        }

        jsonActivity.body.step.forEach(function (jsonStep, indexStep) {
            // put single releases inside a step.body.release into an array
            // as multiple releases already are. This makes further processing cleaner:
            if (!Array.isArray(jsonStep.body.release)) {
                // var tempRelease = jsonStep.body.release
                var tempRelease = this.jsonData.usm.backbone.activity[indexActivity].body.step[indexStep].body.release
                this.jsonData.usm.backbone.activity[indexActivity].body.step[indexStep].body.release = []
                this.jsonData.usm.backbone.activity[indexActivity].body.step[indexStep].body.release[0] = tempRelease
            }

            jsonStep.body.release.forEach(function (jsonRelease, indexRelease) {
                // put single releases inside a step.body.release.card into an array
                // as multiple cards already are. This makes further processing cleaner:
                if (!Array.isArray(jsonRelease.card)) {
                    var tempCard = this.jsonData.usm.backbone.activity[indexActivity].body.step[indexStep].body.release[indexRelease].card
                    this.jsonData.usm.backbone.activity[indexActivity].body.step[indexStep].body.release[indexRelease].card = []
                    this.jsonData.usm.backbone.activity[indexActivity].body.step[indexStep].body.release[indexRelease].card[0] = tempCard
                }
            }, this)
        }, this)
    }, this)
}
USM.prototype.generateMetaData = function () {
    // prepare new fields:
    this.jsonData.usm.roadmap.release.forEach(function (jsonRelease, indexRelease) {
        this.jsonData.usm.roadmap.release[indexRelease].maxCards = 0
        this.jsonData.usm.roadmap.release[indexRelease].maxCardsBefore = 0
        this.jsonData.usm.roadmap.release[indexRelease].releasesBefore = 0
    }, this)
    this.jsonData.usm.backbone.activity.forEach(function (jsonActivity, indexActivity) {
        this.jsonData.usm.backbone.activity[indexActivity].numberOfCards = jsonActivity.body.step.length
        this.jsonData.usm.backbone.activity[indexActivity].numberOfCardsBefore = 0
    }, this)

    this.jsonData.usm.backbone.activity.forEach(function (jsonActivity, indexActivity) {
        // update accumulated number of steps before this activity:
        var stepsBefore = 0
        for (var n = 0; n < indexActivity; n++) {
            this.jsonData.usm.backbone.activity[indexActivity].numberOfCardsBefore += this.jsonData.usm.backbone.activity[n].numberOfCards
        }

        jsonActivity.body.step.forEach(function (jsonStep, indexStep) {
            // count occurences in step:
            var occurences = {}
            jsonStep.body.release.forEach(function (jsonRelease, indexRelease) {
                var releaseKey = jsonRelease._attributes.id

                jsonRelease.card.forEach(function (jsonCard, indexCard) {
                    if ('_attributes' in jsonRelease) {
                        if (releaseKey in occurences) {
                            occurences[releaseKey] += 1
                        } else {
                            occurences[releaseKey] = 1
                        }
                    }
                })
            })

            // update maxCards in release:
            this.jsonData.usm.roadmap.release.forEach(function (release, indexRelease) {
                if (occurences[release.id._text] > this.jsonData.usm.roadmap.release[indexRelease].maxCards) {
                    this.jsonData.usm.roadmap.release[indexRelease].maxCards = occurences[release.id._text]
                }
            }, this)
        }, this)
    }, this)

    // update accumulated number of maxCards before this release:
    this.jsonData.usm.roadmap.release.forEach(function (release, indexRelease) {
        for (var n = 0; n < indexRelease; n++) {
            this.jsonData.usm.roadmap.release[indexRelease].maxCardsBefore += this.jsonData.usm.roadmap.release[n].maxCards
            this.jsonData.usm.roadmap.release[indexRelease].releasesBefore += 1
        }
    }, this)
}
