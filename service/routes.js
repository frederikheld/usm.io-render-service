const express = require('express')
const router = express.Router()

// const multer = require('multer')
// const upload = multer({
//     dest: 'files/incoming/'
// })

const actions = require('./actions')

router.route('/render/svg').post(actions.render.svg)

module.exports = router