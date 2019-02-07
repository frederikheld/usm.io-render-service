'use strict'

const chai = require('chai')
const should = chai.should()

const sinon = require('sinon')

const consoleLogBuffer = require('../../outputBuffer/consoleLogBuffer')

const logger = require('../logger')

describe('logger', () => {

    const sandbox = sinon.createSandbox()

    describe('logger.log(string)', () => {

        context('production environment: NODE_ENV=production', () => {

            beforeEach(() => {
                sandbox.stub(process.env, 'NODE_ENV').value('production')
            })

            afterEach(() => {
                sandbox.restore()
            })

            it('writes logs to console', () => {

                // -- FIRST RUN

                consoleLogBuffer.start()

                logger.log("test")

                let caughtLog = consoleLogBuffer.end()
                caughtLog.should.equal("test")


                // -- SECOND RUN

                consoleLogBuffer.start()

                logger.log("log me baby one more time!")

                let caughtLog2 = consoleLogBuffer.end()
                caughtLog2.should.equal("log me baby one more time!")

            })


        })

        context('default setting: NODE_ENV not set ==> defaults to production environment', () => {

            beforeEach(() => {
                sandbox.stub(process.env, 'NODE_ENV').value(undefined)
            })

            afterEach(() => {
                sandbox.restore()
            })

            it('writes logs to console', () => {

                // -- FIRST RUN

                consoleLogBuffer.start()

                logger.log("test")

                let caughtLog = consoleLogBuffer.end()
                caughtLog.should.equal("test")


                // -- SECOND RUN

                consoleLogBuffer.start()

                logger.log("log me baby one more time!")

                let caughtLog2 = consoleLogBuffer.end()
                caughtLog2.should.equal("log me baby one more time!")

            })

        })

        context('test environment: NODE_ENV=testing', () => {

            beforeEach(() => {
                sandbox.stub(process.env, 'NODE_ENV').value('testing')
            })

            afterEach(() => {
                sandbox.restore()
            })

            it('doesn\'t write logs to console', () => {

                consoleLogBuffer.start()

                logger.log("This text should go to nirvana")

                let caughtLog = consoleLogBuffer.end()
                should.not.exist(caughtLog)

            })

        })

    })

})
