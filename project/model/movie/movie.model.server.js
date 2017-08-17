var mongoose = require("mongoose");
var movieSchema = require("./movie.schema.server");
var rp = require('request-promise');
var request = require('request');




var movieModel = mongoose.model("ProjectMovieModel", movieSchema);

movieModel.createMovie = createMovie;
movieModel.findMoviesThatMatchIds = findMoviesThatMatchIds;
movieModel.addMoviesIfMissing = addMoviesIfMissing;
movieModel.deleteMovie = deleteMovie;
movieModel.updateMovie = updateMovie;
movieModel.addMovieIfMissing = addMovieIfMissing;

module.exports = movieModel;

function createMovie(movie) {
    return movieModel
        .create(movie);
}

function findMoviesThatMatchIds(ids) {
    return movieModel
        .find({'_id': {$in: ids}})
        .lean()
        .distinct('_id');

}

function addMovieIfMissing(potentiallyMissingMovieId) {
    return movieModel
        .findById(potentiallyMissingMovieId)
        .then(function (movie) {
            if (movie) {
                return Promise.resolve({});
            }

            return rp("https://api.themoviedb.org/3/movie/" + potentiallyMissingMovieId + "?api_key=9a1db3dd9659485ffb9d482a484908e0")
                .then(function (body) {
                    console.log(body);
                    var jsonMovie = JSON.parse(body);
                    var abridgedMovie = {
                        _id: jsonMovie.id,
                        title: jsonMovie.title,
                        poster_path: jsonMovie.poster_path
                    };
                    return movieModel
                        .createMovie(abridgedMovie);
                })
                .catch(function (err) {
                    console.log("sad");
                })
        });
}

function addMoviesIfMissing(potentiallyMissingMovieIds) {
    return movieModel
        .findMoviesThatMatchIds(potentiallyMissingMovieIds)
        .then(function (movies) {
            var missingMovieIds = [];
            for (var i = 0; i < potentiallyMissingMovieIds.length; i++) {
                if (movies.indexOf(potentiallyMissingMovieIds[i]) === -1) {
                    missingMovieIds.push(potentiallyMissingMovieIds[i]);
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

function updateMovie(movieId, movie) {
    return movieModel
        .update({_id: movieId}, {$set: movie})
        .then((function (movie) {
            return movieModel.findById(movieId);
        }));
}

function deleteMovie(movieId) {
    return movieModel
        .findById(movieId)
        .then(function (movie) {
            movie.remove();
        })
}