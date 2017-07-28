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
            return $http.get("/api/user/" + userId);
        }

        function findUserByUsername(username) {
            var url = "/api/user?username=" + username;
            return $http.get(url);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/user?username=" + username + "&password=" + password);
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