const express = require('express')
const AppControllers = require('../controllers/controllers')
const router = express.Router()

router.get('/', AppControllers.controller.get_home)
router.get('/get_online_nodes', AppControllers.controller.get_online_nodes)
router.get('/get_offline_nodes', AppControllers.controller.get_offline_nodes)

module.exports = router