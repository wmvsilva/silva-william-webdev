module.exports = function (app) {
    var multer = require('multer');
    var upload = multer({dest: __dirname + '/../../public/uploads'});

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findWidgetsByPageId);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.put("/api/page/:pageId/widget", sortWidget);
    app.post("/api/upload", upload.single('myFile'), uploadImage);

    var widgets = [
        {
            "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO",
            "name": "Gizmodo Header", "idx": 0
        },
        {
            "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum",
            "name": "Lorem Header", "idx": 1
        },
        {
            "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/", "name": "Random Picture", "text": "Ipsum", "idx": 2
        },
        {
            "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>",
            "name": "Lorem Paragraph", "idx": 3
        },
        {
            "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum",
            "name": "Lorem Header", "idx": 4
        },
        {
            "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E", "name": "Boat Video", "text": "Boats!", "idx": 5
        },
        {
            "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>",
            "name": "Lorem Paragraph", "idx": 6
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

        pageWidgets.sort(function (a, b) {
            return a.idx - b.idx;
        });

        res.json(pageWidgets);
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;

        var widget = findWidgetByIdInternal(widgetId);

        if (widget) {
            res.json(widget);
        } else {
            res.sendStatus(404);
        }
    }

    function findWidgetByIdInternal(widgetId) {
        for (var w in widgets) {
            if (widgets[w]._id === widgetId) {
                return widgets[w];
            }
        }
        return null;
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

    function sortWidget(req, res) {
        var pageId = req.params.pageId;
        var initial = req.query.initial;
        var final = req.query.final;

        var pageWidgets = [];
        for (var w in widgets) {
            if (widgets[w].pageId === pageId) {
                pageWidgets.push(widgets[w]);
            }
        }
        pageWidgets.sort(function (a, b) {
            return a.idx - b.idx;
        });

        arrayMove(pageWidgets, initial, final);
        for (var i = 0; i < pageWidgets.length; i++) {
            pageWidgets[i].idx = i;
        }
        res.sendStatus(200);
    }

    function arrayMove(arr, from, to) {
        arr.splice(to, 0, arr.splice(from, 1)[0]);
    }

    function uploadImage(req, res) {
        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var myFile = req.file;

        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;

        var originalname = myFile.originalname; // file name on user's computer
        var filename = myFile.filename;     // new file name in upload folder
        var path = myFile.path;         // full path of uploaded file
        var destination = myFile.destination;  // folder where file is saved to
        var size = myFile.size;
        var mimetype = myFile.mimetype;

        var widget = findWidgetByIdInternal(widgetId);
        widget.url = '/uploads/' + filename;

        var callbackUrl = "/assignment/#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget";

        res.redirect(callbackUrl);
    }

};