(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService, $location) {
        var model = this;

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        function init() {
            model.userId = $routeParams["uid"];
            UserService
                .findUserById(model.userId)
                .then(function (response) {
                    model.user = response.data;
                });
        }

        init();

        function updateUser(userId, user) {
            model.error = null;
            model.updateMessage = null;
            if (!user.username) {
                model.error = "Please enter a username";
                return;
            }
            UserService
                .findUserByUsername(user.username)
                .then(function (response) {
                    var foundUser = response.data;
                    if (foundUser !== "0" && foundUser._id !== user._id) {
                        return Promise.reject({});
                    }
                    return UserService.updateUser(userId, jQuery.extend(true, {}, user));
                })
                .then(function () {
                    model.updateMessage = "User was updated";
                })
                .catch(function () {
                    model.error = "User with that username already exists";
                });
        }

        function deleteUser(userId) {
            UserService
                .deleteUser(userId)
                .then(function () {
                    $location.url("login");
                });
        }
    }
})();