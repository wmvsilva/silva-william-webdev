var mongoose = require("mongoose");

var websiteSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
        name: String,
        description: String,
        pages: [{type: mongoose.Schema.Types.ObjectId, ref: 'PageModel'}],
        dateCreated: {type: Date, default: Date.now()}
    },
    {collection: "website"});

websiteSchema.pre('remove', function (next) {
    mongoose.model("WebsiteModel")
        .findById(this._id)
        .populate("pages _user")
        .exec(function (err, website) {
            deleteAllPages(website.pages, 0)
                .then(function (status) {
                    var user = website._user;
                    var index = user.websites.indexOf(website.id);
                    user.websites.splice(index, 1);
                    return user.save();
                })
                .then(function (user) {
                    next();
                });
        });
});

websiteSchema.post('save', function (doc) {
    mongoose.model("UserModel")
        .findById(doc._user)
        .then(function (user) {
            if (user.websites.indexOf(doc.id) === -1) {
                user.websites.push(doc.id);
                return user.save();
            }
            return Promise.resolve();
        })
        .then(function (user) {
            next();
        })
});

function deleteAllPages(pages, curI) {
    if (pages.length === 0) {
        return Promise.resolve();
    }
    if (curI === pages.length - 1) {
        return pages[curI].remove();
    } else {
        return pages[curI].remove().then(function (status) {
            return deleteAllPages(pages, curI + 1);
        });
    }
}

module.exports = websiteSchema;