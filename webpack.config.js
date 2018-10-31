const path = require('path')

module.exports = {
    target: 'web',
    entry: './src/usm.js',
    output: {
        filename: 'usmio.min.js',
        path: path.resolve(__dirname, 'dist/'),
        libraryTarget: 'umd',
        library: 'usm'
    }
}