(function () {
    angular
        .module("tmdbApp")
        .factory("ReviewService", ReviewService);

    function ReviewService($http) {

        var api = {
            "createReview": createReview
        };
        return api;

        function createReview(review) {
            var url = "/project-api/review";
            return $http.post(url, review);
        }
    }
})();