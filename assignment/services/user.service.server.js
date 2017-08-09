module.exports = function (app) {

    var userModel = require("../model/user/user.model.server");

    app.post("/api/user", registerUser);
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", getUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    function registerUser(req, res) {
        var user = req.body;
        userModel
            .createUser(user)
            .then(function (user) {
                res.json(user);
            });
    }

    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        if (username && password) {
            userModel
                .findUserByCredentials(username, password)
                .then(function (user) {
                    if (user === null) {
                        res.send("0");
                        return;
                    }
                    res.json(user);
                    return;
                }, function (err) {
                    res.sendStatus(404).send(err);
                    return;
                });
            return;
        } else if (username) {
            userModel
                .findUserByUsername(username)
                .then(function (user) {
                    if (user === null) {
                        res.send("0");
                        return;
                    }
                    res.json(user);
                    return;
                });
            return;
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

        userModel
            .deleteUser(userId)
            .then(function (status) {
                res.sendStatus(200);
            });
    }
};