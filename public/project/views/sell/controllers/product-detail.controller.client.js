(function () {
    angular
        .module("tmdbApp")
        .controller("productDetailController", productDetailController);

    function productDetailController($routeParams, $location, movieService, ProductService, user, InitializeService) {
        var model = this;
        InitializeService.initialize(model, productDetailController, arguments);

        this.userBuyProduct = userBuyProduct;


        function init() {
            if (user) {
                model.userId = user._id;
            }
            model.productId = $routeParams.productId;

            ProductService
                .findProductById(model.productId)
                .then(function (response) {
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
                    $location.url("/details/" + model.product._movieId);
                })
        }

    }
})();