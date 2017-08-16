(function () {
    angular
        .module("tmdbApp")
        .service("movieService", movieService);

    function movieService($http) {

        this.searchMovieByTitle = searchMovieByTitle;
        this.searchMovieById = searchMovieById;
        this.findActorsInMovie = findActorsInMovie;
        this.findVideosForMovie = findVideosForMovie;
        this.getMoviesPlayingNow = getMoviesPlayingNow;
        this.getUpcomingMovies = getUpcomingMovies;
        this.getTopRatedMovies = getTopRatedMovies;

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

        function getMoviesPlayingNow() {
            var url = "https://api.themoviedb.org/3/movie/now_playing?api_key=9a1db3dd9659485ffb9d482a484908e0&language=en-US&page=1";
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function getUpcomingMovies() {
            var url = "https://api.themoviedb.org/3/movie/upcoming?api_key=9a1db3dd9659485ffb9d482a484908e0&language=en-US&page=1";
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function getTopRatedMovies() {
            var url = "https://api.themoviedb.org/3/movie/top_rated?api_key=9a1db3dd9659485ffb9d482a484908e0&language=en-US&page=1\n";
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();