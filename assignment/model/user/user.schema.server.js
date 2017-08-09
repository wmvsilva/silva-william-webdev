var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        websites: [{type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteModel'}],
        dateCreated: {type: Date, default: Date.now()}
    },
    {collection: "user"});

userSchema.pre('remove', function(next) {
    mongoose.model("UserModel")
        .findById(this._id)
        .populate("websites")
        .exec(function (err, user) {
            deleteAllWebsites(user.websites, 0).then(function(status) {
                next();
            });
        });
});

function deleteAllWebsites(websites, curI) {
        if (curI === websites.length - 1) {
             return websites[curI].remove();
        } else {
            return websites[curI].remove().then(function (status) {
                return deleteAllWebsites(websites, curI + 1);
            });
        }
}

module.exports = userSchema;