const express = require('express')
const AppControllers = require('../controllers/controllers')
const api = express.Router()

api.get('/', AppControllers.get_home)

module.exports = api