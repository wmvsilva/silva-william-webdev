(function () {
    angular
        .module("tmdbApp")
        .controller("sellController", sellController);

    function sellController($routeParams, $location, movieService, ProductService, user) {
        var model = this;

        this.searchMovieByTitle = searchMovieByTitle;
        this.createProduct = createProduct;
        this.deleteProduct = deleteProduct;

        function init() {
            if (user) {
                model.userId = user._id;
            }
            model.movieId = $routeParams.movieId;
            grabProducts();
        }

        init();

        function grabProducts() {
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
        }

        function searchMovieByTitle(movieTitle) {
            movieService
                .searchMovieByTitle(movieTitle)
                .then(function (movies) {
                    model.movies = movies;
                });
        }

        function createProduct(userId, movieId, product) {
            product._userId = userId;
            product._movieId = movieId;
            ProductService
                .createProduct(product)
                .then(function (product) {
                    $location.url("/sell");
                })
        }

        function deleteProduct(productId) {
            console.log(productId);
            ProductService
                .deleteProduct(productId)
                .then(function (status) {
                    grabProducts();
                })
        }
    }
})();