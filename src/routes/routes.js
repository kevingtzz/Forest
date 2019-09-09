const express = require('express')
const AppControllers = require('../controllers/controllers')
const router = express.Router()

router.get('/', AppControllers.controller.get_home)
router.get('/get_nodes', AppControllers.controller.get_active_nodes)

module.exports = router