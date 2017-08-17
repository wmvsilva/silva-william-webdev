var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
        username: String,
        password: String,
        role: {type: String, default: "user", enum: ["user", "admin"]},
        firstName: String,
        lastName: String,
        email: String,
        likedMovies: [{type: Number, ref: 'ProjectMovieModel'}],
    following: [{type: mongoose.Schema.Types.ObjectId, ref: 'ProjectUserModel'}],
    google: {
            id: String,
        token: String
    }
    },
    {collection: "project-user"});


module.exports = userSchema;