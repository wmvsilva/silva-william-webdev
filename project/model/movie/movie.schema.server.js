var mongoose = require("mongoose");

var movieSchema = mongoose.Schema({
        id: Number,
        title: String,
        poster_path: String
    },
    {collection: "project-movie"});

module.exports = movieSchema;