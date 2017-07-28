(function () {

    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var model = this;

        model.login = login;

        function init() {
        }

        init();

        function login(user) {
            if (!user) {
                model.errorMessage = "User not found";
                return;
            }
            var promise = UserService.findUserByCredentials(user.username, user.password);
            promise
                .then(function (response) {
                    user = response.data;
                    if (user === null) {
                        model.errorMessage = "User not found";
                    } else {
                        $location.url("user/" + user._id);
                    }
                });
        }
    }
})();