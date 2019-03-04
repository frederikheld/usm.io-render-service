'use strict'

let logger = {}

logger.info = (string) => {
    if (process.env.NODE_ENV === 'testing') {

    } else {
        console.log(string)
    }
}

logger.debug = (string) => {
    if (process.env.NODE_ENV === 'testing') {
        console.log(string)
    } else {

    }
}

module.exports = logger
