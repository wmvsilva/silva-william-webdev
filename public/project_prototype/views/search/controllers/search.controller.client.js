(function () {
    angular
        .module("tmdbApp")
        .controller("searchController", searchController);

    function searchController(movieService, $routeParams, user) {
        var model = this;

        model.searchMovieByTitle = searchMovieByTitle;

        function init() {
            if (user) {
                model.userId = user._id;
            }
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