// Import db_channel
const db_task = require('../models/task')

module.exports = function(req, res, next) {
	db_channel.find({}).then(function(tasks) {
		res.json(tasks)
	})
}
