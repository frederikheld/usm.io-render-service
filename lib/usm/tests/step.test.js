'use strict'

const path = require('path')

// const logger = require('../../logger/logger')
const consoleLogBuffer = require('../../outputBuffer/consoleLogBuffer')

const chai = require('chai')
// const should = chai.should()
const expect = chai.expect

consoleLogBuffer.start()
const fs = require('fs').promises // this prints an "experimental" warning
consoleLogBuffer.end()

const Step = require('../step')

describe('step', () => {
    describe('the constructor Step()', () => {
        it('expects an object', () => {
            expect(() => { new Step({}) }).to.not.throw()
        })

        it('throws an error if passed data is not a json object', () => {
            expect(() => { new Step('This is not an object') }).to.throw(TypeError)
            expect(() => { new Step([]) }).to.throw(TypeError)
        })

        it('throws an error if no data is passed at all', () => {
            expect(() => { new Step() }).to.throw(ReferenceError)
        })
    })

    describe('Step.prototype.render()', () => {
        // context('this.jsonData is invalid', () => {

        // })

        context('this.jsonData is valid', () => {
            it('renders an empty Step container', async () => {
                return stepRenderComparator('mock-step-empty')
            })

            it('renders an Step with empty Steps container', async () => {
                return stepRenderComparator('mock-step-cards-empty')
            })
        })
    })
})

/**
 * This function takes the name of a mock data file
 * and returns an Step object prepared with the data.
 *
 * This function is asynchronous due to the async
 * file operation that loads the mock data!
 *
 * @param {string} mockFilename
 */
async function stepMockupFactory (mockFilename) {
    const rawStep = await fs.readFile(path.join(__dirname, 'mock-data', mockFilename))
    const jsonStep = JSON.parse(rawStep)
    return new Step(jsonStep)
}

/**
 * This function takes the name of a mock data file
 * and returns it's contents as a string.
 *
 * Can be used to load the expected result created
 * by Step.render() from a prepared mock file.
 *
 * @param {string} mockFilename
 */
async function getMockString (mockFilename) {
    const html = await fs.readFile(path.join(__dirname, 'mock-data', mockFilename), 'utf8')
    return html
}

/**
 * Compares the rendered result of Step.render()
 * with a prepared mock result.
 *
 * @param {string} mockName
 */
async function stepRenderComparator (mockName) {
    const step = await stepMockupFactory(mockName + '.json')
    const mockHtml = await getMockString(mockName + '.html')
    const htmlRendered = step.render()
    return htmlRendered.should.equal(mockHtml)
}
