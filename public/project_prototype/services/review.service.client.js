(function () {
    angular
        .module("tmdbApp")
        .factory("ReviewService", ReviewService);

    function ReviewService($http) {

        var api = {
            "createReview": createReview,
            findReviewsByMovieId: findReviewsByMovieId,
            findReviewsByUserId: findReviewsByUserId
        };
        return api;

        function createReview(review) {
            var url = "/project-prototype-api/review";
            return $http.post(url, review);
        }

        function findReviewsByMovieId(movieId) {
            var url = "/project-prototype-api/review/" + movieId;
            return $http.get(url);
        }

        function findReviewsByUserId(userId) {
            var url = "/project-prototype-api/review/user/" + userId;
            return $http.get(url);
        }
    }
})();