var mongoose = require("mongoose");

var pageSchema = mongoose.Schema({
        _website: {type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteModel'},
        name: String,
        title: String,
        description: String,
        widgets: [{type: mongoose.Schema.Types.ObjectId, ref: 'WidgetModel'}],
        dateCreated: {type: Date, default: Date.now()}
    },
    {collection: "page"});


pageSchema.pre('remove', function (next) {
    mongoose.model("PageModel")
        .findById(this._id)
        .populate("widgets _website")
        .exec(function (err, page) {
            deleteAllKids(page.widgets, 0)
                .then(function (status) {
                    var website = page._website;
                    var index = website.pages.indexOf(page.id);
                    website.pages.splice(index, 1);
                    return website.save();
                })
                .then(function (website) {
                    next();
                });
        });
});

pageSchema.post('save', function (doc) {
    mongoose.model("WebsiteModel")
        .findById(doc._website)
        .then(function (website) {
            if (website.pages.indexOf(doc.id) === -1) {
                website.pages.push(doc.id);
                return website.save();
            }
            return Promise.resolve();
        })
        .then(function (user) {
            next();
        })
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

module.exports = pageSchema;