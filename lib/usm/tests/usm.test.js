'use strict'

const path = require('path')

const chai = require('chai')
// const should = chai.should()
const expect = chai.expect

const fs = require('fs').promises

const Usm = require('../usm')

describe('usm', () => {
    describe('the constructor USM()', () => {
        it('expects a JSON object', () => {
            expect(() => {
                new Usm({})
            }).to.not.throw()
        })

        it('throws an error if passed data is not a json object', () => {
            expect(() => {
                new Usm('This is not an object')
            }).to.throw(TypeError)
            expect(() => {
                new Usm([])
            }).to.throw(TypeError)
        })

        it('throws an error if no data is passed at all', () => {
            expect(() => {
                new Usm()
            }).to.throw(ReferenceError)
        })
    })

    describe('Usm.prototype.render()', () => {
        // context('this.jsonData is invalid', () => {

        // })

        context('this.jsonData is valid', () => {
            context('with standard settings for rendering', () => {
                it('renders an empty Usm container', async () => {
                    return uSMRenderComparator(
                        'mock-usm-standard-header',
                        'mock-usm-empty',
                        'mock-usm-standard-footer',
                        true
                    )
                })

                it('renders an USM with empty Activities container', async () => {
                    return uSMRenderComparator(
                        'mock-usm-standard-header',
                        'mock-usm-activities-empty',
                        'mock-usm-standard-footer',
                        true
                    )
                })
            })
        })

        describe('configuration', () => {
            describe('by configuration object', () => {
                it('allows to include a custom css file')
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
async function uSMMockupFactory (mockFilename) {
    const rawUsm = await fs.readFile(path.join(__dirname, 'mock-data', mockFilename))
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
async function getMockString (mockFilename) {
    const html = await fs.readFile(path.join(__dirname, 'mock-data', mockFilename), 'utf8')
    return html
}

/**
 * Compares the rendered result of Usm.render()
 * with a prepared mock result.
 *
 * @param {string} mockHeaderName
 * @param {string} mockName
 * @param {string} mockFooterName
 */
async function uSMRenderComparator (mockHeaderName, mockName, mockFooterName, ignoreWhitespaces = false) {
    const usm = await uSMMockupFactory(mockName + '.json')

    let mockHtml = await getMockString(mockHeaderName + '.html')
    mockHtml += await getMockString(mockName + '.html')
    mockHtml += await getMockString(mockFooterName + '.html')

    let htmlRendered = usm.render()

    if (ignoreWhitespaces) {
        // puts all text in one line
        // (+) really only compares the rendered part
        // (-) difficult to debug
        const regex = new RegExp(/\r*\s*(.*)\r*$/gm)

        // only removes trailing and leading blanks and empty lines (blank lines and indentation)
        // (+) better to debug because you see which line doesn't match
        // (-) less tolerant in matching (shouldn't be a problem since only line breaks and indentation are an issue)
        // const regex = new RegExp(/^\s*(.*) *$/gm) // doesn't really work though :-P But you geht the idea ;-)

        mockHtml = mockHtml.replace(regex, '$1')

        htmlRendered = htmlRendered.replace(regex, '$1')
    }

    return htmlRendered.should.equal(mockHtml)
}
