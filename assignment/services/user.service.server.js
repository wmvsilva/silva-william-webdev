module.exports = function (app) {

    // http handlers
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
        user._id = (new Date()).getTime() + "";
        users.push(user);
        res.json(user);
    }

    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        if (username && password) {
            for (var u in users) {
                var _user = users[u];
                if (_user.username === username && _user.password === password) {
                    res.json(_user);
                    return;
                }
            }
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
        for (var u in users) {
            if (users[u]._id === req.params.userId) {
                response.json(users[u]);
                return;
            }
        }
        response.sendStatus(404);
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var user = req.body;

        for (var u in users) {
            if (users[u]._id === userId) {
                users[u] = user;
                res.json(user);
                return;
            }
        }
        res.sendStatus(404);
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