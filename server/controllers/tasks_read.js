// Import db_channel
const db_task = require('../model/task')

module.exports = function(req, res, next) {
	db_task.find({}).then(function(tasks) {
		res.json(tasks)
	})
}
