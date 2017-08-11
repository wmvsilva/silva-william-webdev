var mongoose = require("mongoose");

var productSchema = mongoose.Schema({
        _userId: {type: mongoose.Schema.Types.ObjectId, ref: 'ProjectUserModel'},
    _movieId: String,
        description: String,
    price: String,
    imageUrl: String,
    category: String,
    purchased: Boolean,
    buyer: {type: mongoose.Schema.Types.ObjectId, ref: 'ProjectUserModel'}
    },
    {collection: "project-product"});

module.exports = productSchema;