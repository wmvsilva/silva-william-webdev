(function() {

    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $routeParams, UserService) {
        var model = this;
        var userId = $routeParams["uid"];

        model.updateUser = updateUser;

        function init() {
            model.user = jQuery.extend(true, {}, UserService.findUserById(userId));
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