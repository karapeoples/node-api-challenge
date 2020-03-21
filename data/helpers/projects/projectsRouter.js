const express = require('express')
const router = express.Router()
const Projects = require('./projectModel')
const mw = require('../custom/middleware')
const validProjectId = mw.validProjectId
const validProject = mw.validProject




module.exports = router
