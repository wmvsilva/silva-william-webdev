(function () {
    angular
        .module("tmdbApp")
        .factory("ReviewService", ReviewService);

    function ReviewService($http) {

        var api = {
            "createReview": createReview,
            findReviewsByMovieId: findReviewsByMovieId,
            findReviewsByUserId: findReviewsByUserId,
            getAllReviews: getAllReviews,
            deleteReview: deleteReview,
            updateReview: updateReview
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

        function findReviewsByUserId(userId) {
            var url = "/project-api/review/user/" + userId;
            return $http.get(url);
        }

        function deleteReview(reviewId) {
            var url = "/project-api/review/" + reviewId;
            return $http.delete(url);
        }

        function getAllReviews() {
            var url = "/project-api/admin/review";
            return $http.get(url);
        }

        function updateReview(reviewId, review) {
            var url = "/project-api/review/" + reviewId;
            return $http.put(url, review);
        }
    }
})();