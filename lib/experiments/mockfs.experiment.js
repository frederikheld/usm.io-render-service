'use strict'

module.exports = MockFsExperiment

const fs = require('fs')
const fx = require('mkdir-recursive')
const path = require('path')

function MockFsExperiment () {

}

/**
 * Creates the given directory.
 * Directory can be created recursively.
 *
 * NOTE: *path* has to be absolute!
 *
 * To create a relative path, use
 *
 *      const path = __dirname + '/relative/path'
 *
 */
MockFsExperiment.prototype.createDirectory = function (absolutePath) {
    fx.mkdirSync(absolutePath)
}
