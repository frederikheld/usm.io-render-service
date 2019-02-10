'use strict'

// delete this file when you're done!
// it's just to fiddle arund with stuff!

const fs = require('fs')

const loadFile = () => {

    const mockJsonUsm = fs.readFile('mock-data/mock-usm-0.json', (err, res) => {
        console.log(res)
        console.log(JSON.parse(res))
    })

}
loadFile()