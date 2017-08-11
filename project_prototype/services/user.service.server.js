module.exports = function (app) {

    var userModel = require("../model/user/user.model.server");

    app.post("/project-api/user", registerUser);
    app.get("/project-api/user", findUser);
    app.get("/project-api/user/:userId", getUserById);
    app.put("/project-api/user/:userId", updateUser);
    app.delete("/project-api/user/:userId", deleteUser);

    app.get("/project-api/user-follow/", followUser);
    app.get("/project-api/user-unfollow/", unfollowUser);
    app.get("/project-api/user-who-follows/:userId", whoFollows)


    function registerUser(req, res) {
        var user = req.body;
        userModel
            .createUser(user)
            .then(function (user) {
                res.json(user);
            }, function (err) {
                res.status(500).send(err);
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
                }, function (err) {
                    res.status(500).send(err);
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
            }, function (err) {
                response.status(500).send(err);
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
            }, function (err) {
                res.status(500).send(err);
                return;
            });
    }

    function followUser(req, res) {
        var userId = req.query.userId;
        var otherUserId = req.query.otherUserId;

        userModel
            .followUser(userId, otherUserId)
            .then(function (status) {
                res.json(status);
            }, function (err) {
                res.status(500).send(err);
                return;
            });
    }

    function unfollowUser(req, res) {
        var userId = req.query.userId;
        var otherUserId = req.query.otherUserId;

        userModel
            .unfollowUser(userId, otherUserId)
            .then(function (status) {
                res.json(status);
            }, function (err) {
                res.status(500).send(err);
                return;
            });
    }

    function whoFollows(req, res) {
        var userId = req.params.userId;

        userModel
            .whoFollows(userId)
            .then(function (users) {
                res.json(users);
            }, function (err) {
                res.status(500).send(err);
                return;
            });
    }
};