var app = require('./express');
var express = app.express;

var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');

app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET ? process.env.SESSION_SECRET : 'this is the secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

require("./test/app");
require("./assignment/app")(app);
require("./project_prototype/app")(app);
require("./project/app")(app);

port = process.env.PORT || 3000;
app.listen(port);