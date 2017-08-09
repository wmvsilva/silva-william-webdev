module.exports = function (app) {

    var websiteModel = require("../model/website/website.model.server");

    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    function createWebsite(req, res) {
        var website = req.body;
        var userId = req.params.userId;

        websiteModel
            .createWebsiteForUser(userId, website)
            .then(function (website) {
                res.json(website);
            }, function (err) {
                res.sentStatus(500).send(err);
            });
    }

    function findWebsitesForUser(req, res) {
        var userId = req.params.userId;

        return websiteModel
            .findAllWebsitesForUser(userId)
            .then(function (websites) {
                res.json(websites);
            });
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;


        return websiteModel
            .findWebsiteById(websiteId)
            .then(function (websiteDoc) {
                res.json(websiteDoc);
            }, function (err) {
                res.sendStatus(404).send(err);
            });
    }

    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var website = req.body;

        return websiteModel
            .updateWebsite(websiteId, website)
            .then(function (website) {
                res.json(website);
            });
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;

        return websiteModel
            .deleteWebsite(websiteId)
            .then(function (status) {
                res.json(status);
            });
    }
};