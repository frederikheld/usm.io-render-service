'use strict'

const crypto = require('crypto')

let tokenizer = {}

tokenizer.generateDownloadToken = (length) => {

    let characterSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

    return crypto
        .randomBytes(length)
        .toString('base64')     // convert to base64 format
        .slice(0, length)       // return required number of characters
        .replace(/\+/g, '0')    // replace '+' with '0'
        .replace(/\//g, '0')    // replace '/' with '0'

}

module.exports = tokenizer