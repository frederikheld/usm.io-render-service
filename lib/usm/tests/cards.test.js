'use strict'

const logger = require('../../logger/logger')
const consoleLogBuffer = require('../../outputBuffer/consoleLogBuffer')

const chai = require('chai')
const should = chai.should()
const expect = chai.expect

consoleLogBuffer.start()
const fs = require('fs').promises // this prints an "experimental" warning
consoleLogBuffer.end()

const Cards = require('../cards')

describe('cards', () => {

    describe('the constructor Cards()', () => {

        it('expects an array', () => {
            expect(() => { new Cards([]) }).to.not.throw()
        })

        it('throws an error if passed data is not a list', () => {
            expect(() => { new Cards('This is not a list') }).to.throw(TypeError)
            expect(() => { new Cards({}) }).to.throw(TypeError)
        })

        it('throws an error if no data is passed at all', () => {
            expect(() => { new Cards() }).to.throw(ReferenceError)
        })

    })

    describe('Cards.prototype.render()', () => {

        // context('this.jsonData is invalid', () => {

        // })

        context('this.jsonData is valid', () => {

            it('can render an empty Cards container', async () => {
                return CardsRenderComparator('mock-cards-empty')
            })

            it('can render multiple empty Cards into the container', async () => {
                return CardsRenderComparator('mock-cards-multiple-empty')
            })

        })

    })

})

/**
 * This function takes the name of a mock data file
 * and returns an Cards object prepared with the data.
 * 
 * This function is asynchronous due to the async
 * file operation that loads the mock data!
 * 
 * @param {string} mockFilename 
 */
async function CardsMockupFactory(mockFilename) {
    const rawCards = await fs.readFile(__dirname + '/mock-data/' + mockFilename)
    const jsonCards = JSON.parse(rawCards)
    return new Cards(jsonCards)
}

/**
 * This function takes the name of a mock data file
 * and returns it's contents as a string.
 * 
 * Can be used to load the expected result created
 * by Cards.render() from a prepared mock file.
 * 
 * @param {string} mockFilename 
 */
async function getMockString(mockFilename) {
    const html = await fs.readFile(__dirname + '/mock-data/' + mockFilename, 'utf8')
    return html
}

/**
 * Compares the rendered result of Cards.render()
 * with a prepared mock result.
 * 
 * @param {string} mockName 
 */
async function CardsRenderComparator(mockName) {
    const cards = await CardsMockupFactory(mockName + '.json')
    const mockHtml = await getMockString(mockName + '.html')
    const htmlRendered = cards.render()
    return htmlRendered.should.equal(mockHtml)
}