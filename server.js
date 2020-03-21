const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const server = express()
const actionRouter=require('./data/helpers/actions/actionRouter')
const projectRouter = require('./data/helpers/projects/projectRouter')

server.use(helmet(), morgan(dev), express.json(), cors())
server.use('/api/users', actionRouter)
server.use('/api/posts', projectRouter)

server.get('/', (req, res) => {
	res.send(`<h2>Kara's API Sprint API!</h2>`)
})

module.exports = server
