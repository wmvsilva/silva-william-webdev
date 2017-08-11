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
            "deleteUser": deleteUser,
            followUser: followUser,
            unfollowUser: unfollowUser,
            followedBy: followedBy,
            searchUserByName: searchUserByName
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

        function followUser(userId, otherUserId) {
            var url = "/project-api/user-follow/?userId=" + userId + "&otherUserId=" + otherUserId;
            return $http.get(url);
        }

        function unfollowUser(userId, otherUserId) {
            var url = "/project-api/user-unfollow/?userId=" + userId + "&otherUserId=" + otherUserId;
            return $http.get(url);
        }

        function followedBy(userId) {
            var url = "/project-api/user-who-follows/" + userId;
            return $http.get(url);
        }


        function searchUserByName(username) {
            var url = "/project-api/search-user/?username=" + username;
            return $http.get(url);
        }

    }
})();