module.exports = function (app) {
    var multer = require('multer');
    var upload = multer({dest: __dirname + '/../../public/uploads'});

    var widgetModel = require("../model/widget/widget.model.server");

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findWidgetsByPageId);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.put("/api/page/:pageId/widget", sortWidget);
    app.post("/api/upload", upload.single('myFile'), uploadImage);

    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = req.body;

        widgetModel
            .createWidget(pageId, widget)
            .then(function (widget) {
                res.json(widget);
            }, function (err) {
                res.sentStatus(500).send(err);
            });
    }

    function findWidgetsByPageId(req, res) {
        var pageId = req.params.pageId;

        //TODO Make sure there is sorting here
        // TODO Error handling
        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(function (widgets) {
                res.json(widgets);
            });
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;

        widgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                res.json(widget);
            }, function (err) {
                res.sendStatus(404).send(err);
            });
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
        var name = req.body.name;
        var text = req.body.text;

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
        widget.width = width;
        widget.name = name;
        widget.text = text;

        var callbackUrl = "/assignment/#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget";

        res.redirect(callbackUrl);
    }

};