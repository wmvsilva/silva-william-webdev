var app = require('./express');
var express = app.express;

var cookieParser  = require('cookie-parser');
var session       = require('express-session');

app.use(cookieParser());
app.use(session({
    secret: 'this is the secret',
    resave: true,
    saveUninitialized: true
}));

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

require("./test/app");
require("./assignment/app")(app);
require("./project_prototype/app")(app);

port = process.env.PORT || 3000;
app.listen(port);