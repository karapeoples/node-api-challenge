const express = require('express')
const router = express.Router()
const Actions = require('./ActionModel')
const mw = require('../custom/middleware')
const validActionId = mw.validActionId
const validAction = mw.validAction

router.get('/', (req, res) => {
	Actions.get()
		.then(action => {
			res.status(200).json(action)
		})
		.catch(err => {
			res.status(500).json({ error: 'Sorry, try again!', err })
		})
})

router.get('/:id', validActionId, (req, res) => {
	const { id } = req.params
	Actions.get(id).then(action => {
		res.status(200).json(action)
	})
})



router.put('/:id', validActionId, validAction, (req, res) => {
	const { id } = req.params

	Actions.update(id, req.body).then(action => {
		res.status(200).json({ success: 'Info Updated!', info: req.body })
	})
})

router.delete('/:id', validActionId, (req, res) => {
	const { id } = req.params
	Actions.get(id).then(action => {
		action
			? Actions.remove(id).then(deleted => {
					deleted ? res.status(200).json({ success: `Project ${id} was deleted!`, info:action }) : null
			  })
			: null
	})
})

module.exports = router
