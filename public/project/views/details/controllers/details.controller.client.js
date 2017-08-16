(function () {
    angular
        .module("tmdbApp")
        .controller("detailsController", detailsController);

    function detailsController($routeParams, $location, movieService, $sce, UserService, ReviewService, ProductService, user, InitializeService) {
        var model = this;
        InitializeService.initialize(model, detailsController, arguments);

        model.trustUrl = trustUrl;
        model.likeMovie = likeMovie;
        model.unlikeMovie = unlikeMovie;
        model.doesUserLikeMovie = doesUserLikeMovie;
        model.createReview = createReview;
        model.buyProduct = buyProduct;


        function init() {
            model.id = $routeParams.id;
            if (user) {
                model.userId = user._id;
                model.user = user;
            }

            ReviewService
                .findReviewsByMovieId(model.id)
                .then(function (response) {
                    model.reviews = response.data;
                });

            movieService
                .searchMovieById(model.id)
                .then(renderMovie);
            movieService
                .findActorsInMovie(model.id)
                .then(renderActors);
            movieService
                .findVideosForMovie(model.id)
                .then(renderVideos);

            ProductService
                .findProductsByMovieId(model.id)
                .then(function (response) {
                    model.products = response.data;
                });

        }

        init();

        function renderMovie(movie) {
            model.movie = movie;
            console.log(model.movie)
        }

        function renderActors(actors) {
            model.actors = actors;
        }

        function renderVideos(videos) {
            model.videos = videos;
            if (model.videos.results[0]) {
                model.videoUrl = trustUrl("https://www.youtube.com/embed/" + model.videos.results[0].key);
            }
        }

        function trustUrl(url) {
            return $sce.trustAsResourceUrl(url);
        }

        function likeMovie(userId, movieId) {
            if (!model.user) {
                $location.url("/login");
            }
            var user = model.user;
            user.likedMovies.push(movieId);
            UserService.updateUser(userId, user)
                .then(function (response) {
                    model.user = response.data;
                });
        }

        function unlikeMovie(userId, movieId) {
            if (!model.user) {
                $location.url("/login");
            }
            var user = model.user;
            var index = user.likedMovies.indexOf(movieId);
            user.likedMovies.splice(index, 1);


            UserService.updateUser(userId, user)
                .then(function (response) {
                    model.user = response.data;
                });
        }

        function doesUserLikeMovie() {
            if (!model.user || !model.movie) {
                return false;
            }
            return model.user.likedMovies.indexOf(model.movie.id) !== -1;
        }

        function createReview(userId, movieId, review) {
            if (!model.user) {
                $location.url("/login");
            }
            review._userId = userId;
            review._movieId = movieId;
            ReviewService.createReview(review)
                .then(function (review) {
                    ReviewService
                        .findReviewsByMovieId(model.id)
                        .then(function (response) {
                            model.reviews = response.data;
                        });
                })
        }

        function buyProduct(productId) {
            if (!model.user) {
                $location.url("/login");
            }
            console.log("Buying " +productId);
            $location.url("/product/" + productId);
        }
    }
})();