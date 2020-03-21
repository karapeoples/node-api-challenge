const express = require('express')
const router = express.Router()
const Projects = require('./projectModel')
const Actions = require('../actions/actionModel')
const mw = require('../custom/middleware')
const validProjectId = mw.validProjectId
const validProject = mw.validProject
const validAction = mw.validAction

router.get('/', (req, res) => {
	Projects.get()
		.then(project => {
			res.status(200).json(project)
		})
		.catch(err => {
			res.status(500).json({ error: 'Sorry, try again!', err })
		})
})

router.get('/:id', validProjectId, (req, res) => {
	const {id} = req.params
	Projects.get(id).then(project => {
		res.status(200).json(project)
	})
})
router.post('/', validProject, (req, res) => {
	Projects.insert(req.body)
		.then(project => {
			res.status(201).json({ success: 'A New Project has been created!', project })
		})
		.catch(err => {
			res.status(500).json({ error: 'Sorry, try again!', err })
		})
		
})
router.put('/:id', validProjectId, validProject, (req, res) => {
	const { id } = req.params

	Projects.update(id, req.body)
		.then(project => {
			res.status(200).json({ success: 'Info Updated!', info: req.body })
		})
})

router.delete('/:id', validProjectId, (req, res) => {
	const { id } = req.params
	Projects
		.get(id)
		.then(project => {
			project
				? Projects
					.remove(id)
					.then(deleted => {
						deleted
							? res.status(200).json({ success: `Project ${id} was deleted!`, info: user }) : null
						})
				: null
		})
})
router.get('/:id/actions', validProjectId, (req, res) => {
	const { id } = req.params

	Projects.getProjectActions(id)
		.then(data => {
			data ? res.status(200).json(data) : null
		})
})
router.post('/:id/actions', validProjectId, validAction, (req, res) => {
	const { description, notes } = req.body
	const project_id = req.params.id

	Projects.get(project_id)
		.then(action => {
			if (!action) {
				null
			} else {
				let newAction = {
					description,
					notes,
					project_id,
				}

				Actions.insert(newAction).then(action => {
					res.status(201).json({ success: action })
				})
			}
		})
})

module.exports = router
