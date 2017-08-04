(function () {
    angular
        .module("tmdbApp", [])
        .controller("searchController", searchController)
        .service("movieService", movieService);

    function searchController(movieService) {
        var model = this;

        model.searchMovieByTitle = searchMovieByTitle;

        function init() {

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

    function movieService($http) {
        this.searchMovieByTitle = searchMovieByTitle;

        function searchMovieByTitle(movieTitle) {
            var url = "https://api.themoviedb.org/3/search/movie?api_key=9a1db3dd9659485ffb9d482a484908e0&language=en-US&query="+movieTitle+"&page=1";
            return $http.get(url)
                .then(function (response) {
                   return response.data;
                });
        }
    }
})();