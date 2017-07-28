(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($routeParams, WebsiteService, $location) {
        var model = this;

        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        function init() {
            model.userId = $routeParams["uid"];
            model.websiteId = $routeParams["wid"];
            WebsiteService
                .findWebsitesByUser(model.userId)
                .then(function(response) {
                   model.websites = response.data;
                });
            WebsiteService
                .findWebsitesById(model.websiteId)
                .then(function (response) {
                    model.website = response.data;
                });
        }

        init();

        function updateWebsite(websiteId, website) {
            if (!website.name) {
                model.error = "Please enter a website name";
                return;
            }
            WebsiteService
                .updateWebsite(websiteId, website)
                .then(function() {
                    $location.url("/user/" + model.userId + "/website");
                });
        }

        function deleteWebsite(websiteId) {
            WebsiteService
                .deleteWebsite(websiteId)
                .then(function() {
                    $location.url("/user/" + model.userId + "/website");
                });
        }
    }
})();