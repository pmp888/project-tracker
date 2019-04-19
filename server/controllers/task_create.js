// Import db_channel
const db_channel = require('../models/task')

module.exports = function(req, res, next) {
	db_channel.create(req.body).then(function(new_task) {
		res.status(201).json(new_task)
	})
}
