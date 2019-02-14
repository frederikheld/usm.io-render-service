'use strict'

const logger = require('../../logger/logger')
const consoleLogBuffer = require('../../outputBuffer/consoleLogBuffer')

const chai = require('chai')
const should = chai.should()
const expect = chai.expect

consoleLogBuffer.start()
const fs = require('fs').promises // this prints an "experimental" warning
consoleLogBuffer.end()

const Card = require('../card')

describe('card', () => {

    describe('the constructor Card()', () => {

        it('expects an object', () => {
            expect(() => { new Card({}) }).to.not.throw()
        })

        it('throws an error if passed data is not a json object', () => {
            expect(() => { new Card('This is not an object') }).to.throw(TypeError)
            expect(() => { new Card([]) }).to.throw(TypeError)
        })

        it('throws an error if no data is passed at all', () => {
            expect(() => { new Card() }).to.throw(ReferenceError)
        })

    })

    describe('Card.prototype.render()', () => {

        // context('this.jsonData is invalid', () => {

        // })

        context('this.jsonData is valid', () => {

            it('renders an empty Card container', async () => {
                return CardRenderComparator('mock-card-empty')
            })

            it('renders title field, if defined', async () => {
                return CardRenderComparator('mock-card-title-only')
            })

            it('renders the description, if defined', () => {
                return CardRenderComparator('mock-card-description-only')
            })

        })

    })

})

/**
 * This function takes the name of a mock data file
 * and returns an Card object prepared with the data.
 * 
 * This function is asynchronous due to the async
 * file operation that loads the mock data!
 * 
 * @param {string} mockFilename 
 */
async function CardMockupFactory(mockFilename) {
    const rawCard = await fs.readFile(__dirname + '/mock-data/' + mockFilename)
    const jsonCard = JSON.parse(rawCard)
    return new Card(jsonCard)
}

/**
 * This function takes the name of a mock data file
 * and returns it's contents as a string.
 * 
 * Can be used to load the expected result created
 * by Card.render() from a prepared mock file.
 * 
 * @param {string} mockFilename 
 */
async function getMockString(mockFilename) {
    const html = await fs.readFile(__dirname + '/mock-data/' + mockFilename, 'utf8')
    return html
}

/**
 * Compares the rendered result of Card.render()
 * with a prepared mock result.
 * 
 * @param {string} mockName 
 */
async function CardRenderComparator(mockName) {
    const card = await CardMockupFactory(mockName + '.json')
    const mockHtml = await getMockString(mockName + '.html')
    const htmlRendered = card.render()
    return htmlRendered.should.equal(mockHtml)
}