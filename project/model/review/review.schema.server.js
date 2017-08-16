var mongoose = require("mongoose");

var reviewSchema = mongoose.Schema({
        _userId: {type: mongoose.Schema.Types.ObjectId, ref: 'ProjectUserModel'},
    _movieId: String,
        isRecommended: Boolean,
    text: String
    },
    {collection: "project-review"});

module.exports = reviewSchema;