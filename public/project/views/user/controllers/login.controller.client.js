(function () {

    angular
        .module("tmdbApp")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService, user, InitializeService, $routeParams) {
        var model = this;
        InitializeService.initialize(model, LoginController, arguments);

        model.login = login;

        function init() {
            if ($routeParams.ref) {
                model.errorMessage = "Please login to perform action you requested";
            }
        }

        init();

        function login(user) {
            if (!user) {
                model.errorMessage = "Please enter all fields";
                return;
            }
            UserService
                .login(user.username, user.password)
                .then(function (response) {
                    user = response.data;
                    if (user === "0") {
                        model.errorMessage = "User not found";
                    } else {
                        $location.url("/user");
                    }
                });
        }
    }
})();