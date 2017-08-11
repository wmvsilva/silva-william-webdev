(function () {
    angular
        .module("tmdbApp")
        .factory("UserService", UserService);

    function UserService($http) {

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
            var url = "/project-api/user";
            return $http.post(url, user);
        }

        function findUserById(userId) {
            var url = "/project-api/user/" + userId;
            return $http.get(url);
        }

        function findUserByUsername(username) {
            var url = "/project-api/user?username=" + username;
            return $http.get(url);
        }

        function findUserByCredentials(username, password) {
            var url = "/project-api/user?username=" + username + "&password=" + password;
            return $http.get(url);
        }

        function updateUser(userId, user) {
            var url = "/project-api/user/" + userId;
            return $http.put(url, user);
        }

        function deleteUser(userId) {
            var url = "/project-api/user/" + userId;
            return $http.delete(url);
        }

    }
})();