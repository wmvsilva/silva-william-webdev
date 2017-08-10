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
                res.status(500).send(err);
            });
    }

    function findWidgetsByPageId(req, res) {
        var pageId = req.params.pageId;

        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(function (widgets) {
                res.json(widgets);
            }, function (err) {
                res.status(500).send(err);
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

        widgetModel
            .updateWidget(widgetId, widget)
            .then(function (widget) {
                res.json(widget);
            }, function (err) {
                res.sendStatus(404).send(err);
            });
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;

        widgetModel
            .deleteWidget(widgetId)
            .then(function (status) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(404).send(err);
            });
    }

    function sortWidget(req, res) {
        var pageId = req.params.pageId;
        var start = req.query.initial;
        var end = req.query.final;


        widgetModel
            .reorderWidget(pageId, start, end)
            .then(function (page) {
                res.sendStatus(200);
            }, function (err) {
                res.status(500).send(err);
            });
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

        widgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                widget.url = '/uploads/' + filename;
                widget.width = width;
                widget.name = name;
                widget.text = text;

                widgetModel.updateWidget(widgetId, widget)
                    .then(function (widget) {
                        res.json(widget);
                    }, function (err) {
                        res.sendStatus(404).send(err);
                    });

                var callbackUrl = "/assignment/#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget";

                res.redirect(callbackUrl);
            }, function (err) {
                res.status(500).send(err);
            });
    }

};