'use strict'

const chai = require('chai')
const should = chai.should()

const sinon = require('sinon')

const consoleLogBuffer = require('../../outputBuffer/consoleLogBuffer')

const logger = require('../logger')

describe('logger', () => {
    const sandbox = sinon.createSandbox()

    describe('logger.info(string)', () => {
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

                logger.info('test')

                let caughtLog = consoleLogBuffer.end()
                caughtLog.should.equal('test')

                // -- SECOND RUN

                consoleLogBuffer.start()

                logger.info('log me baby one more time!')

                let caughtLog2 = consoleLogBuffer.end()
                caughtLog2.should.equal('log me baby one more time!')
            })
        })

        context('defaults to NODE_ENV=production if NODE_ENV not set', () => {
            beforeEach(() => {
                sandbox.stub(process.env, 'NODE_ENV').value(undefined)
            })

            afterEach(() => {
                sandbox.restore()
            })

            it('writes logs to console', () => {
                // -- FIRST RUN

                consoleLogBuffer.start()

                logger.info('test')

                let caughtLog = consoleLogBuffer.end()
                caughtLog.should.equal('test')

                // -- SECOND RUN

                consoleLogBuffer.start()

                logger.info('log me baby one more time!')

                let caughtLog2 = consoleLogBuffer.end()
                caughtLog2.should.equal('log me baby one more time!')
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

                logger.info('This text should go to nirvana')

                let caughtLog = consoleLogBuffer.end()
                should.not.exist(caughtLog)
            })
        })
    })

    describe('logger.debug(string)', () => {
        context('testing environment: NODE_ENV=testing', () => {
            beforeEach(() => {
                sandbox.stub(process.env, 'NODE_ENV').value('testing')
            })

            afterEach(() => {
                sandbox.restore()
            })

            it('writes logs to console', () => {
                // -- FIRST RUN

                consoleLogBuffer.start()

                logger.debug('test')

                let caughtLog = consoleLogBuffer.end()
                caughtLog.should.equal('test')

                // -- SECOND RUN

                consoleLogBuffer.start()

                logger.debug('log me baby one more time!')

                let caughtLog2 = consoleLogBuffer.end()
                caughtLog2.should.equal('log me baby one more time!')
            })
        })

        context('test environment: NODE_ENV=production', () => {
            beforeEach(() => {
                sandbox.stub(process.env, 'NODE_ENV').value('production')
            })

            afterEach(() => {
                sandbox.restore()
            })

            it('doesn\'t write logs to console', () => {
                consoleLogBuffer.start()

                logger.debug('This text should go to nirvana')

                let caughtLog = consoleLogBuffer.end()
                should.not.exist(caughtLog)
            })
        })

        context('defaults to NODE_ENV=production if NODE_ENV not set', () => {
            beforeEach(() => {
                sandbox.stub(process.env, 'NODE_ENV').value(undefined)
            })

            afterEach(() => {
                sandbox.restore()
            })

            it('doesn\'t write logs to console', () => {
                consoleLogBuffer.start()

                logger.debug('test')

                let caughtLog = consoleLogBuffer.end()
                should.not.exist(caughtLog)
            })
        })
    })
})
