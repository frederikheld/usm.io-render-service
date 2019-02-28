const express = require('express')
const router = express.Router()

// const multer = require('multer')
// const upload = multer({
//     dest: 'files/incoming/'
// })

const actions = require('./actions')

// router.route('/render/svg').post(actions.render.svg)
router.route('/render/html').post(actions.render.html)
// router.route('/download').get(actions.download)

router.route('/hello').get(actions.hello)

module.exports = router
