(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $location) {
        var model = this;

        model.registerUser = registerUser;

        function init() {
        }

        init();

        function registerUser(user) {
            if (!user || !user.username || !user.password || !user.password2) {
                model.error = "Please enter in all the fields";
                return;
            }
            if (user.password !== user.password2) {
                model.error = "Passwords do not match";
                return;
            }
            var promise = UserService.findUserByUsername(user.username);
            promise
                .then(function(response) {
                    var _user = response.data;
                    if (_user === "0") {
                        var newUser = UserService.createUser(user);
                        $location.url("/user/" + newUser._id);
                    } else {
                        model.error = "User already exists";
                    }
                });
        }
    }
})();