var app = require("../express");

var users = [
    {
        _id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder",
        "email": "alice@wonder.com"
    },
    {
        _id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley",
        "email": "bob@marley.com"
    },
    {
        _id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia",
        "email": "charly@garcia.com"
    },
    {
        _id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi",
        "email": "jose@annunzi.com"
    }
];

// http handlers
app.get("/api/users", getAllUsers);
app.get("/api/user/:userId", getUserById);
app.get("/api/user", findUserByCredentials);

function getAllUsers(req, response) {
    response.send(users);
}

function getUserById(req, response) {
    for (var u in users) {
        if (users[u]._id === req.params.userId) {
            response.send(users[u]);
        }
    }
}

function findUserByCredentials(req, res) {
    var username = req.query.username;
    var password = req.query.password;

    for (var u in users) {
        var _user = users[u];
        if (_user.username === username && _user.password === password) {
            res.send(_user);
        }
    }
    res.send("0");
}