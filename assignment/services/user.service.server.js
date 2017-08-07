var userModel = require("../models/user.model.server");

module.exports = function (app) {

    app.post("/api/user", registerUser);
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", getUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

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

    function registerUser(req, res) {
        var user = req.body;
        userModel
            .createUser(user)
            .then(function (user) {
               res.json(user);
            });
        // user._id = (new Date()).getTime() + "";
        // users.push(user);
        // res.json(user);
    }

    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        if (username && password) {
            userModel
                .findUserByCredentials(username, password)
                .then(function (user) {
                   res.json(user);
                   return;
                }, function (err) {
                    res.sendStatus(404).send(err);
                    return;
                });
            return;
        } else if (username) {
            for (var u in users) {
                if (users[u].username === username) {
                    res.json(users[u]);
                    return;
                }
            }
        }

        res.send("0");
    }

    function getUserById(req, response) {
        userModel
            .findUserById(req.params.userId)
            .then(function (user) {
               response.json(user);
            });
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var user = req.body;

        userModel
            .updateUser(userId, user)
            .then(function (status) {
               res.json(status);
            }, function (err) {
                res.sendStatus(404).send(err);
            });
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;

        for (var u in users) {
            if (users[u]._id === userId) {
                users.splice(u, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }
};