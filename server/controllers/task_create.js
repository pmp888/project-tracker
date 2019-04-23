// Import db_channel
const db_task = require('../model/task')

module.exports = function(req, res, next) {
	console.log(req.body);

	db_task.create(req.body).then(function(new_task) {
		res.status(201).json(new_task)
	})
	.catch (function(err) {
		console.log ('error', err)
		res.status(400).json(err.message)
	})
}
