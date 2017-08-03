(function () {
    angular
        .module("tmdbApp", [])
        .controller("searchController", searchController);

    function searchController() {
        var model = this;

        model.searchMovieByTitle = searchMovieByTitle;

        function init() {

        }
        init();

        function searchMovieByTitle(movieTitle) {
            alert(movieTitle);
        }
    }
})();