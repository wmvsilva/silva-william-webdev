module.exports = function (app) {

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findWidgetsByPageId);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);

    var widgets = [
        {
            "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO",
            "name": "Gizmodo Header"
        },
        {
            "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum",
            "name": "Lorem Header"
        },
        {
            "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/", "name": "Random Picture", "text": "Ipsum"
        },
        {
            "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>",
            "name": "Lorem Paragraph"
        },
        {
            "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum",
            "name": "Lorem Header"
        },
        {
            "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E", "name": "Boat Video", "text": "Boats!"
        },
        {
            "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>",
            "name": "Lorem Paragraph"
        }
    ];

    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = req.body;

        widget._id = (new Date()).getTime() + "";
        widget.pageId = pageId;
        widgets.push(widget);
        res.json(widget);
    }

    function findWidgetsByPageId(req, res) {
        var pageId = req.params.pageId;
        var pageWidgets = [];

        for (var w in widgets) {
            if (widgets[w].pageId === pageId) {
                pageWidgets.push(widgets[w]);
            }
        }

        res.json(pageWidgets);
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;

        for (var w in widgets) {
            if (widgets[w]._id === widgetId) {
                res.json(widgets[w]);
                return;
            }
        }
        res.sendStatus(404);
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;

        for (var w in widgets) {
            if (widgets[w]._id === widgetId) {
                widgets[w] = widget;
                res.json(widget);
                return;
            }
        }
        res.sendStatus(404);
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;

        for (var w in widgets) {
            if (widgets[w]._id === widgetId) {
                widgets.splice(w, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }
};