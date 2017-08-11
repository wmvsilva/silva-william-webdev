var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        likedMovies: [Number],
    following: [{type: mongoose.Schema.Types.ObjectId, ref: 'ProjectUserModel'}]
    },
    {collection: "project-user"});


module.exports = userSchema;