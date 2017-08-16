(function () {
    angular
        .module("tmdbApp")
        .controller("homeController", homeController);

    function homeController(user, InitializeService, movieService, newsService) {
        var model = this;
        InitializeService.initialize(model, homeController, arguments);

        function init() {
            movieService.getMoviesPlayingNow()
                .then(function (movies) {
                    model.moviesPlayingNow = movies;
                });
            movieService.getTopRatedMovies()
                .then(function (movies) {
                    model.topRatedMovies = movies;
                });
            newsService.getEntertainmentWeeklyArticles()
                .then(function (result) {
                    model.articles = result.articles;
                });
        }

        init();

    }
})();