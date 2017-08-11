module.exports = function (app) {

    var reviewModel = require("../model/review/review.model.server");

    app.post("/project-api/review", createReview);

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
};