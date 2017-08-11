(function () {
    angular
        .module("tmdbApp")
        .controller("detailsController", detailsController);

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
})();