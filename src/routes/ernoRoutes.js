const controller = '../controllers/erno.controller.js'
const express = require('express')
const router = express.Router()

router.get('/api/huomenta', (req, res) => {
    controller.tervehdys
})
//router.get('/api/giveMeasures', controller.giveData)

module.exports = router;