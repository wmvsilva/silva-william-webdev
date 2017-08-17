(function () {
    angular
        .module("tmdbApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $location, InitializeService, user) {
        var model = this;
        InitializeService.initialize(model, RegisterController, arguments);

        model.registerUser = registerUser;

        function init() {
        }

        init();

        function registerUser(user) {
            if (!user || !user.username || !user.password || !user.password2 || !user.email) {
                model.error = "Please enter in all the fields";
                return;
            }
            if (user.password !== user.password2) {
                model.error = "Passwords do not match";
                return;
            }
            UserService
                .findUserByUsername(user.username)
                .then(function (response) {
                    var _user = response.data;
                    if (_user === "0") {
                        return UserService.register(user);
                    } else {
                        return Promise.reject({});
                    }
                })
                .then(function (response) {
                    var newUser = response.data;
                    $location.url("/user");
                })
                .catch(function () {
                    model.error = "User already exists";
                })
        }
    }
})();