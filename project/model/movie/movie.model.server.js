var mongoose = require("mongoose");
var movieSchema = require("./movie.schema.server");

var movieModel = mongoose.model("ProjectMovieModel", movieSchema);

movieModel.createMovie = createMovie;
movieModel.findMoviesThatMatchIds = findMoviesThatMatchIds;

module.exports = movieModel;

function createMovie(movie) {
    return movieModel
        .create(movie);
}

function findMoviesThatMatchIds(ids) {
    return movieModel
        .find({'id': { $in: ids }});
}