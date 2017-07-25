(function () {

    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {
        var model = this;

        model.updateUser = updateUser;

        function init() {
            model.userId = $routeParams["uid"];
            model.user = jQuery.extend(true, {}, UserService.findUserById(model.userId));
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
    }
})();