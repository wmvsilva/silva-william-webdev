(function () {
    angular
        .module("tmdbApp")
        .controller("searchController", searchController);

    function searchController(movieService, $routeParams, user, InitializeService, $location) {
        var model = this;
        InitializeService.initialize(model, searchController, arguments);

        model.searchMovieByTitle = searchMovieByTitle;

        function init() {
            model.movieTitleParam = $routeParams.movieTitle;
            if (model.movieTitleParam) {
                model.movieTitle = model.movieTitleParam;
                searchMovieByTitle(model.movieTitleParam);
            }
        }

        init();

        function searchMovieByTitle(movieTitle) {
            movieService
                .searchMovieByTitle(movieTitle)
                .then(renderMovies);
            $location.url("/search?movieTitle=" + movieTitle);
        }

        function renderMovies(movies) {
            model.movies = movies;
        }
    }
})();