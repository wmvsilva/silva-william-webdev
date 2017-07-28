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
            UserService.findUserById(model.userId)
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
            var foundUser = UserService.findUserByUsername(user.username);
            if (foundUser && foundUser._id !== user._id) {
                model.error = "User with that username already exists";
                return;
            }
            UserService.updateUser(userId, jQuery.extend(true, {}, user));
            model.updateMessage = "User was updated";
        }

        function deleteUser(userId) {
            UserService.deleteUser(userId);
            $location.url("login");
        }
    }
})();