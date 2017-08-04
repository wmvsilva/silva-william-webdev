(function () {
    angular
        .module("tmdbApp", ["ngRoute"])
        .config(configuration)
        .controller("searchController", searchController)
        .controller("detailsController", detailsController)
        .service("movieService", movieService);

    function configuration($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "search.html",
                controller: "searchController",
                controllerAs: "model"
            })
            .when("/details/:id", {
                templateUrl: "details.html",
                controller: "detailsController",
                controllerAs: "model"
            });
    }

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

    function detailsController($routeParams, movieService, $sce) {
        var model = this;

        model.trustUrl = trustUrl;

        function init() {
            model.id = $routeParams.id;

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
    }

    function movieService($http) {

        this.searchMovieByTitle = searchMovieByTitle;
        this.searchMovieById = searchMovieById;
        this.findActorsInMovie = findActorsInMovie;
        this.findVideosForMovie = findVideosForMovie;

        function searchMovieByTitle(movieTitle) {
            var url = "https://api.themoviedb.org/3/search/movie?api_key=9a1db3dd9659485ffb9d482a484908e0&language=en-US&query=" + movieTitle + "&page=1";
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function searchMovieById(id) {
            var url = "https://api.themoviedb.org/3/movie/" + id + "?api_key=9a1db3dd9659485ffb9d482a484908e0";
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findActorsInMovie(movieId) {
            var url = "https://api.themoviedb.org/3/movie/" + movieId + "/casts?api_key=9a1db3dd9659485ffb9d482a484908e0";
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findVideosForMovie(movieId) {
            var url = "https://api.themoviedb.org/3/movie/" + movieId + "/videos?api_key=9a1db3dd9659485ffb9d482a484908e0";
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();