var q = require('q');

var connectionString = 'mongodb://127.0.0.1:27017/webdev'; // for local
if (process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds151062.mlab.com:51062/heroku_fjz486h2'; // user yours
}

var mongoose = require("mongoose");
mongoose.connect(connectionString);
mongoose.Promise = q.Promise;