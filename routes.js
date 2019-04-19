module.exports = function(task){

	// ### API ###

	// Tasks

  	task.post('/task', require('./controllers/task_create'))
