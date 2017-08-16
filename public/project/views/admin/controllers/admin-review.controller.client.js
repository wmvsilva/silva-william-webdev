(function () {
    angular
        .module("tmdbApp")
        .controller("adminReviewController", adminReviewController);

    function adminReviewController($routeParams, $location, movieService, $sce, UserService, ReviewService, ProductService, user, InitializeService) {
        var model = this;
        InitializeService.initialize(model, adminReviewController, arguments);

        this.createReview = createReview;
        this.selectReview = selectReview;
        this.deleteReview = deleteReview;
        this.updateReview = updateReview;

        function init() {
            ReviewService
                .getAllReviews()
                .then(function (response) {
                    model.reviews = response.data;
                });
        }

        init();

        function createReview(review) {
            ReviewService
                .createReview(review)
                .then(function (response) {
                    ReviewService
                        .getAllReviews()
                        .then(function (response) {
                            model.reviews = response.data;
                        });
                })
        }

        function selectReview(review) {
            model.selectedReviewId = review._id;
            model.selectedReview = angular.copy(review);
        }

        function deleteReview(reviewId) {
            ReviewService
                .deleteReview(reviewId)
                .then(function (response) {
                    ReviewService
                        .getAllReviews()
                        .then(function (response) {
                            model.reviews = response.data;
                        });
                })
        }

        function updateReview(reviewId, review) {
            ReviewService
                .updateReview(reviewId, review)
                .then(function (response) {
                    ReviewService
                        .getAllReviews()
                        .then(function (response) {
                            model.reviews = response.data;
                        });
                });
            model.selectedReviewId = null;
            model.selectedReview = null;
        }

    }
})();