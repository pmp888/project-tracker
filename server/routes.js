module.exports = function(app) {

	// ### API ###

	// Tasks

  	app.post('/task', require('./controllers/task_create'))
    app.get('/task', require('./controllers/tasks_read'))
    app.patch('/task/:id', require('./controllers/task_update'))

}
