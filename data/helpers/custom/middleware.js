const Actions = require('../actions/actionModel')
const Projects = require('../projects/projectModel')

const validActionId = (req, res, next) => {
  const { id } = req.params
  Actions.get(id)
    .then(action => {
      action ? req.action : res.status(404).json({ message: 'That Action Does not Exist!' })
    })
      .catch(err => {
        res.status(500).json({ error: 'Sorry, try again!', err })
      })
  next()
  }



const validProjectId = (req, res, next) => {
	const { id } = req.params
	Projects.get(id)
		.then(project => {
			project ? req.project : res.status(404).json({ message: 'That Project Does not Exist!' })
		})
		.catch(err => {
			res.status(500).json({ error: 'Sorry, try again!', err })
    })
  next()
 
}


const validAction = (req, res, next) => {
	const {description, notes} = req.body
	Object.entries(req.body).length === 0 
		? res.status(404).json({ message: 'No Action Data' })
		: !description || !notes 
		? res.status(400).json({ message: 'Missing required information. Please add the description and notes! ' })
		: next()
  
}


const validProject = (req, res, next) => {
	const { name, description } = req.body
	Object.entries(req.body).length === 0 
		? res.status(404).json({ message: 'No Project Data' })
		: !name || !description 
		? res.status(400).json({ message: 'Missing required information. Please add A Name & Description!' })
		: next()
}



module.exports = {
	validActionId,
	validAction,
	validProjectId,
	validProject,
}