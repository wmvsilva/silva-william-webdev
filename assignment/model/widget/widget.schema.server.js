var mongoose = require("mongoose");

var widgetSchema = mongoose.Schema({
        _page: {type: mongoose.Schema.Types.ObjectId, ref: 'PageModel'},
        type: {type: String, enum: ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'TEXT']},
        name: String,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        rows: Number,
        size: Number,
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        dateCreated: {type: Date, default: Date.now()}
    },
    {collection: "widget"});


widgetSchema.pre('remove', function(next) {
    mongoose.model("WidgetModel")
        .findById(this._id)
        .populate("_page")
        .exec(function (err, widget) {
            var page = widget._page;
            var index = page.widgets.indexOf(widget.id);
            page.widgets.splice(index, 1);
            page.save()
                .then(function (page) {
                        next();
                });
        });
});

widgetSchema.post('save', function(doc) {
    mongoose.model("PageModel")
        .findById(doc._page)
        .then(function (page) {
                if (page.widgets.indexOf(doc.id) === -1) {
                    page.widgets.push(doc.id);
                    return page.save();
                }
            return Promise.resolve();
        })
        .then(function (page) {
            next();
        })
});

function deleteAllKids(pages, curI) {
    if (pages.length === 0) {
        return Promise.resolve();
    }
    if (curI === pages.length - 1) {
        return pages[curI].remove();
    } else {
        return pages[curI].remove().then(function (status) {
            return deleteAllKids(pages, curI + 1);
        });
    }
}

module.exports = widgetSchema;