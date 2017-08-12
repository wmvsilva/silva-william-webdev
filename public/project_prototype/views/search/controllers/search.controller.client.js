(function () {
    angular
        .module("tmdbApp")
        .controller("searchController", searchController);

    function searchController(movieService, $routeParams) {
        var model = this;

        model.searchMovieByTitle = searchMovieByTitle;

        function init() {
            model.userId = $routeParams.userId;
        }

        init();

        function searchMovieByTitle(movieTitle) {
            movieService
                .searchMovieByTitle(movieTitle)
                .then(renderMovies);
        }

        function renderMovies(movies) {
            model.movies = movies;
        }
    }
})();