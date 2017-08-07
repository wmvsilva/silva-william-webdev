module.exports = function (app, websiteModel) {

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
            });
    }

    function findWebsitesForUser(req, res) {
        var userId = req.params.userId;

        return websiteModel
            .findAllWebsitesForUser(userId)
            .then(function (sites) {
                res.json(sites);
            });
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;


        return websiteModel
            .findWebsiteById(websiteId)
            .then(function (sites) {
                res.json(sites);
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
                res.sendStatus(200);
            });
    }
};