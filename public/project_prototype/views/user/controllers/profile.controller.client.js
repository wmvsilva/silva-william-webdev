(function () {
    angular
        .module("tmdbApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService, $location, ReviewService, movieService, ProductService, user) {
        var model = this;

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        function init() {
            model.userId = user._id;
            UserService
                .findUserById(model.userId)
                .then(function (response) {
                    model.user = response.data;
                    model.user.likedMoviesFull = [];
                    for (var i = 0; i < model.user.likedMovies.length; i++) {
                        (function () {
                            var movieId = model.user.likedMovies[i];
                            movieService
                                .searchMovieById(movieId)
                                .then(function (movie) {
                                    model.user.likedMoviesFull.push(movie);
                                });
                        })();
                    }
                });

            UserService
                .followedBy(model.userId)
                .then(function (response) {
                    model.followedBy = response.data;
                });

            ReviewService
                .findReviewsByUserId(model.userId)
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
                .findProductsByUserId(model.userId)
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