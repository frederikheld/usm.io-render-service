'use strict'

let logger = {}

logger.log = (string) => {

    if (process.env.NODE_ENV === 'testing') {

    } else {
        console.log(string)
    }
}

module.exports = logger