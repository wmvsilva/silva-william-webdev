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
            deleteAllKids(user.websites, 0).then(function(status) {
                next();
            });
        });
});

function deleteAllKids(kids, curI) {
    if (kids.length === 0) {
        return Promise.resolve();
    }
    if (curI === kids.length - 1) {
        return kids[curI].remove();
    } else {
        return kids[curI].remove().then(function (status) {
            return deleteAllKids(kids, curI + 1);
        });
    }
}

module.exports = userSchema;