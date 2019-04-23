const express = require('express')
const body_parser = require('body-parser')
const cors = require('cors')

const app = express()

// middleware

app.use(body_parser.json())
app.use(cors())

// code here







require('./routes.js')(app)
require('./routes_client.js')(app)

app.use(express.static(__dirname + '/client'));

app.use(function(err, req, res, next) {
    console.log('Error', err);
    res.status(400).json({
        error_message: err.message
    });
});

// using port 3000

app.listen(process.env.PORT || 3000, function() {
	console.log('Server ready on port 3000 or default');
})
