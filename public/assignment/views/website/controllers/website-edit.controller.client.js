(function() {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

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