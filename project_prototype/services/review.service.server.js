module.exports = function (app) {

    var reviewModel = require("../model/review/review.model.server");

    app.post("/project-prototype-api/review", createReview);
    app.get("/project-prototype-api/review/:movieId", findReviewsByMovieId);
    app.get("/project-prototype-api/review/user/:userId", findReviewsByUserId);


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
};