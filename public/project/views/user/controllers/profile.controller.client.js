(function () {
    angular
        .module("tmdbApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService, $location, ReviewService, movieService, ProductService, user, InitializeService) {
        var model = this;
        InitializeService.initialize(model, ProfileController, arguments);

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        function init() {
            UserService
                .findUserByIdPopulated(model.userId)
                .then(function (response) {
                    model.user = response.data;
                });

            UserService
                .followedBy(model.userId)
                .then(function (response) {
                    model.followedBy = response.data;
                });

            ReviewService
                .findReviewsByUserIdPopulated(model.userId)
                .then(function (response) {
                    model.reviews = response.data;
                });

            ProductService
                .findProductsByUserIdPopulated(model.userId)
                .then(function (response) {
                   model.products = response.data;
                });

            ProductService
                .findProductsByBuyer(model.userId)
                .then(function (response) {
                   model.productsPurchased = response.data;
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