require('dotenv').config();

const express = require('express')
const body_parser = require('body-parser')
const cors = require('cors')


const app = express()


// middleware

app.use(body_parser.json())
app.use(cors())

// code here







require('./server/routes.js')(app)
require('./server/routes_client.js')(app)

app.use(express.static(__dirname + '/client'));
console.log('st', __dirname + '/client');

app.use(function(err, req, res, next) {
    console.log('Error', err);
    res.status(400).json({
        error_message: err.message
    });
});

// using port 3000

app.listen(process.env.PORT, function() {
	console.log('Server ready on port 3000 or default');
})
