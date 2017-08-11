module.exports = function (app) {

    var reviewModel = require("../model/review/review.model.server");

    app.post("/project-api/review", createReview);
    app.get("/project-api/review/:movieId", findReviewsByMovieId);

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
};