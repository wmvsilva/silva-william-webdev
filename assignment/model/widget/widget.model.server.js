var mongoose = require("mongoose");
var widgetSchema = require("./widget.schema.server");
var pageModel = require("../page/page.model.server");

var widgetModel = mongoose.model("WidgetModel", widgetSchema);

widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
// widgetModel.reorderWidget = reorderWidget;

module.exports = widgetModel;

function createWidget(pageId, widget) {
    widget._page = pageId;

    return widgetModel
        .create(widget);
}

function findAllWidgetsForPage(pageId) {
    return widgetModel.find({_page: pageId});
}

function findWidgetById(widgetId) {
    return widgetModel.findById(widgetId);
}

function updateWidget(widgetId, widget) {
    return widgetModel.update({_id: widgetId}, {$set: widget});
}

function deleteWidget(widgetId) {
    var pageId = null;
    return widgetModel
        .findWidgetById(widgetId)
        .then(function (widgetDoc) {
            pageId = widgetDoc._page;
            return widgetModel.remove({_id: widgetId});
        })
        .then(function (status) {
            return pageModel.removeWidget(pageId, widgetId);
        });
}
