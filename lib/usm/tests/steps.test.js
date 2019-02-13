'use strict'

const logger = require('../../logger/logger')
const consoleLogBuffer = require('../../outputBuffer/consoleLogBuffer')

const chai = require('chai')
const should = chai.should()
const expect = chai.expect

consoleLogBuffer.start()
const fs = require('fs').promises // this prints an "experimental" warning
consoleLogBuffer.end()

const Steps = require('../steps')

describe('steps', () => {

    describe('the constructor Steps()', () => {

        it('expects an array', () => {
            expect(() => { new Steps([]) }).to.not.throw()
        })

        it('throws an error if passed data is not a list', () => {
            expect(() => { new Steps('This is not a list') }).to.throw(TypeError)
            expect(() => { new Steps({}) }).to.throw(TypeError)
        })

        it('throws an error if no data is passed at all', () => {
            expect(() => { new Steps() }).to.throw(ReferenceError)
        })

    })

    describe('Steps.prototype.render()', () => {

        // context('this.jsonData is invalid', () => {

        // })

        context('this.jsonData is valid', () => {

            it('can render an empty Steps container', async () => {
                return StepsRenderComparator('mock-steps-empty')
            })

            it('can render multiple empty Steps into the container', async () => {
                return StepsRenderComparator('mock-steps-multiple-empty')
            })

        })

    })

})

/**
 * This function takes the name of a mock data file
 * and returns an Steps object prepared with the data.
 * 
 * This function is asynchronous due to the async
 * file operation that loads the mock data!
 * 
 * @param {string} mockFilename 
 */
async function StepsMockupFactory(mockFilename) {
    const rawSteps = await fs.readFile(__dirname + '/mock-data/' + mockFilename)
    const jsonSteps = JSON.parse(rawSteps)
    return new Steps(jsonSteps)
}

/**
 * This function takes the name of a mock data file
 * and returns it's contents as a string.
 * 
 * Can be used to load the expected result created
 * by Steps.render() from a prepared mock file.
 * 
 * @param {string} mockFilename 
 */
async function getMockString(mockFilename) {
    const html = await fs.readFile(__dirname + '/mock-data/' + mockFilename, 'utf8')
    return html
}

/**
 * Compares the rendered result of Steps.render()
 * with a prepared mock result.
 * 
 * @param {string} mockName 
 */
async function StepsRenderComparator(mockName) {
    const steps = await StepsMockupFactory(mockName + '.json')
    const mockHtml = await getMockString(mockName + '.html')
    const htmlRendered = steps.render()
    return htmlRendered.should.equal(mockHtml)
}