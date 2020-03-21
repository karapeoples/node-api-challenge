const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const server = express()
const actionRouter=require('./data/helpers/actions/actionRouter')
const projectRouter = require('./data/helpers/projects/projectsRouter')

server.use(helmet(), morgan('dev'), express.json())
server.use('/actions', actionRouter)
server.use('/projects', projectRouter)

server.get('/', (req, res) => {
	res.send(`<h2>Kara's API Sprint API!</h2>`)
})

module.exports = server
