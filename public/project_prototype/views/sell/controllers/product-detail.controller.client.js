(function () {
    angular
        .module("tmdbApp")
        .controller("productDetailController", productDetailController);

    function productDetailController($routeParams, $location, movieService, ProductService) {
        var model = this;

        this.userBuyProduct = userBuyProduct;


        function init() {
            model.userId = $routeParams.userId;
            model.productId = $routeParams.productId;

            ProductService
                .findProductById(model.productId)
                .then (function (response) {
                    model.product = response.data;
                    var movieId = model.product._movieId;
                    movieService
                        .searchMovieById(movieId)
                        .then(function (movie) {
                            model.product.movieTitle = movie.title;
                        });
                });
        }

        init();

        function userBuyProduct(userId, productId) {
            ProductService
                .userBuyProduct(userId, productId)
                .then(function (status) {
                    $location.url("/details/" + model.product._movieId + "?userId=" + model.userId);
                })
        }

    }
})();