(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {

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

        var api = {
            "createUser": createUser,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "updateUser": updateUser,
            "deleteUser": deleteUser
        };
        return api;

        function createUser(user) {
            user._id = (new Date()).getTime() + "";
            users.push(user);
            return user;
        }

        function findUserById(userId) {
            return $http.get("http://localhost:3000/api/user/" + userId);
        }

        function findUserByUsername(username) {
            for (var u in users) {
                if (users[u].username === username) {
                    return users[u];
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for (var u in users) {
                var _user = users[u];
                if (_user.username === username && _user.password === password) {
                    return _user;
                }
            }
            return null;
        }

        function updateUser(userId, user) {
            for (var u in users) {
                if (users[u]._id === userId) {
                    users[u] = user;
                    return;
                }
            }
            return null;
        }

        function deleteUser(userId) {
            for (var u in users) {
                if (users[u]._id === userId) {
                    users.splice(u, 1);
                    return;
                }
            }
        }

    }
})();