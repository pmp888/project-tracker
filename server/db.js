const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/test_mongo', {useNewUrlParser: true}, function() {
	console.log('Connected to MongoDB project tracker');
})

module.exports = mongoose;
