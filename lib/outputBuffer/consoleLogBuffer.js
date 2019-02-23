'use strict'

/**
 * This object can be used to delay or suppress
 * output via console.log.
 *
 * To start buffering, use
 *
 * consoleLogBuffer.start()
 *
 * This will replace the console.log by a dummy
 * that stores all values passed to console.log.
 *
 * To end buffering, use
 *
 * let caughtOutput = consoleLogBuffer.end()
 *
 * This will restore the original console.log
 * and return all stored values.
 *
 * You can use this outputBuffer for testing
 * of functions that should or should not
 * print on console.
 */

let consoleLogBuffer = {

    caughtLog: '',
    wasCalled: false,
    // needed to distinguish
    //      caughtLog = '' (empty string)
    // from
    //      caughtLog = '' (undefined)
    // since apparently undefined
    // can't be used directly.
    originalConsoleLog: undefined,

    // replaces console.log by a dummy
    // that catches all output:
    start: () => {
        this.caughtLog = ''
        this.wasCalled = false

        this.originalConsoleLog = console.log

        console.log = (string) => {
            this.wasCalled = true
            this.caughtLog += string
        }
    },

    // restores the original console.log
    // and returns all output to it:
    end: () => {
        console.log = this.originalConsoleLog

        if (this.wasCalled === true) {
            return this.caughtLog
        }
        return undefined
    }

}

module.exports = consoleLogBuffer
