var mongoose = require("mongoose");
var movieSchema = require("./movie.schema.server");
var request = require('request');


var movieModel = mongoose.model("ProjectMovieModel", movieSchema);

movieModel.createMovie = createMovie;
movieModel.findMoviesThatMatchIds = findMoviesThatMatchIds;
movieModel.addMoviesIfMissing = addMoviesIfMissing;

module.exports = movieModel;

function createMovie(movie) {
    return movieModel
        .create(movie);
}

function findMoviesThatMatchIds(ids) {
    return movieModel
        .find({'_id': { $in: ids }});
}

function addMoviesIfMissing(potentiallyMissingMovieIds) {
    return movieModel
        .findMoviesThatMatchIds(potentiallyMissingMovieIds)
        .then(function (movies) {
            var missingMovieIds = [];
            for (var m in potentiallyMissingMovieIds) {
                if (movies.indexOf(potentiallyMissingMovieIds[m]) === -1) {
                    missingMovieIds.push(potentiallyMissingMovieIds[m]);
                }
            }

            for (var m in missingMovieIds) {
                var movieId = missingMovieIds[m];
                request("https://api.themoviedb.org/3/movie/" + movieId + "?api_key=9a1db3dd9659485ffb9d482a484908e0",
                    function (error, response, body) {
                        var jsonMovie = JSON.parse(body);
                        var abridgedMovie = {
                            _id: jsonMovie.id,
                            title: jsonMovie.title,
                            poster_path: jsonMovie.poster_path
                        };
                        movieModel
                            .createMovie(abridgedMovie);
                    });
            }
        });
}