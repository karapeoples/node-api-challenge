const express = require('express')
const router = express.Router()
const Actions = require('./ActionModel')
const mw = require('../custom/middleware')
const validActionId = mw.validActionId
const validAction = mw.validAction

module.exports = router
