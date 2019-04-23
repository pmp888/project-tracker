const path = require('path');

module.exports = function (app) {

    //Auth
    app.get('/', function(req, res, next) {
        res.sendFile(path.join(__dirname, '../client/index.html'));
    });
}