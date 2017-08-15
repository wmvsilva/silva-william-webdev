(function () {
    angular
        .module("tmdbApp")
        .controller("homeController", homeController);

    function homeController(user, InitializeService, movieService) {
        var model = this;
        InitializeService.initialize(model, homeController, arguments);

        function init() {
            movieService.getMoviesPlayingNow()
                .then(function (movies) {
                    model.moviesPlayingNow = movies;
                    console.log(model.moviesPlayingNow);
                })
        }

        init();

    }
})();