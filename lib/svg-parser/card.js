// export {
//     Card
// }
module.exports = Card

function Card (jsonCard) {
    this.jsonCard = jsonCard
}
Card.prototype.render = function (domElement, domContext, offsetX = 0, offsetY = 0) {
    var width = 100
    var height = 60

    var svgCard = domElement
        .append('g')
        .attrs({
            class: 'card',
            transform: 'translate(' + offsetX + ',' + offsetY + ')'
        })

    svgCard
        .append('rect')
        .attrs({
            x: 0,
            y: 0,
            width: width,
            height: height
        })
        .styles({
            stroke: 'black',
            fill: 'white'
        })

    // render title of card:
    var textwrap = new d3.textwrap()
    textwrap
        .bounds({
            width: 100,
            height: 60
        })
        .padding(10)

    // var svgCardText = svgCard
    //     .append('text')
    //     .text(this.jsonCard.title._text)
    //     .attrs({
    //         x: width / 2,
    //         y: height / 2
    //     })
    //     .styles({
    //         'alignment-baseline': 'middle',
    //         'text-anchor': 'middle'
    //     })
    //     .call(textwrap)

    svgCard.on('click', () => {
        domContext.detailsContainer
            .html('')

        if (svgCard.classed('active')) {
            svgCard.classed('active', false)
        } else {
            d3.selectAll('#usm .card').classed('active', false)
            svgCard.classed('active', true)

            if (this.jsonCard.description._text) {
                var descriptionLines = this.jsonCard.description._text.split('\n')
                descriptionLines.forEach(function (line, index) {
                    domContext.detailsContainer
                        .append('p')
                        .text(line)
                })
            } else {
                domContext.detailsContainer
                    .append('p')
                    .text('<no description>')
            }
        }
    })
}
