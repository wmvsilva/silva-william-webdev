(function () {
    angular
        .module("tmdbApp")
        .controller("OtherProfileController", OtherProfileController);

    function OtherProfileController($routeParams, UserService, $location, ReviewService, movieService, ProductService, user, InitializeService) {
        var model = this;
        InitializeService.initialize(model, OtherProfileController, arguments);


        model.followUser = followUser;
        model.unfollowUser = unfollowUser;
        model.isUserFollowing = isUserFollowing;

        function init() {
            model.otherUserId = $routeParams["uid"];

            UserService
                .findUserByIdPopulated(model.otherUserId)
                .then(function (response) {
                    model.otherUser = response.data;
                });

            UserService
                .followedBy(model.otherUserId)
                .then(function (response) {
                    model.followedBy = response.data;
                });

            ReviewService
                .findReviewsByUserIdPopulated(model.otherUserId)
                .then(function (response) {
                    model.reviews = response.data;
                });

            ProductService
                .findProductsByUserIdPopulated(model.otherUserId)
                .then(function (response) {
                   model.products = response.data;
                });
        }

        init();

        function followUser(userId, otherUserId) {
            UserService
                .followUser(userId, otherUserId)
                .then(function (status) {
                    UserService
                        .findUserById(userId)
                        .then(function (response) {
                            model.user = response.data;
                        });
                })
        }

        function unfollowUser(userId, otherUserId) {
            UserService
                .unfollowUser(userId, otherUserId)
                .then(function (status) {
                    UserService
                        .findUserById(userId)
                        .then(function (response) {
                            model.user = response.data;
                        });
                })
        }

        function isUserFollowing(user, otherUserId) {
            if (!user) {
                return false;
            }
            return user.following.indexOf(otherUserId) !== -1;
        }
    }
})();