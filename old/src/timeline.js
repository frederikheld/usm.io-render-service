export {
    Timeline
}

function Timeline () {}
Timeline.prototype.render = function (domElement, width, offsetY = 0) {
    var svgTimeline = domElement
        .append('g')
        .attrs({
            class: 'timeline',
            transform: 'translate(0, ' + offsetY + ')'
        })

    svgTimeline
        .append('polygon')
        .attrs({
            points: [
                [0, 0],
                [width - 20, 0],
                [width - 20, -4],
                [width, 2],
                [width - 20, 8],
                [width - 20, 4],
                [0, 4]
            ]
        })
        .styles({
            'fill': '#000'
        })

    return svgTimeline
}
