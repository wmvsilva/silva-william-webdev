var mongoose = require("mongoose");
var widgetSchema = require("./widget.schema.server");
var pageModel = require("../page/page.model.server");

var widgetModel = mongoose.model("WidgetModel", widgetSchema);

widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;

module.exports = widgetModel;

function createWidget(pageId, widget) {
    widget._page = pageId;
    return widgetModel
        .create(widget);
}

function findAllWidgetsForPage(pageId) {
    return pageModel
        .findPageById(pageId)
        .populate("widgets")
        .exec()
        .then(function (page) {
            return Promise.resolve(page.widgets);
        })
}

function findWidgetById(widgetId) {
    return widgetModel
        .findById(widgetId);
}

function updateWidget(widgetId, widget) {
    return widgetModel
        .update({_id: widgetId}, {$set: widget});
}

function deleteWidget(widgetId) {
    return widgetModel
        .findWidgetById(widgetId)
        .then(function (widgetDoc) {
            return widgetDoc.remove();
        });
}

function reorderWidget(pageId, start, end) {
    return pageModel
        .findPageById(pageId)
        .then(function (page) {
            page.widgets.splice(end, 0, page.widgets.splice(start, 1)[0]);
            return page.save();
        });
}
