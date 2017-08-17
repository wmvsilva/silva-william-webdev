(function () {
    angular
        .module("tmdbApp")
        .controller("sellController", sellController);

    function sellController($routeParams, $location, movieService, ProductService, user, InitializeService) {
        var model = this;
        InitializeService.initialize(model, sellController, arguments);

        this.searchMovieByTitle = searchMovieByTitle;
        this.createProduct = createProduct;
        this.deleteProduct = deleteProduct;

        function init() {
            model.movieId = $routeParams.movieId;
            grabProducts();

            model.movieTitleParam = $routeParams.movieTitle;
            if (model.movieTitleParam) {
                model.movieTitle = model.movieTitleParam;
                searchMovieByTitle(model.movieTitleParam);
            }
        }

        init();

        function grabProducts() {
            ProductService
                .findProductsByUserIdPopulated(model.userId)
                .then(function (response) {
                    model.products = response.data;
                });
        }

        function searchMovieByTitle(movieTitle) {
            movieService
                .searchMovieByTitle(movieTitle)
                .then(function (movies) {
                    model.movies = movies;
                });
            $location.url("/sell/search?movieTitle=" + movieTitle);
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
            ProductService
                .deleteProduct(productId)
                .then(function (status) {
                    grabProducts();
                })
        }
    }
})();