module.exports = function () {
    var mongoose = require("mongoose");

    var websiteSchema = mongoose.Schema({
            _user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
            name: String,
            description: String,
            oages: [{type: mongoose.Schema.Types.ObjectId, ref: 'PageModel'}],
            dateCreated: {type: Date, default: Date.now()}
        },
        {collection: "website"});

    return websiteSchema;
};