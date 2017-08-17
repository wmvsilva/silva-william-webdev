var mongoose = require("mongoose");
var reviewSchema = require("./review.schema.server");

var reviewModel = mongoose.model("ProjectReviewModel", reviewSchema);

reviewModel.createReview = createReview;
reviewModel.findReviewsByMovieId = findReviewsByMovieId;
reviewModel.findReviewsByUserId = findReviewsByUserId;
reviewModel.getAllReviews = getAllReviews;
reviewModel.findReviewById = findReviewById;
reviewModel.deleteReview = deleteReview;
reviewModel.updateReview = updateReview;
reviewModel.findReviewsByUserIdPopulated = findReviewsByUserIdPopulated;

module.exports = reviewModel;

function createReview(review) {
    return reviewModel
        .create(review);
}

function findReviewsByMovieId(movieId) {
    return reviewModel
        .find({_movieId: movieId});
}

function findReviewById(reviewId) {
    return reviewModel
        .findById(reviewId);
}

function findReviewsByUserId(userId) {
    return reviewModel
        .find({_userId: userId});
}

function findReviewsByUserIdPopulated(userId) {
    return reviewModel
        .find({_userId: userId})
        .populate("_movieId")
        .exec();
}

function getAllReviews() {
    return reviewModel
        .find()
        .populate("_userId", "_id username")
        .exec();
}

function deleteReview(reviewId) {
    return reviewModel
        .findReviewById(reviewId)
        .then(function (review) {
            return review.remove();
        });
}

function updateReview(reviewId, review) {
    return reviewModel
        .update({_id: reviewId}, {$set: review})
        .then((function (review) {
            return reviewModel.findReviewById(reviewId);
        }));
}