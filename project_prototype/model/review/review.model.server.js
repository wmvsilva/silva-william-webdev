var mongoose = require("mongoose");
var reviewSchema = require("./review.schema.server");

var reviewModel = mongoose.model("ProjectReviewModel", reviewSchema);

reviewModel.createReview = createReview;
reviewModel.findReviewsByMovieId = findReviewsByMovieId;
reviewModel.findReviewsByUserId = findReviewsByUserId;

module.exports = reviewModel;

function createReview(review) {
    return reviewModel
        .create(review);
}

function findReviewsByMovieId(movieId) {
    return reviewModel
        .find({_movieId: movieId});
}

function findReviewsByUserId(userId) {
    return reviewModel
        .find({_userId: userId});
}