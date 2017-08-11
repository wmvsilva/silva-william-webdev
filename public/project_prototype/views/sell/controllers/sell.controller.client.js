(function () {
    angular
        .module("tmdbApp")
        .controller("sellController", sellController);

    function sellController($routeParams, movieService) {
        var model = this;

        this.searchMovieByTitle = searchMovieByTitle;

        function init() {
            model.userId = $routeParams.userId;
            model.movieId = $routeParams.movieId;
        }

        init();

        function searchMovieByTitle(movieTitle) {
            movieService
                .searchMovieByTitle(movieTitle)
                .then(function (movies) {
                    model.movies = movies;
                });
        }
    }
})();