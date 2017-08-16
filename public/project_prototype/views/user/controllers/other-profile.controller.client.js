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
                .findUserById(model.userId)
                .then(function (response) {
                    model.user = response.data;
                });

            UserService
                .findUserById(model.otherUserId)
                .then(function (response) {
                    model.otherUser = response.data;
                    model.otherUser.likedMoviesFull = [];
                    for (var i = 0; i < model.otherUser.likedMovies.length; i++) {
                        (function () {
                            var movieId = model.otherUser.likedMovies[i];
                            movieService
                                .searchMovieById(movieId)
                                .then(function (movie) {
                                    model.otherUser.likedMoviesFull.push(movie);
                                });
                        })();
                    }
                });

            UserService
                .followedBy(model.otherUserId)
                .then(function (response) {
                    model.followedBy = response.data;
                });

            ReviewService
                .findReviewsByUserId(model.otherUserId)
                .then(function (response) {
                    model.reviews = response.data;
                    for (var i = 0; i < model.reviews.length; i++) {
                        (function () {
                            var movieId = model.reviews[i]._movieId;
                            var review = model.reviews[i];
                            movieService
                                .searchMovieById(movieId)
                                .then(function (movie) {
                                    review.movieTitle = movie.title;
                                });
                        })();
                    }
                });

            ProductService
                .findProductsByUserId(model.otherUserId)
                .then(function (response) {
                   model.products = response.data;
                    for (var i = 0; i < model.products.length; i++) {
                        (function () {
                            var movieId = model.products[i]._movieId;
                            var product = model.products[i];
                            movieService
                                .searchMovieById(movieId)
                                .then(function (movie) {
                                    product.movieTitle = movie.title;
                                });
                        })();
                    }
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