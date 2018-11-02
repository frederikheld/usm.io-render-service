const path = require('path')

module.exports = {
    // mode: 'development',
    target: 'web',
    entry: './src/usm.js',
    output: {
        filename: 'usmio.min.js',
        path: path.resolve(__dirname, 'dist/'),
        libraryTarget: 'umd',
        library: 'usm'
    }
}