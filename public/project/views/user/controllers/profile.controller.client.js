(function () {
    angular
        .module("tmdbApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService, $location, ReviewService, movieService, ProductService, user, InitializeService) {
        var model = this;
        InitializeService.initialize(model, ProfileController, arguments);

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.deleteReview = deleteReview;
        model.updateProduct = updateProduct;
        model.selectProduct = selectProduct;
        model.deleteProduct = deleteProduct;


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

                    if (user.newPassword) {
                        user.password = user.newPassword;
                        user.newPassword = null;
                        return UserService
                            .updateUserAndEncryptPassword(userId, user);
                    } else {
                        return UserService
                            .updateUser(userId, jQuery.extend(true, {}, user));
                    }
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

        function deleteReview(reviewId) {
            ReviewService
                .deleteReview(reviewId)
                .then(function (response) {
                    ReviewService
                        .findReviewsByUserIdPopulated(model.userId)
                        .then(function (response) {
                            model.reviews = response.data;
                        });
                })
        }

        function updateProduct(productId, product) {
            ProductService
                .updateProduct(productId, product)
                .then(function (response) {
                    return grabProducts();
                });
            model.selectedProductId = null;
            model.selectedProduct = null;
        }

        function selectProduct(product) {
            model.selectedProductId = product._id;
            ProductService.findProductById(product._id)
                .then(function (response) {
                    model.selectedProduct = response.data;
                })
        }


        function deleteProduct(productId) {
            ProductService
                .deleteProduct(productId)
                .then(function (status) {
                    ProductService
                        .findProductsByUserIdPopulated(model.userId)
                        .then(function (response) {
                            model.products = response.data;
                        });
                })
        }

    }
})();