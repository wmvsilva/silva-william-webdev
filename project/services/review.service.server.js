module.exports = function (app) {

    var reviewModel = require("../model/review/review.model.server");

    app.post("/project-api/review", createReview);
    app.get("/project-api/review/:movieId", findReviewsByMovieId);
    app.get("/project-api/review/user/:userId", findReviewsByUserId);
    app.get("/project-api/admin/review", getAllReviews);

    app.delete("/project-api/review/:reviewId", deleteReview);
    app.put("/project-api/review/:reviewId", updateReview);


    function createReview(req, res) {
        var review = req.body;
        reviewModel
            .createReview(review)
            .then(function (review) {
                res.json(review);
            }, function (err) {
                res.status(500).send(err);
            });
    }

    function findReviewsByMovieId(req, res) {
        var movieId = req.params.movieId;

        return reviewModel
            .findReviewsByMovieId(movieId)
            .populate("_userId", "_id username")
            .then(function (reviews) {
                res.json(reviews);
            }, function (err) {
                res.status(500).send(err);
            });
    }

    function findReviewsByUserId(req, res) {
        var userId = req.params.userId;

        return reviewModel
            .findReviewsByUserId(userId)
            .then(function (reviews) {
                res.json(reviews);
            }, function (err) {
                res.status(500).send(err);
            });
    }

    function getAllReviews(req, res) {
        return reviewModel
            .getAllReviews()
            .then(function (reviews) {
                res.json(reviews);
            }, function (err) {
                res.status(500).send(err);
            });
    }

    function deleteReview(req, res) {
        var reviewId = req.params.reviewId;

        return reviewModel
            .deleteReview(reviewId)
            .then(function (status) {
                res.sendStatus(200);
            }, function (err) {
                res.status(500).send(err);
                return;
            });
    }

    function updateReview(req, res) {
        var reviewId = req.params.reviewId;
        var review = req.body;

        reviewModel
            .updateReview(reviewId, review)
            .then(function (status) {
                res.json(status);
            }, function (err) {
                res.sendStatus(404).send(err);
            });
    }
};