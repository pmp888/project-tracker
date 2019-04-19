const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/ProjectTracker', {useNewUrlParser: true}, function() {
	console.log('Connected to MongoDB project tracker');
})

module.exports = mongoose;
