const express = require('express')
const AppControllers = require('../controllers/controllers')
const router = express.Router()

router.get('/', AppControllers.get_home)

module.exports = router