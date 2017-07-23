(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController($routeParams, WebsiteService) {
        var model = this;

        model.userId = $routeParams["uid"];

        function init() {
            model.websites = jQuery.extend(true, {}, WebsiteService.findWebsitesByUser(model.userId));
        }
        init();
    }

    function NewWebsiteController($routeParams, WebsiteService, $location) {
        var model = this;

        model.userId = $routeParams["uid"];
        model.createWebsite = createWebsite;

        function init() {
            model.websites = jQuery.extend(true, {}, WebsiteService.findWebsitesByUser(model.userId));
        }
        init();

        function createWebsite(userId, website) {
            if (!website || !website.name) {
                model.error = "Please enter in a website name";
                return;
            }
            WebsiteService.createWebsite(userId, website);
            $location.url("/user/"+model.userId+"/website");
        }
    }

    function EditWebsiteController($routeParams, WebsiteService, $location) {
        var model = this;

        model.userId = $routeParams["uid"];
        model.websiteId = $routeParams["wid"];
        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        function init() {
            model.websites = jQuery.extend(true, {}, WebsiteService.findWebsitesByUser(model.userId));
            model.website = jQuery.extend(true, {}, WebsiteService.findWebsitesById(model.websiteId));
        }
        init();

        function updateWebsite(websiteId, website) {
            WebsiteService.updateWebsite(websiteId, website);
            $location.url("/user/"+model.userId+"/website");
        }

        function deleteWebsite(websiteId) {
            WebsiteService.deleteWebsite(websiteId);
            $location.url("/user/"+model.userId+"/website");
        }
    }
})();