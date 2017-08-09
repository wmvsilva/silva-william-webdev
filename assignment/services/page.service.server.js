module.exports = function (app) {

    var pageModel = require("../model/page/page.model.server");

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findPageByWebsiteId);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    function createPage(req, res) {
        var websiteId = req.params.websiteId;
        var page = req.body;

        return pageModel.createPage(websiteId, page)
            .then(function(page) {
                res.json(page);
            });
    }

    function findPageByWebsiteId(req, res) {
        var websiteId = req.params.websiteId;

        return pageModel.findAllPagesForWebsite(websiteId)
            .then(function (websitePages) {
                res.json(websitePages);
            });
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;

        return pageModel
            .findPageById(pageId)
            .then(function (page) {
                res.json(page);
            });
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var page = req.body;

        return pageModel.updatePage(pageId, page)
            .then(function (page) {
                res.json(page);
            });
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;

        return pageModel.deletePage(pageId)
            .then(function (status) {
                res.sendStatus(200);
            });
    }
};