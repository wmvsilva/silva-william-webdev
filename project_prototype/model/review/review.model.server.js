var mongoose = require("mongoose");
var reviewSchema = require("./review.schema.server");

var reviewModel = mongoose.model("ProjectReviewModel", reviewSchema);

reviewModel.createReview = createReview;
reviewModel.findReviewsByMovieId = findReviewsByMovieId;

module.exports = reviewModel;

function createReview(review) {
    return reviewModel
        .create(review);
}

function findReviewsByMovieId(movieId) {
    return reviewModel
        .find({_movieId: movieId});
}