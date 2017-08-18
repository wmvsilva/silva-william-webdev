var request = require('request');


module.exports = function (app) {

    var reviewModel = require("../model/review/review.model.server");
    var movieModel = require("../model/movie/movie.model.server");


    app.post("/project-api/review", authorizedReviewBody, createReview);
    app.get("/project-api/review/:movieId", findReviewsByMovieId);
    app.get("/project-api/review/user/:userId", findReviewsByUserId);
    app.get("/project-api/review-populate/user/:userId", findReviewsByUserIdPopulated);
    app.get("/project-api/admin/review", authorizedAdmin, getAllReviews);

    app.delete("/project-api/review/:reviewId", authorizedReviewIdParamUser, deleteReview);
    app.put("/project-api/review/:reviewId", authorizedReviewIdParamUser, updateReview);

    function authorizedAdmin(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else if (req.user.role !== "admin") {
            res.send(401);
        } else {
            next();
        }
    }

    function authorizedReviewBody(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else if (req.user.role === "admin") {
            next();
        } else if (req.body._userId === req.user.id) {
            next();
        } else {
            res.send(401);
        }
    }

    function authorizedReviewIdParamUser(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else if (req.user.role === "admin") {
            next();
        } else {
            reviewModel
                .findReviewById(req.params.reviewId)
                .then(function (review) {
                    if (review._userId.toString() === req.user.id) {
                        next();
                    } else {
                        res.send(401);
                    }
                })
        }
    }


    function createReview(req, res) {
        var review = req.body;
        reviewModel
            .createReview(review)
            .then(function (review) {
                movieModel.addMovieIfMissing(review._movieId)
                    .then(function (response) {
                        res.json(review);
                    }, function (err) {
                        res.status(500).send(err);
                    });
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

    function findReviewsByUserIdPopulated(req, res) {
        var userId = req.params.userId;

        return reviewModel
            .findReviewsByUserIdPopulated(userId)
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
                movieModel.addMovieIfMissing(review._movieId);
                res.json(status);
            }, function (err) {
                res.sendStatus(404).send(err);
            });
    }
};