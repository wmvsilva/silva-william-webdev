(function () {
    angular
        .module("tmdbApp")
        .factory("ReviewService", ReviewService);

    function ReviewService($http) {

        var api = {
            "createReview": createReview,
            findReviewsByMovieId: findReviewsByMovieId
        };
        return api;

        function createReview(review) {
            var url = "/project-api/review";
            return $http.post(url, review);
        }

        function findReviewsByMovieId(movieId) {
            var url = "/project-api/review/" + movieId;
            return $http.get(url);
        }
    }
})();