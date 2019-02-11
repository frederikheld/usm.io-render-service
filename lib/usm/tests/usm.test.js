'use strict'

const logger = require('../../logger/logger')
const consoleLogBuffer = require('../../outputBuffer/consoleLogBuffer')

const chai = require('chai')
const should = chai.should()
const expect = chai.expect

consoleLogBuffer.start()
const fs = require('fs').promises // this prints an "experimental" warning
consoleLogBuffer.end()

const Usm = require('../usm')

describe('usm', () => {

    describe('the constructor USM()', () => {

        it('expects a JSON object', () => {
            expect(() => { new Usm({}) }).to.not.throw()
        })

        it('throws an error if passed data is not an object', () => {
            expect(() => { new Usm('This is not an object') }).to.throw(ReferenceError)
        })

        it('throws an error if no data is passed at all', () => {
            expect(() => { new Usm() }).to.throw(ReferenceError)
        })

    })

    describe('Usm.prototype.render()', () => {

        // context('this.jsonData is invalid', () => {

        // })

        context('this.jsonData is valid', () => {

            it('renders an empty USM container', async () => {
                return USMRenderComparator('00_mock-usm-empty')
            })

            it('renders an USM with empty activities container', async () => {
                return USMRenderComparator('01_mock-usm-activities-empty')
            })

        })

    })

})

/**
 * This function takes the name of a mock data file
 * and returns an USM object prepared with the data.
 * 
 * This function is asynchronous due to the async
 * file operation that loads the mock data!
 * 
 * @param {string} mockFilename 
 */
async function USMMockupFactory(mockFilename) {
    const rawUsm = await fs.readFile(__dirname + '/mock-data/' + mockFilename)
    const jsonUsm = JSON.parse(rawUsm)
    return new Usm(jsonUsm)
}

/**
 * This function takes the name of a mock data file
 * and returns it's contents as a string.
 * 
 * Can be used to load the expected result created
 * by Usm.render() from a prepared mock file.
 * 
 * @param {string} mockFilename 
 */
async function getMockString(mockFilename) {
    const html = await fs.readFile(__dirname + '/mock-data/' + mockFilename, 'utf8')
    return html
}

/**
 * Compares the rendered result of Usm.render()
 * with a prepared mock result.
 * 
 * @param {string} mockName 
 */
async function USMRenderComparator(mockName) {
    const usm = await USMMockupFactory(mockName + '.json')
    const mockHtml = await getMockString(mockName + '.html')
    const htmlRendered = usm.render()
    return htmlRendered.should.equal(mockHtml)
}