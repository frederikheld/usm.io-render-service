'use strict'

module.exports = MockFsExperiment

const fs = require('fs')
const path = require('path')

function MockFsExperiment() {

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
MockFsExperiment.prototype.createDirectory = function (absolute_path) {
    mkdirp(absolute_path)
}

function mkdirp(directory) {
    if (!path.isAbsolute(directory)) {
        return
    }
    let parent = path.join(directory, "..")
    if (parent !== path.join("/") && !fs.existsSync(parent)) {
        mkdirp(parent)
    }
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory)
    }
}
// Source: https://gist.github.com/bpedro/742162#gistcomment-2821523