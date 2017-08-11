(function () {
    angular
        .module("tmdbApp")
        .controller("detailsController", detailsController);

    function detailsController($routeParams, movieService, $sce, UserService, ReviewService) {
        var model = this;

        model.trustUrl = trustUrl;
        model.likeMovie = likeMovie;
        model.unlikeMovie = unlikeMovie;
        model.doesUserLikeMovie = doesUserLikeMovie;
        model.createReview = createReview;

        function init() {
            model.id = $routeParams.id;
            model.userId = $routeParams.userId;

            UserService
                .findUserById(model.userId)
                .then(function (response) {
                    model.user = response.data;
                });

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
        }

        init();

        function renderMovie(movie) {
            model.movie = movie;
        }

        function renderActors(actors) {
            model.actors = actors;
        }

        function renderVideos(videos) {
            model.videos = videos;
            model.videoUrl = trustUrl("https://www.youtube.com/embed/" + model.videos.results[0].key);
        }

        function trustUrl(url) {
            return $sce.trustAsResourceUrl(url);
        }

        function likeMovie(userId, movieId) {
            var user = model.user;
            user.likedMovies.push(movieId);
            UserService.updateUser(userId, user)
                .then(function (response) {
                    model.user = response.data;
                });
        }

        function unlikeMovie(userId, movieId) {
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
    }
})();