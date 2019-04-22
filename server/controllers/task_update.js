// Import message
const task = require('../model/task')

module.exports = function(req, res, next) {
	task.findByIdAndUpdate(req.params.id,
		req.body,
		{
			task_name:{
        type: String,
      },
      time_start:{
        type: Date,
      },
      time_end:{
        type: Date,
      },
      task_status:{
        type: Boolean,
      }
		}).then(function(updated_task) {
		res.status(200).json(updated_task)
	})
}
